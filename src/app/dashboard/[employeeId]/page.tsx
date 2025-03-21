// src/app/dashboard/[employeeId]/page.tsx
import { notFound } from "next/navigation"
import { requireAuth } from "@/app/auth/utils"

interface Params {
  employeeId?: string
}

interface Props {
  params: Params
}

export default async function EmployeeDashboardPage({ params }: Props) {
  // This is the employee-specific dashboard page
  const { employeeId } = await params
  const currentUser = await requireAuth()
  
  // Handle case where employeeId is undefined
  if (!employeeId) {
    notFound()
  }
  
  // Authorization check - only allow if user is a lead OR if the employee is viewing their own dashboard
  if (currentUser.tipoUsuario !== "lead" && currentUser.idUsuario !== employeeId) {
    // Not authorized to view this employee's data
    notFound()
  }
  
  return (
    <div>
      <h1>Employee Dashboard</h1>
      <p>This is the dashboard for employee ID: {employeeId}</p>
      <p>This page will show employee information</p>
    </div>
  )
}