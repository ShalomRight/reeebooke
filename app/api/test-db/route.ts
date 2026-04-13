import { getDb } from "@/src/db"
import { users, services } from "@/src/db/schema"
import { count } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function GET() {
	try {
		const db = getDb()
		// Test database connection
// Test query
		const serviceCount = (await db.query.services.findMany()).length
		const userCount = (await db.query.users.findMany()).length
		
		return NextResponse.json({
			connected: true,
			serviceCount,
			userCount,
			database: process.env.DATABASE_URL ? "configured" : "missing",
			message: "Database connection successful",
		})
	} catch (error: any) {
		console.error("Database test error:", error)
		return NextResponse.json(
			{
				connected: false,
				error: error?.message || "Unknown error",
				code: error?.code,
				database: process.env.DATABASE_URL ? "configured" : "missing",
				message: "Database connection failed",
			},
			{ status: 500 },
		)
	}
}

