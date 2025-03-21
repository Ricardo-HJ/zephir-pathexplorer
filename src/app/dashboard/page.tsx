// /app/dashboard/page.tsx
import { redirect } from "next/navigation"
import { requireAuth } from "@/app/auth/utils"

export default async function DashboardPage() {
  // This is the main dashboard page that redirects based on user role
  const user = await requireAuth()
  
  if (user.tipoUsuario === "lead") {
    // For leads, redirect to the lead page with employee table
    redirect("/lead")
  } else {
    // For employees, redirect to their specific dashboard
    redirect(`/dashboard/${user.idUsuario}`)
  }
  
  // This code will never execute due to redirects above
  return <div>This is the dashboard page</div>
}