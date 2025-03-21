// /app/dashboard/layout.tsx
import type { ReactNode } from "react"
import { requireAuth } from "@/app/auth/utils"

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  // This layout will be applied to all dashboard pages
  await requireAuth() // Ensure user is authenticated
  
  return (
    <div>
      {/* Common dashboard layout elements go here */}
      <main>{children}</main>
    </div>
  )
}