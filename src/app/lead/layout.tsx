// /app/lead/layout.tsx
import type { ReactNode } from "react"
import { requireLead } from "@/app/auth/utils"

export default async function LeadLayout({
  children,
}: {
  children: ReactNode
}) {
  // This layout will be applied to all lead pages
  await requireLead() // Ensure only leads can access
  
  return (
    <div>
      {/* Common lead layout elements go here */}
      <main>{children}</main>
    </div>
  )
}