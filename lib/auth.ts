import { getDb } from "@/src/db"
import { users, accounts, sessions, verificationTokens } from "@/src/db/schema"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"
import { getServerSession, type NextAuthOptions } from "next-auth"
import type { JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

export function getAuthOptions(): NextAuthOptions {
	const db = getDb()
	return {
		adapter: DrizzleAdapter(db, {
			usersTable: users,
			accountsTable: accounts,
			sessionsTable: sessions,
			verificationTokensTable: verificationTokens,
		}),
		providers: [
			GoogleProvider({
				clientId: process.env.GOOGLE_CLIENT_ID ?? "",
				clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
				allowDangerousEmailAccountLinking: true,
			}),
			CredentialsProvider({
				name: "Credentials",
				credentials: {
					email: { label: "Email", type: "email" },
					password: { label: "Password", type: "password" },
				},
				async authorize(credentials) {
					if (!credentials?.email || !credentials?.password) {
						throw new Error("Invalid credentials")
					}

					const db = getDb()
					const user = await db.query.users.findFirst({
						where: eq(users.email, credentials.email),
					})

					if (!user || !user.password) {
						throw new Error("Invalid credentials")
					}

					const isCorrectPassword = await bcrypt.compare(credentials.password, user.password)
					if (!isCorrectPassword) {
						throw new Error("Invalid credentials")
					}

					return {
						id: user.id,
						email: user.email,
						name: user.name,
						image: user.image ?? "",
						phone: user.phone ?? "",
						role: user.role,
					}
				},
			}),
		],
		callbacks: {
			async signIn({ user, account, profile }) {
				// Handle Google OAuth sign in
				if (account?.provider === "google") {
					try {
						const db = getDb()
						// Check if user exists
						const existingUser = await db.query.users.findFirst({
							where: eq(users.email, user.email!),
						})

						if (existingUser) {
							// Update user with Google account info if needed
							await db.update(users)
								.set({
									name: user.name || existingUser.name,
									image: user.image || existingUser.image,
									updatedAt: new Date().toISOString(),
								})
								.where(eq(users.id, existingUser.id))
						} else {
							// Create new user from Google OAuth
							const [newUser] = await db
								.insert(users)
								.values({
									id: crypto.randomUUID(),
									email: user.email!,
									name: user.name || "",
									image: user.image || null,
									password: null,
									role: "CLIENT",
								})
								.returning()

							// Generate referral code for new user
							try {
								const { ensureReferralCode } = await import("@/lib/referral-code-utils")
								await ensureReferralCode(newUser.id, user.email!)
							} catch (err) {
								console.error("Failed to generate referral code:", err)
							}
						}
					} catch (error) {
						console.error("Error handling Google sign in:", error)
						return false
					}
				}
				return true
			},
			async jwt({ token, user, account }) {
				if (user) {
					const db = getDb()
					// Fetch user from database to get latest role and other fields
					const dbUser = await db.query.users.findFirst({
						where: eq(users.email, user.email!),
					})

					if (dbUser) {
						token.id = dbUser.id
						token.name = dbUser.name
						token.image = dbUser.image
						token.email = dbUser.email
						token.phone = dbUser.phone
						token.role = dbUser.role
					} else {
						// Fallback to user object if not in DB
						token.id = user.id
						token.name = user.name
						token.image = user.image
						token.email = user.email
						token.phone = (user as any).phone
						token.role = (user as any).role || "CLIENT"
					}
				}
				return token
			},
			async session({ session, token }) {
				if (session.user) {
					session.user.id = token.id as string
					session.user.name = token.name
					session.user.image = token.image
					session.user.email = token.email
					session.user.phone = token.phone as string
					session.user.role = token.role as string
				}
				return session
			},
		},
		pages: {
			signIn: "/signin",
		},
		session: {
			strategy: "jwt",
			maxAge: 30 * 24 * 60 * 60, // 30 days
		},
		secret: process.env.NEXTAUTH_SECRET,
	}
}

export const getAuthSession = () => getServerSession(getAuthOptions())

// Extend NextAuth types for TypeScript safety
declare module "next-auth" {
	interface Session {
		user: {
			id: string
			name?: string | null
			image?: string | null
			email?: string | null
			phone?: string | null
			role?: string | null
		}
	}

	interface User {
		id: string
		name?: string | null
		image?: string | null
		email?: string | null
		phone?: string | null
		role?: string | null
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		id: string
		name?: string | null
		image?: string | null
		email?: string | null
		phone?: string | null
		role?: string | null
	}
}
