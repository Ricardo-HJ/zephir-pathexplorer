"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ChevronDown, ChevronRight, ExternalLink } from "lucide-react"
import { RoleBasedUI } from "@/components/shared/role-based-ui"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/app/auth/hooks/useAuth"
import { useParams } from "next/navigation"

// Type for the params
interface Params {
  employeeId: string
}

interface Props {
  params: Params
}

// Mock employee data - in a real app, this would come from an API call
const getMockEmployee = (id: string) => {
  return {
    id,
    name: "Jacob Jones",
    position: "Mobile developer",
    level: 9,
    years: 4,
    availability: 82,
    email: "jones.jacob@accenture.com",
    phone: "+1 (219) 555-0114",
    availableSince: "Junio '24",
    experience: [
      {
        role: "React front end developer",
        description:
          "Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
        feedback:
          "Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
        leader: "Floyd Miles",
        startDate: "Febrero 25",
        endDate: "Junio 25",
        status: "En curso",
      },
      {
        role: "Next front end developer",
        company: "ITESM",
        description:
          "Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
        feedback:
          "Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
        startDate: "Febrero 25",
        endDate: "Junio 25",
        status: "Terminado",
      },
      {
        role: "Next front end developer",
        company: "ITESM",
        description:
          "Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
        feedback:
          "Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
        startDate: "Febrero 25",
        endDate: "Junio 25",
        status: "Terminado",
      },
    ],
    certifications: [
      {
        name: "Inglés C1",
        provider: "Accenture",
        expiryDate: "Junio 25",
        status: "Aprobado",
      },
      {
        name: "Francés C1",
        provider: "Caduca",
        expiryDate: "Junio 25",
        status: "Pendiente",
      },
      {
        name: "React",
        provider: "Cursera",
        expiryDate: "Junio 25",
        status: "Pendiente",
      },
      {
        name: "Javascript",
        provider: "Cursera",
        expiryDate: "Junio 25",
        status: "Pendiente",
      },
      {
        name: "HTML",
        provider: "Cursera",
        expiryDate: "Junio 25",
        status: "Pendiente",
      },
      {
        name: "CSS",
        provider: "Cursera",
        expiryDate: "Junio 25",
        status: "Pendiente",
      },
    ],
    softSkills: ["Liderazgo", "Comunicación", "Manejo de tiempo", "Empatía"],
    hardSkills: ["Python", "IA", "HTML", "C++"],
  }
}

