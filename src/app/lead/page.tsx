// /app/lead/page.tsx
import { requireLead } from "@/app/auth/utils"

export default async function LeadPage() {
  // This is the lead page that shows the employee table
  await requireLead() // Ensure only leads can access this page
  
  return (
    <div>
      <h1>Lead Dashboard</h1>
      <p>This page will show a table of all employees</p>
      <p>Clicking on an employee will navigate to their dashboard</p>
    </div>
  )
}