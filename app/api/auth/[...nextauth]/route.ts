import NextAuth from "next-auth"
import { getAuthOptions } from "@/lib/auth"

const handler = (req: Request, ctx: unknown) =>
	NextAuth(req, ctx, getAuthOptions())

export { handler as GET, handler as POST }
