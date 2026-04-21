import { redirect } from "next/navigation"
import currentUserServer from "@/lib/currentUserServer"

export default async function AdminGalleryPage() {
  const currentUser = await currentUserServer()
  const { isSuperAdmin, isAdmin } = currentUser || {}

  if (!currentUser) redirect("/signin")
  if (!isSuperAdmin && !isAdmin) redirect("/dashboard")

  redirect("/admin?tab=gallery")
}
