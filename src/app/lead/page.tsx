import { requireLead } from "@/app/auth/utils"
import { EmployeeTable } from "./components/employee-table"

// Mock data for employees - in a real app, this would come from an API call
const employeesData = [
  { id: '1', name: 'Ralph Edwards', avatar: '/placeholder.svg?height=40&width=40', level: 9, position: 'Python developer', availability: 96, experience: 5 },
  { id: '2', name: 'Jessica Taylor', avatar: '/placeholder.svg?height=40&width=40', level: 7, position: 'Frontend developer', availability: 92, experience: 3 },
  { id: '3', name: 'Michael Brown', avatar: '/placeholder.svg?height=40&width=40', level: 10, position: 'Backend developer', availability: 98, experience: 4 },
  { id: '4', name: 'Michael Brown', avatar: '/placeholder.svg?height=40&width=40', level: 10, position: 'Backend developer', availability: 98, experience: 4 },
  { id: '5', name: 'Emily Davis', avatar: '/placeholder.svg?height=40&width=40', level: 5, position: 'UX designer', availability: 85, experience: 2 },
  { id: '6', name: 'Chris Johnson', avatar: '/placeholder.svg?height=40&width=40', level: 8, position: 'Data scientist', availability: 94, experience: 6 },
  { id: '7', name: 'Chris Johnson', avatar: '/placeholder.svg?height=40&width=40', level: 8, position: 'Data scientist', availability: 94, experience: 6 },
  { id: '8', name: 'Sarah Wilson', avatar: '/placeholder.svg?height=40&width=40', level: 6, position: 'Product manager', availability: 90, experience: 3 },
  { id: '9', name: 'David Martinez', avatar: '/placeholder.svg?height=40&width=40', level: 4, position: 'Graphic designer', availability: 89, experience: 1 },
  { id: '10', name: 'Laura Garcia', avatar: '/placeholder.svg?height=40&width=40', level: 3, position: 'SEO specialist', availability: 78, experience: 2 },
  { id: '11', name: 'James Anderson', avatar: '/placeholder.svg?height=40&width=40', level: 2, position: 'System analyst', availability: 80, experience: 1 },
  { id: '12', name: 'Alex Thompson', avatar: '/placeholder.svg?height=40&width=40', level: 7, position: 'DevOps engineer', availability: 93, experience: 4 },
  { id: '13', name: 'Sophia Lee', avatar: '/placeholder.svg?height=40&width=40', level: 6, position: 'QA engineer', availability: 87, experience: 3 },
  { id: '14', name: 'Daniel Clark', avatar: '/placeholder.svg?height=40&width=40', level: 8, position: 'Mobile developer', availability: 91, experience: 5 },
]

// Server component for the lead page
export default async function LeadPage() {
  // Ensure only leads can access this page
  await requireLead()
  
  // In a real app, you would fetch employee data here
  // const employeesData = await fetchEmployees();
  
  return (
    <div className="space-y-6">
      <EmployeeTable employees={employeesData} />
    </div>
  )
}
