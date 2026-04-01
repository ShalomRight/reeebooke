import { NextResponse } from "next/server"
import { ZodError } from "zod"

export class AppError extends Error {
	constructor(
		public statusCode: number,
		public message: string,
		public code?: string,
		public details?: unknown
	) {
		super(message)
		this.name = "AppError"
	}
}

interface ErrorLog {
	timestamp: string
	error: string
	code?: string
	stack?: string
	details?: unknown
	path?: string
	method?: string
}

function logError(error: unknown, context?: { path?: string; method?: string }): void {
	const isDevelopment = process.env.NODE_ENV === "development"
	const errorLog: ErrorLog = {
		timestamp: new Date().toISOString(),
		error: error instanceof Error ? error.message : "Unknown error",
		...(error instanceof Error && isDevelopment && { stack: error.stack }),
		...(context && { ...context }),
	}

	if (error instanceof AppError) {
		errorLog.code = error.code
		errorLog.details = error.details
	} else if (error instanceof ZodError) {
		errorLog.details = error.errors
	} else if (error instanceof Error) {
		// Handle SQLite/Drizzle errors
		const msg = error.message.toLowerCase()
		if (msg.includes("unique constraint") || msg.includes("unique_constraint")) {
			errorLog.code = "SQLITE_CONSTRAINT_UNIQUE"
		} else if (msg.includes("foreign key") || msg.includes("foreign_key")) {
			errorLog.code = "SQLITE_CONSTRAINT_FOREIGNKEY"
		} else if (msg.includes("not null constraint")) {
			errorLog.code = "SQLITE_CONSTRAINT_NOTNULL"
		}
	}

	// In production, you might want to send this to a logging service
	console.error("[ERROR]", JSON.stringify(errorLog, null, 2))
}

export function handleError(error: unknown, context?: { path?: string; method?: string }): NextResponse {
	// Log the error
	logError(error, context)

	// Zod validation errors
	if (error instanceof ZodError) {
		return NextResponse.json(
			{
				error: "Validation failed",
				details: error.errors.map((err) => ({
					path: err.path.join("."),
					message: err.message,
				})),
			},
			{ status: 400 }
		)
	}

	// SQLite/Drizzle errors
	if (error instanceof Error) {
		const msg = error.message.toLowerCase()
		
		// Unique constraint violation
		if (msg.includes("unique constraint") || msg.includes("unique_constraint")) {
			return NextResponse.json(
				{
					error: "A record with this value already exists",
					code: "SQLITE_CONSTRAINT_UNIQUE",
				},
				{ status: 409 }
			)
		}

		// Foreign key constraint
		if (msg.includes("foreign key") || msg.includes("foreign_key")) {
			return NextResponse.json(
				{
					error: "Invalid reference",
					code: "SQLITE_CONSTRAINT_FOREIGNKEY",
				},
				{ status: 400 }
			)
		}

		// Not found (used by Drizzle when no rows match)
		if (msg.includes("no result") || msg.includes("not found")) {
			return NextResponse.json(
				{
					error: "Record not found",
					code: "NOT_FOUND",
				},
				{ status: 404 }
			)
		}
	}

	// Custom AppError
	if (error instanceof AppError) {
		return NextResponse.json(
			{
				error: error.message,
				code: error.code,
				details: error.details,
			},
			{ status: error.statusCode }
		)
	}

	// Generic Error
	if (error instanceof Error) {
		// Don't expose internal error messages in production
		const isDevelopment = process.env.NODE_ENV === "development"
		
		// Check for common error types
		if (error.name === "TypeError" && error.message.includes("Cannot read")) {
			return NextResponse.json(
				{
					error: "Invalid request data",
				},
				{ status: 400 }
			)
		}

		return NextResponse.json(
			{
				error: isDevelopment ? error.message : "An unexpected error occurred",
				...(isDevelopment && { stack: error.stack }),
			},
			{ status: 500 }
		)
	}

	// Unknown error
	return NextResponse.json(
		{
			error: "An unexpected error occurred",
		},
		{ status: 500 }
	)
}

export async function withErrorHandling<T>(
	handler: () => Promise<T>,
	context?: { path?: string; method?: string }
): Promise<NextResponse> {
	try {
		const result = await handler()
		return result instanceof NextResponse ? result : NextResponse.json(result)
	} catch (error) {
		return handleError(error, context)
	}
}