export default function EmployeeProfilePage({ params }: Props) {
  // State for expandable sections
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({})

  // Get current user info
  const { userId, role } = useAuth()

  // Get the employeeId from params
  // In Next.js 15, we need to handle params differently in client components
  // We'll use a type assertion to avoid the warning
  const { employeeId } = useParams() as { employeeId: string }

  // Check if viewing own profile
  const isOwnProfile = userId === employeeId

  // Toggle expansion for description or feedback
  const toggleExpand = (type: string, index: number) => {
    const key = `${type}-${index}`
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  // Check if a section is expanded
  const isExpanded = (type: string, index: number) => {
    const key = `${type}-${index}`
    return !!expandedItems[key]
  }

  // In a real app, you would fetch employee data from an API
  const employee = getMockEmployee(employeeId)

  return (
    <div>
      {/* Header with profile info - with divider lines and 40px gaps */}
      <div className="flex items-center mb-6">
        {/* Profile and basic info */}
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 rounded-full overflow-hidden">
            <Image
              src="/placeholder.svg?height=64&width=64"
              alt={employee.name}
              width={64}
              height={64}
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{employee.name}</h1>
            <p className="text-gray-600">
              {employee.position}, Nivel {employee.level} -{" "}
              <span className="text-accenture-purple">{employee.years} años</span>
            </p>
          </div>
        </div>

        {/* First divider */}
        <div className="mx-10 h-16 w-px bg-gray-200"></div>

        {/* Availability */}
        <div>
          <p className="text-lg font-semibold mb-1">Cargabilidad</p>
          <div className="flex items-center gap-4">
            <div className="w-48 h-4 bg-purple-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-accenture-purple rounded-full"
                style={{ width: `${employee.availability}%` }}
              ></div>
            </div>
            <span className="font-medium">{employee.availability}%</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Desde {employee.availableSince}</p>
        </div>

        {/* Second divider */}
        <div className="mx-10 h-16 w-px bg-gray-200"></div>

        {/* Contact info */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <p className="font-medium">{employee.email}</p>
            <button className="text-gray-500">
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>
          <p className="text-gray-600">{employee.phone}</p>
        </div>
      </div>

      {/* Main content sections - with 24px gap */}
      <div className="mt-6 flex gap-6 h-[calc(100vh-220px)]">
        {/* Experience section - left column, about 30% width */}
        <div className="w-[30%] flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-accenture-purple">Experiencia</h2>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1 bg-accenture-purple text-white hover:bg-accenture-purple/90"
            >
              Ver
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-6 overflow-y-auto flex-grow">
            {employee.experience.map((exp, index) => (
              <div key={index} className="border-b pb-4 last:border-0">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{exp.role}</h3>
                  {exp.company && <p className="text-gray-600">{exp.company}</p>}
                </div>

                {/* Description - expandable */}
                <div className="mt-2">
                  <div
                    className="flex items-center gap-1 cursor-pointer"
                    onClick={() => toggleExpand("description", index)}
                  >
                    {isExpanded("description", index) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                    <p className="text-sm text-gray-600">Descripción</p>
                  </div>

                  {isExpanded("description", index) && <p className="text-sm mt-1 pl-5">{exp.description}</p>}
                </div>

                {/* Feedback - expandable, only visible if not own profile */}
                {!isOwnProfile && (
                  <div className="mt-2">
                    <div
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => toggleExpand("feedback", index)}
                    >
                      {isExpanded("feedback", index) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                      <p className="text-sm text-gray-600">Feedback</p>
                    </div>

                    {isExpanded("feedback", index) && <p className="text-sm mt-1 pl-5">{exp.feedback}</p>}
                  </div>
                )}

                {/* Always visible information */}
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                  {exp.leader && (
                    <div>
                      <p className="text-gray-600">Líder</p>
                      <p>{exp.leader}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-gray-600">Inicio</p>
                    <p>{exp.startDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Fin</p>
                    <p>{exp.endDate}</p>
                  </div>
                  {exp.status && (
                    <div>
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded-full ${
                          exp.status === "En curso"
                            ? "bg-yellow-100 text-yellow-800"
                            : exp.status === "Terminado"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {exp.status}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications section - middle column, about 25% width */}
        <div className="w-[25%] flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-accenture-purple">Certificaciones</h2>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1 bg-accenture-purple text-white hover:bg-accenture-purple/90"
            >
              Ver
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4 overflow-y-auto flex-grow">
            {employee.certifications.map((cert, index) => (
              <div key={index} className="border-b pb-4 last:border-0">
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium">{cert.name}</h3>
                  <p className="text-gray-600">{cert.provider}</p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-600">Caduca</p>
                    <p className="text-sm">- {cert.expiryDate}</p>
                  </div>
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full ${
                      cert.status === "Aprobado" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {cert.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills sections - right column, about 45% width */}
        <div className="w-[45%] flex flex-col">
          <div className="flex flex-col h-1/2 pb-3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-accenture-purple">Soft skills</h2>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 bg-accenture-purple text-white hover:bg-accenture-purple/90"
              >
                Ver
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {employee.softSkills.map((skill, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                  <p>{skill}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col h-1/2 pt-3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-accenture-purple">Hard skills</h2>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 bg-accenture-purple text-white hover:bg-accenture-purple/90"
              >
                Ver
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {employee.hardSkills.map((skill, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                  <p>{skill}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Close profile button - only visible for leads */}
      <div className="mt-8 flex justify-end">
        <RoleBasedUI roles={["lead"]}>
          <Link href="/lead">
            <Button variant="default" className="bg-gray-800 hover:bg-gray-700">
              Cerrar perfil
            </Button>
          </Link>
        </RoleBasedUI>
      </div>
    </div>
  )
}

