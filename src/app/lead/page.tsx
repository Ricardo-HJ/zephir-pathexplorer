import { requireLead } from "@/app/auth/utils"
import { EmployeeTable } from "./components/employee-table"

/**
 * CHANGES:
 * 1. Removed all mock data - the EmployeeTable component now fetches data directly from the API
 * 2. Maintained the same UI structure and appearance
 */

// Server component for the lead page
export default async function LeadPage() {
  // Ensure only leads can access this page
  await requireLead()

  return (
    <div className="space-y-6">
      <EmployeeTable />
    </div>
  )
}

