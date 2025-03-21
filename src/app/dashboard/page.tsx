// src/app/dashboard/page.tsx
import { redirect } from "next/navigation"
import { requireAuth } from "@/app/auth/utils"

export default async function DashboardPage() {
  // This is the main dashboard page that redirects based on user role
  const user = await requireAuth()
  
  if (user.tipoUsuario === "lead") {
    // For leads, redirect to the lead page with employee table
    redirect("/lead")
  } else if (user.tipoUsuario === "employee" && user.idUsuario) {
    // For employees, redirect to their specific dashboard
    // Add a check to ensure idUsuario exists
    redirect(`/dashboard/${user.idUsuario}`)
  } else if (user.tipoUsuario === "admin") {
    // For admins, redirect to admin dashboard
    redirect("/admin")
  } else {
    // Fallback for any other case
    redirect("/unauthorized")
  }
  
  // This code will never execute due to redirects above
  return <div>This is the dashboard page</div>
}