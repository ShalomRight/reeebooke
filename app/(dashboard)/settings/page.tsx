import LayoutAdmin from "@/components/layout/landing"
import { SettingsForm } from "@/components/settings/SettingsForm"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function SettingsPage() {
	const session = await getServerSession(authOptions)

	if (!session) {
		redirect("/signin")
	}

	return (
		<LayoutAdmin>
			<div className="min-h-screen bg-background">
				<div className="container mx-auto py-8 px-4">
					<div className="max-w-2xl mx-auto">
						<h1 className="text-3xl font-bold text-foreground mb-8">Settings</h1>
						<SettingsForm />
					</div>
				</div>
			</div>
		</LayoutAdmin>
	)
}
