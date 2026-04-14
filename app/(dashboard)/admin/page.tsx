import { AdminDashboard } from "@/components/admin/AdminDashboard"
import currentUserServer from "@/lib/currentUserServer"
import { redirect } from "next/navigation"

interface Props {
	searchParams: Promise<{ tab?: string }>
}

export default async function AdminPage({ searchParams }: Props) {
	const currentUser = await currentUserServer()
	const { isSuperAdmin, isAdmin } = currentUser || {}

	if (!currentUser) {
		redirect("/signin")
	}

	if (!isSuperAdmin && !isAdmin) {
		redirect("/dashboard")
	}

	const { tab } = await searchParams

	return <AdminDashboard initialTab={tab || "overview"} />
}
