import { getAuthOptions } from "@/lib/auth"
import { getDb } from "@/src/db"
import { users, bookings, carts, referralCodes, referralRewards, discountCodes, discountUsages, photos, promotionSubscribers } from "@/src/db/schema"
import { eq, sql } from "drizzle-orm"
import { sendEmail } from "@/lib/email-service"
import { getBookingConfirmationEmail, getBookingCompletedEmail } from "@/lib/email-templates/bookings"
import { getDiscountAppliedEmail } from "@/lib/email-templates/discounts"
import { getReferralRewardEmail } from "@/lib/email-templates/referrals"
import { awardReferralPointsOnPayment } from "@/lib/referral-utils"
import { normalizeBookingDateYmd, normalizeTimeTo24h } from "@/lib/booking/time"
import { isZapSlotBookable } from "@/lib/booking/slot-guard"
import bcrypt from "bcryptjs"
import { getServerSession } from "next-auth/next"
import { type NextRequest, NextResponse } from "next/server"
import { bulkBookingSchema, validateRequest, validationErrorResponse } from "@/lib/validations"
import { createPostHandler } from "@/lib/api-wrapper"
import { bookingRateLimit } from "@/lib/rate-limit"

async function handleBulkBooking(req: NextRequest) {
	const db = getDb()
	const body = await req.json()
	const session = await getServerSession(getAuthOptions())
		
		const validation = validateRequest(bulkBookingSchema, body)
		if (!validation.success) {
			return validationErrorResponse(validation.error)
		}
		
		const { cartItems, userName, phone, paymentMethod, userId, email, bookingFor, discountCode, discountAmount, totalPrice, finalPrice, referralCode } = validation.data

		let finalUserId = userId || session?.user?.id || null
		const finalEmail = email || session?.user?.email || null
		
		// Determine referrer ID
		let referrerId: string | null = null
		
		// If booking for someone else and logged-in user exists, automatically use their referral
		if (bookingFor === "other" && session?.user?.id) {
			referrerId = session.user.id
			// Ensure the logged-in user has a referral code
			try {
				const { ensureReferralCode } = await import("@/lib/referral-code-utils")
				await ensureReferralCode(session.user.id, session.user.email || "")
			} catch (err) {
				console.error("Failed to ensure referral code for logged-in user:", err)
				// Continue even if referral code generation fails
			}
		}
		
		// Override with referral code from body if explicitly provided
		if (referralCode) {
			try {
				const referrer = await db.query.users.findFirst({
					where: eq(users.referralCode, referralCode.toUpperCase()),
					columns: { id: true },
				})
				if (referrer) {
					// If user is logged in and wasn't referred before, link them to referrer
					if (finalUserId && finalUserId !== referrer.id) {
						const user = await db.query.users.findFirst({
							where: eq(users.id, finalUserId),
							columns: { referredById: true },
						})
						if (user && !user.referredById) {
							await db.update(users).set({
								referredById: referrer.id,
							}).where(eq(users.id, finalUserId))
						}
					}
					referrerId = referrer.id
				}
			} catch (err) {
				console.error("Failed to find referrer by code:", err)
				// Continue without referrer if lookup fails
			}
		}

		if (bookingFor === "other" && email && !userId) {
			try {
				// Check if user already exists
				const existingUser = await db.query.users.findFirst({
					where: eq(users.email, email),
				})

				if (!existingUser) {
					// Create new family member user with temporary password
					const tempPassword = Math.random().toString(36).slice(-12)
					const hashedPassword = await bcrypt.hash(tempPassword, 10)

					const [newUser] = await db.insert(users).values({
						name: userName,
						email,
						phone,
						password: hashedPassword,
						role: "CLIENT",
						referredById: referrerId || null,
					}).returning()

					finalUserId = newUser.id

					// Generate referral code for new user
					try {
						const { ensureReferralCode } = await import("@/lib/referral-code-utils")
						await ensureReferralCode(newUser.id, email)
					} catch (err) {
						console.error("Failed to generate referral code for family member:", err)
						// Don't fail user creation if referral code generation fails
					}

					try {
						await db.insert(promotionSubscribers).values({
							email,
							name: userName,
							phone,
							userId: newUser.id,
							subscribed: true,
						})
					} catch (err) {
						// Ignore if already exists
					}

					if (referrerId) {
						try {
							const referralCodeRecord = await db.query.referralCodes.findFirst({
								where: eq(referralCodes.userId, referrerId),
							})

							const points = referralCodeRecord?.pointsPerReferral || 100

							await db.update(users).set({
								referralPoints: sql`${users.referralPoints} + ${points}`,
							}).where(eq(users.id, referrerId))

							await db.insert(referralRewards).values({
								referrerId,
								referredId: newUser.id,
								points,
							})
						} catch (err) {
							console.error("Failed to award referral points:", err)
						}
					}

					// Send password reset email to family member
					const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
					const resetLink = `${appUrl}/auth/reset-password?email=${encodeURIComponent(email)}`

					try {
						const { getGuestSignupEmail } = await import("@/lib/email-templates/auth")
						await sendEmail({
							to: email,
							subject: "Welcome to Luxury Nail Spa - Set Your Password",
							html: getGuestSignupEmail(userName, email, phone, resetLink),
						})
					} catch (emailError) {
						console.error("Failed to send password reset email:", emailError)
					}
				} else {
					finalUserId = existingUser.id
				}
			} catch (userCreationError) {
				console.error("Failed to create family member user:", userCreationError)
			}
		}

		function isSqliteUniqueViolation(e: unknown): boolean {
			const msg = e instanceof Error ? e.message : String(e)
			return msg.includes("UNIQUE") || msg.includes("unique") || msg.includes("SQLITE_CONSTRAINT_UNIQUE")
		}

		// Create bookings for each item in cart
		const insertedBookings = []
		for (const item of cartItems) {
			let dateYmd: string
			let time24: string
			try {
				dateYmd = normalizeBookingDateYmd(item.date)
				time24 = normalizeTimeTo24h(item.time)
			} catch {
				return NextResponse.json({ error: "Invalid cart item date or time" }, { status: 400 })
			}

			const slotOk = await isZapSlotBookable(item.serviceId, dateYmd, time24)
			if (!slotOk) {
				return NextResponse.json(
					{
						error:
							"One or more selected times are no longer available. Please return to the booking flow and pick a new time.",
					},
					{ status: 409 },
				)
			}

			const insertedBooking = await db.transaction(async (tx) => {
				const [booking] = await tx.insert(bookings).values({
					serviceId: item.serviceId,
					date: dateYmd,
					time: time24,
					paymentMethod,
					userName,
					phone,
					email: finalEmail,
					userId: finalUserId || null,
				}).returning()

				if (item.photos && item.photos.length > 0) {
					await Promise.all(
						item.photos.map((photoUrl: string) =>
							tx.insert(photos).values({
								bookingId: booking.id,
								url: photoUrl
							})
						)
					)
				}
				return booking
			})

			const fullBooking = await db.query.bookings.findFirst({
				where: eq(bookings.id, insertedBooking.id),
				with: { service: true, photos: true }
			})
			if (fullBooking) {
				insertedBookings.push(fullBooking)
			}
		}

		// Record discount usage if a discount code was applied
		if (discountCode && discountAmount && totalPrice && finalPrice) {
			try {
				const discountCodeRecord = await db.query.discountCodes.findFirst({
					where: eq(discountCodes.code, discountCode.toUpperCase()),
				})

				if (discountCodeRecord) {
					await db.insert(discountUsages).values({
						discountCodeId: discountCodeRecord.id,
						userId: finalUserId || null,
						email: finalEmail || null,
						userName: userName || null,
						phone: phone || null,
						discountAmount: discountAmount,
						cartTotal: totalPrice,
						finalTotal: finalPrice,
						bookingId: insertedBookings[0]?.id || null,
					})

					// Send discount applied email
					if (finalEmail) {
						try {
							await sendEmail({
								to: finalEmail,
								subject: "Discount Applied - Thank You",
								html: getDiscountAppliedEmail(
									userName,
									{
										code: discountCodeRecord.code,
										type: discountCodeRecord.type as "PERCENT" | "FIXED",
										value: discountCodeRecord.value,
										minAmount: discountCodeRecord.minAmount || undefined,
										expiresAt: discountCodeRecord.expiresAt?.toString(),
									},
									discountAmount,
									finalPrice,
								),
							})
						} catch (emailError) {
							console.error("Failed to send discount applied email:", emailError)
						}
					}
				}
			} catch (discountError) {
				console.error("Failed to record discount usage:", discountError)
				// Don't fail the booking if discount tracking fails
			}
		}

		// Clear cart for authenticated users
		if (session?.user?.email) {
			const user = await db.query.users.findFirst({
				where: eq(users.email, session.user.email),
			})
			if (user) {
				await db.delete(carts).where(eq(carts.userId, user.id))
			}
		}

		// Send WhatsApp confirmations for each booking
		for (const booking of insertedBookings) {
			try {
				await fetch(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/v1/send-whatsapp`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						userName,
						phone,
						serviceName: booking.service.name,
						date: booking.date, // Already standard ISO format text
						time: booking.time,
						totalPrice: booking.service.price,
					}),
				})
			} catch (err) {
				console.error("Failed to send WhatsApp confirmation:", err)
			}
		}

		// Award referral points if user was referred (only on first payment)
		if (finalUserId) {
			try {
				const referralResult = await awardReferralPointsOnPayment(finalUserId, insertedBookings[0]?.id)
				
				// Send referral reward email to referrer
				if (referralResult?.referrerEmail && referralResult.referrerName && referralResult.pointsEarned && referralResult.totalPoints) {
					try {
						await sendEmail({
							to: referralResult.referrerEmail,
							subject: "Referral Reward Earned - Luxury Nail Spa",
							html: getReferralRewardEmail(
								referralResult.referrerName,
								userName,
								referralResult.pointsEarned,
								referralResult.totalPoints,
							),
						})
					} catch (emailError) {
						console.error("Failed to send referral reward email:", emailError)
					}
				}
			} catch (err) {
				console.error("Failed to award referral points:", err)
				// Don't fail booking if referral reward fails
			}
		}

		// Send booking confirmation emails
		if (finalEmail) {
			for (const booking of insertedBookings) {
				try {
					await sendEmail({
						to: finalEmail,
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
					console.error("Failed to send booking confirmation email:", emailError)
				}
			}
		}

	return NextResponse.json(insertedBookings, { status: 201 })
}

export const POST = createPostHandler(handleBulkBooking, {
	rateLimit: bookingRateLimit,
})
