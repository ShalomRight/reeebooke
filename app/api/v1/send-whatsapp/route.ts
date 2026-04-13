import { NextRequest, NextResponse } from "next/server"
import twilio from "twilio"
import { sendWhatsAppSchema, validateRequest, validationErrorResponse } from "@/lib/validations"

const client = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
	? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
	: null

export async function POST(req: NextRequest) {
	try {
		const body = await req.json()
		
		const validation = validateRequest(sendWhatsAppSchema, body)
		if (!validation.success) {
			return validationErrorResponse(validation.error)
		}
		
		const { userName, phone, serviceName, date, time, totalPrice } = validation.data

		if (!client) {
			console.warn("WhatsApp/SMS not configured — message not sent:", { userName, phone, serviceName })
			return NextResponse.json({ 
				success: false, 
				message: "WhatsApp service not configured" 
			}, { status: 200 })
		}

		const message = await client.messages.create({
			body: `Hi ${userName}, your booking is confirmed! Details:\nService: ${serviceName}\nDate: ${date}\nTime: ${time}\nTotal: K${totalPrice.toLocaleString()}\nThank you for choosing us!`,
			from: "whatsapp:+14155238886", // Replace with your Twilio WhatsApp-enabled number
			to: `whatsapp:${phone}`,
		})

		return NextResponse.json({ success: true, messageSid: message.sid }, { status: 200 })
	} catch (error) {
		return NextResponse.json(
			{ error: error instanceof Error ? error.message : "Failed to send WhatsApp message" },
			{ status: 500 }
		)
	}
}
