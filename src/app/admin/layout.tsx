import type { ReactNode } from "react"
import { requireRole } from "@/app/auth/utils"

export default async function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  // This layout will be applied to all admin pages
  await requireRole("admin") // Ensure only admins can access
  
  return (
    <div>
      {/* Common admin layout elements go here */}
      <main>{children}</main>
    </div>
  )
}