import { getAuthOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { HeaderClient } from "./header-client"

export default async function Header() {
	let session = null
	try {
		session = await getServerSession(getAuthOptions())
	} catch (error) {
		// Silently fail - auth errors are handled by NextAuth
	}

	return <HeaderClient session={session} />
}
