import { ServicesPageV2 } from "@/components/admin/services-v2/ServicesPageV2"
import currentUserServer from "@/lib/currentUserServer"
import { redirect } from "next/navigation"

export default async function AdminServicesPage() {
  const currentUser = await currentUserServer()
  const { isSuperAdmin, isAdmin } = currentUser || {}

  if (!currentUser) redirect("/signin")
  if (!isSuperAdmin && !isAdmin) redirect("/dashboard")

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <ServicesPageV2 />
    </div>
  )
}
