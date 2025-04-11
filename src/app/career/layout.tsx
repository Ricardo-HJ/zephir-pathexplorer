import type { ReactNode } from "react"
import { requireAuth } from "@/app/auth/utils"

export default async function CareerLayout({
  children,
}: {
  children: ReactNode
}) {
  // Esto asegura que solo usuarios autenticados puedan acceder
  await requireAuth()
  
  return children
} 