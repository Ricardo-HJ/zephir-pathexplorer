"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { ChevronDown, ChevronRight, ExternalLink } from "lucide-react"
import { RoleBasedUI } from "@/components/shared/role-based-ui"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/app/auth/hooks/useAuth"
import { useParams } from "next/navigation"
import { useUserProfile } from "@/app/auth/hooks/use-user-profile"
import { getUserSkills, getUserCertifications, getUserProjects } from "@/services/api"
import Cookies from "js-cookie"

export default function EmployeeProfilePage() {
  // State for expandable sections
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({})
  const [skills, setSkills] = useState<{ soft: string[]; hard: string[] }>({ soft: [], hard: [] })
  const [certifications, setCertifications] = useState<any[]>([])
  const [experience, setExperience] = useState<any[]>([])
  const [isLoadingSkills, setIsLoadingSkills] = useState(true)
  const [isLoadingCerts, setIsLoadingCerts] = useState(true)
  const [isLoadingExp, setIsLoadingExp] = useState(true)

  // Get current user info
  const { userId, role } = useAuth()

  // Get the employeeId from params
  const { employeeId } = useParams() as { employeeId: string }

  // Fetch the employee profile data
  const { user, isLoading, error } = useUserProfile(employeeId)

  // Check if viewing own profile
  const isOwnProfile = userId === employeeId

  // Fetch additional data when user is loaded
  useEffect(() => {
    async function fetchAdditionalData() {
      if (!user || !employeeId) return

      const token = Cookies.get("auth_token")
      if (!token) return

      try {
        // Fetch skills
        setIsLoadingSkills(true)
        const skillsData = await getUserSkills(employeeId, token)
        setSkills({
          soft: skillsData.softSkills || [],
          hard: skillsData.hardSkills || [],
        })
      } catch (err) {
        console.error("Error fetching skills:", err)
        // Initialize with empty arrays if API fails
        setSkills({ soft: [], hard: [] })
      } finally {
        setIsLoadingSkills(false)
      }

      try {
        // Fetch certifications
        setIsLoadingCerts(true)
        const certsData = await getUserCertifications(employeeId, token)
        setCertifications(certsData.certifications || [])
      } catch (err) {
        console.error("Error fetching certifications:", err)
        setCertifications([])
      } finally {
        setIsLoadingCerts(false)
      }

      try {
        // Fetch experience (projects)
        setIsLoadingExp(true)
        const expData = await getUserProjects(employeeId, token)
        setExperience(expData.projects || [])
      } catch (err) {
        console.error("Error fetching experience:", err)
        setExperience([])
      } finally {
        setIsLoadingExp(false)
      }
    }

    fetchAdditionalData()
  }, [user, employeeId])

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

  // Show loading state for the entire page
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-220px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accenture-purple"></div>
      </div>
    )
  }

  // Show error state
  if (error || !user) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-220px)]">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
          <p>{error || "Failed to load employee profile"}</p>
        </div>
      </div>
    )
  }

  // Format the full name
  const fullName = [user.nombre, user.apellidoP, user.apellidoM].filter(Boolean).join(" ") || user.correo

  return (
    <div>
      {/* Header with profile info - with divider lines and 40px gaps */}
      <div className="flex items-center mb-6">
        {/* Profile and basic info */}
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 rounded-full overflow-hidden">
            <Image
              src="/placeholder.svg?height=64&width=64"
              alt={fullName}
              width={64}
              height={64}
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{fullName}</h1>
            <p className="text-gray-600">
              {user.profesion || "No position specified"}
              {user.fechaIngreso && ` - ${new Date(user.fechaIngreso).getFullYear() - new Date().getFullYear()} años`}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-12 w-px bg-gray-300 mx-6"></div>

        {/* Contact info */}
        <div>
          <p className="text-gray-600">
            <span className="font-medium">Email:</span> {user.correo}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Teléfono:</span> {user.telefono || "No especificado"}
          </p>
        </div>

        {/* Divider */}
        <div className="h-12 w-px bg-gray-300 mx-6"></div>

        {/* Availability info */}
        <div>
          <p className="text-gray-600">
            <span className="font-medium">Cargabilidad:</span> {/* This would come from API */}
            <span className="text-green-600 font-medium"> 82%</span>
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Disponible desde:</span> {/* This would come from API */}
            <span className="text-accenture-purple font-medium"> Junio '24</span>
          </p>
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

          {isLoadingExp ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accenture-purple"></div>
            </div>
          ) : experience.length === 0 ? (
            <div className="flex justify-center items-center h-full text-gray-500">No hay experiencia registrada</div>
          ) : (
            <div className="space-y-4 overflow-y-auto pr-2">
              {experience.map((exp, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold">{exp.rolEnProyecto || "Rol no especificado"}</h3>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                      {exp.status || "Completado"}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">Líder:</span> {exp.leader || "No especificado"}
                    </p>
                    <p>
                      <span className="font-medium">Periodo:</span> {exp.fechaInicio || "N/A"} - {exp.fechaFin || "N/A"}
                    </p>
                  </div>
                  <div className="mt-2">
                    <button
                      onClick={() => toggleExpand("description", index)}
                      className="flex items-center text-sm text-accenture-purple"
                    >
                      {isExpanded("description", index) ? (
                        <ChevronDown className="h-4 w-4 mr-1" />
                      ) : (
                        <ChevronRight className="h-4 w-4 mr-1" />
                      )}
                      Descripción
                    </button>
                    {isExpanded("description", index) && (
                      <p className="mt-2 text-sm text-gray-600">
                        {exp.descripcion || "No hay descripción disponible."}
                      </p>
                    )}
                  </div>
                  <div className="mt-2">
                    <button
                      onClick={() => toggleExpand("feedback", index)}
                      className="flex items-center text-sm text-accenture-purple"
                    >
                      {isExpanded("feedback", index) ? (
                        <ChevronDown className="h-4 w-4 mr-1" />
                      ) : (
                        <ChevronRight className="h-4 w-4 mr-1" />
                      )}
                      Feedback
                    </button>
                    {isExpanded("feedback", index) && (
                      <p className="mt-2 text-sm text-gray-600">{exp.feedback || "No hay feedback disponible."}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
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

          {isLoadingCerts ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accenture-purple"></div>
            </div>
          ) : certifications.length === 0 ? (
            <div className="flex justify-center items-center h-full text-gray-500">
              No hay certificaciones registradas
            </div>
          ) : (
            <div className="space-y-4 overflow-y-auto pr-2">
              {certifications.map((cert, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold">{cert.nombre || "Certificación sin nombre"}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        cert.status === "Aprobado"
                          ? "bg-green-100 text-green-800"
                          : cert.status === "En proceso"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {cert.status || "No especificado"}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">Proveedor:</span> {cert.provider || "No especificado"}
                    </p>
                    <p>
                      <span className="font-medium">Vence:</span> {cert.caducidad || "No especificado"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
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

            {isLoadingSkills ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accenture-purple"></div>
              </div>
            ) : skills.soft.length === 0 ? (
              <div className="flex justify-center items-center h-full text-gray-500">
                No hay soft skills registradas
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {skills.soft.map((skill, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                    <p>{skill}</p>
                  </div>
                ))}
              </div>
            )}
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

            {isLoadingSkills ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accenture-purple"></div>
              </div>
            ) : skills.hard.length === 0 ? (
              <div className="flex justify-center items-center h-full text-gray-500">
                No hay hard skills registradas
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {skills.hard.map((skill, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                    <p>{skill}</p>
                  </div>
                ))}
              </div>
            )}
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

