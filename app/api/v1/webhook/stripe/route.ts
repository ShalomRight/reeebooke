export const runtime = 'edge'

import { type NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { getDb } from "@/src/db"
import { users, bookings, carts, discountCodes, discountUsages } from "@/src/db/schema"
import { eq } from "drizzle-orm"
import { sendEmail } from "@/lib/email-service"
import { getBookingConfirmationEmail, getBookingCompletedEmail } from "@/lib/email-templates/bookings"
import { getDiscountAppliedEmail } from "@/lib/email-templates/discounts"
import { getReferralRewardEmail } from "@/lib/email-templates/referrals"
import { awardReferralPointsOnPayment } from "@/lib/referral-utils"
import type Stripe from "stripe"

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ""

export async function POST(req: NextRequest) {
  try {
    const db = getDb()
    const body = await req.text()
    const signature = req.headers.get("stripe-signature")!

    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session
      const metadata = session.metadata

      if (metadata?.bookingIds) {
        const bookingIds = metadata.bookingIds.split(",").filter(Boolean)
        
        // Update all bookings to CONFIRMED status and get booking details
        const updatedBookings = []
        for (const bookingId of bookingIds) {
            await db.update(bookings)
              .set({ status: "CONFIRMED" })
              .where(eq(bookings.id, bookingId))
            
            const b = await db.query.bookings.findFirst({
              where: eq(bookings.id, bookingId),
              with: {
                service: true,
                photos: true,
              }
            })
            if (b) updatedBookings.push(b)
        }

        // Record discount usage if discount code was applied
        if (metadata.discountCode && metadata.discountAmount && metadata.finalPrice) {
          try {
            const discountCodeRecord = await db.query.discountCodes.findFirst({
              where: eq(discountCodes.code, metadata.discountCode.toUpperCase()),
            })

            if (discountCodeRecord) {
              await db.insert(discountUsages).values({
                  discountCodeId: discountCodeRecord.id,
                  userId: metadata.userId || null,
                  email: session.customer_email || null,
                  userName: metadata.userName || null,
                  phone: metadata.phone || null,
                  discountAmount: parseInt(metadata.discountAmount),
                  cartTotal: parseInt(metadata.finalPrice) + parseInt(metadata.discountAmount),
                  finalTotal: parseInt(metadata.finalPrice),
                  bookingId: bookingIds[0] || null,
              })

              // Send discount applied email
              if (session.customer_email && metadata.userName) {
                try {
                  await sendEmail({
                    to: session.customer_email,
                    subject: "Discount Applied - Thank You",
                    html: getDiscountAppliedEmail(
                      metadata.userName,
                      {
                        code: discountCodeRecord.code,
                        type: discountCodeRecord.type as "PERCENT" | "FIXED",
                        value: discountCodeRecord.value,
                        minAmount: discountCodeRecord.minAmount || undefined,
                        expiresAt: discountCodeRecord.expiresAt || undefined,
                      },
                      parseInt(metadata.discountAmount),
                      parseInt(metadata.finalPrice),
                    ),
                  })
                } catch (emailError) {
                  console.error("Failed to send discount applied email in webhook:", emailError)
                }
              }
            }
          } catch (discountError) {
            console.error("Failed to record discount usage in webhook:", discountError)
          }
        }

        // Handle referral code if provided (for users who weren't referred during signup)
        if (metadata.referralCode && metadata.userId) {
          try {
            const referrer = await db.query.users.findFirst({
              where: eq(users.referralCode, metadata.referralCode.toUpperCase()),
              columns: { id: true },
            })
            
            if (referrer) {
              const user = await db.query.users.findFirst({
                where: eq(users.id, metadata.userId),
                columns: { id: true, referredById: true },
              })
              
              // Link user to referrer if not already linked
              if (user && !user.referredById) {
                await db.update(users)
                  .set({ referredById: referrer.id })
                  .where(eq(users.id, metadata.userId))
              }
            }
          } catch (err) {
            console.error("Failed to process referral code in webhook:", err)
          }
        }

        // Award referral points if user was referred (only on first payment)
        if (metadata.userId) {
          try {
            const referralResult = await awardReferralPointsOnPayment(metadata.userId, bookingIds[0])
            
            // Send referral reward email to referrer
            if (referralResult?.referrerEmail && referralResult.referrerName && referralResult.pointsEarned && referralResult.totalPoints && metadata.userName) {
              try {
                await sendEmail({
                  to: referralResult.referrerEmail,
                  subject: "Referral Reward Earned - Luxury Nail Spa",
                  html: getReferralRewardEmail(
                    referralResult.referrerName,
                    metadata.userName,
                    referralResult.pointsEarned,
                    referralResult.totalPoints,
                  ),
                })
              } catch (emailError) {
                console.error("Failed to send referral reward email in webhook:", emailError)
              }
            }
          } catch (err) {
            console.error("Failed to award referral points in webhook:", err)
          }
        }

        // Send booking confirmation emails
        if (session.customer_email && updatedBookings.length > 0) {
          for (const booking of updatedBookings) {
            try {
              await sendEmail({
                to: session.customer_email,
                subject: "Booking Confirmed - Luxury Nail Spa",
                html: getBookingConfirmationEmail({
                  bookingId: booking.id,
                  serviceName: booking.service.name,
                  date: booking.date,
                  time: booking.time,
                  price: booking.service.price,
                  status: booking.status,
                  userName: booking.userName,
                  phone: booking.phone || undefined,
                  paymentMethod: booking.paymentMethod || undefined,
                }),
              })
            } catch (emailError) {
              console.error("Failed to send booking confirmation email in webhook:", emailError)
            }
          }
        }

        // Clear cart for the user
        if (metadata.userId) {
          try {
            await db.delete(carts).where(eq(carts.userId, metadata.userId))
          } catch (err) {
            console.error("Failed to clear cart in webhook:", err)
          }
        }
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook error" }, { status: 400 })
  }
}
