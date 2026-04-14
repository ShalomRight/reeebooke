import { ServiceDetailView } from "@/components/admin/services-v2/ServiceDetailView"
import currentUserServer from "@/lib/currentUserServer"
import { redirect } from "next/navigation"

interface Props {
  params: Promise<{ id: string }>
}

export default async function AdminServiceDetailPage({ params }: Props) {
  const currentUser = await currentUserServer()
  const { isSuperAdmin, isAdmin } = currentUser || {}

  if (!currentUser) redirect("/signin")
  if (!isSuperAdmin && !isAdmin) redirect("/dashboard")

  const { id } = await params

  return <ServiceDetailView serviceId={id} />
}
