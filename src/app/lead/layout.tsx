// src/app/lead/layout.tsx
import type { ReactNode } from "react"
import { requireRole } from "@/app/auth/utils"
import { AppSidebar } from "@/components/layout/sidebar"

export default async function LeadLayout({
  children,
}: {
  children: ReactNode
}) {
  // This layout will be applied to all lead pages
  await requireRole("lead") // Ensure only leads can access
  
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex-1 ml-16 transition-all duration-300">
        {/* Common lead layout elements go here */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}