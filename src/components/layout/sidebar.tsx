"use client"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { useAuth } from "@/app/auth/hooks/useAuth"
import {
  HomeIcon,
  CareerIcon,
  EducationIcon,
  TeamsIcon,
  ChartsIcon,
  SettingsIcon,
  LogoutIcon,
} from "@/components/ui/icons"

type IconIdKeys = "Inicio" | "Carrera" | "Habilidades" | "Proyectos" | "Analisis" | "Ajustes" | "Cerrar sesion"

export function AppSidebar() {
  const pathname = usePathname()
  const [isExpanded, setIsExpanded] = useState(false)
  const { isLead, isEmployee, userId, logout } = useAuth()

  // Navigation items with Spanish names - adjusted based on user role
  const navItems: { name: IconIdKeys; path: string }[] = [
    {
      name: "Inicio",
      path: `/${userId}/dashboard`
    },
    {
      name: "Carrera",
      path: `/${userId}/carrera`,
    },
    {
      name: "Habilidades",
      path: `/${userId}/habilidades`,
    },
    {
      name: "Proyectos",
      path: `/${userId}/proyectos`,
    },
    {
      name: "Analisis",
      path: `/${userId}/analisis`,
    },
  ]

  // Icon mapping (Spanish name to icon component)
  const getIconComponent = (name: IconIdKeys) => {
    const iconMap = {
      Inicio: HomeIcon,
      Carrera: CareerIcon,
      Habilidades: EducationIcon,
      Proyectos: TeamsIcon,
      Analisis: ChartsIcon,
      Ajustes: SettingsIcon,
      "Cerrar sesion": LogoutIcon,
    }

    const IconComponent = iconMap[name]
    return IconComponent
  }

  // Footer items with Spanish names
  const footerItems: { name: IconIdKeys; path: string }[] = [
    { name: "Ajustes", path: "/shared/settings" },
    { name: "Cerrar sesion", path: "#" },
  ]

  return (
    <aside
      className={`z-50 fixed left-0 top-0 h-screen ${isExpanded ? "w-64" : "w-16"} flex flex-col bg-[#ffffff] border-r border-gray-200 z-10 transition-all duration-300 ease-in-out`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Logo at the top - fixed height container */}
      <div className="flex justify-center items-center h-20">
        <div className={`relative transition-all duration-300 ease-in-out ${isExpanded ? "w-48 h-10" : "w-8 h-8"}`}>
          {/* Both images are always present, but only one is visible based on expanded state */}
          <Image
            src="/Accenture logo.png"
            alt="Accenture Icon"
            fill
            className={`object-contain transition-opacity duration-300 ${isExpanded ? "opacity-0" : "opacity-100"}`}
            priority
          />
          <Image
            src="/isotype.png"
            alt="Accenture"
            fill
            className={`object-contain transition-opacity duration-300 ${isExpanded ? "opacity-100" : "opacity-0"}`}
            priority
          />
        </div>
      </div>

      {/* Main navigation */}
      <nav className="flex-1 flex flex-col items-start px-3 gap-4 py-4">
        {navItems.map((item) => {
          // Check if the current path matches this nav item
          const isActive =
            pathname.includes(item.path.split("/").pop() || "") ||
            (item.name === "Inicio" && pathname.includes("dashboard")) ||
            (item.name === "Inicio" && pathname === "/lead") ||
            (item.name === "Inicio" && pathname === "/admin")

          const IconComponent = getIconComponent(item.name)

          return (
            <Link
              key={item.name}
              href={item.path}
              className={`
                flex items-center ${isExpanded ? "w-[90%] px-4" : "w-10 justify-center"} h-10 rounded-md
                ${isActive ? "bg-white shadow-md" : "hover:bg-white/60"}
                transition-all duration-200
              `}
              title={item.name}
            >
              <div className={`w-5 h-5 flex items-center justify-center ${isActive ? "text-black" : "text-gray-500"}`}>
                <IconComponent size="sm" className={isActive ? "text-black" : "text-gray-500"} />
              </div>
              {isExpanded && (
                <span className={`ml-3 ${isActive ? "text-black font-medium" : "text-gray-500"}`}>{item.name}</span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer navigation */}
      <div className="flex flex-col items-start px-3 gap-4 py-8 mt-auto">
        {footerItems.map((item) => {
          const IconComponent = getIconComponent(item.name)

          // Special handling for logout
          if (item.name === "Cerrar sesion") {
            return (
              <button
                key={item.name}
                onClick={logout} // Use the logout function from useAuth
                className={`
                  flex items-center ${isExpanded ? "w-[90%] px-4" : "w-10 justify-center"} h-10 rounded-md
                  hover:bg-white/60 transition-all duration-200 cursor-pointer
                `}
                title={item.name}
              >
                <div className="w-5 h-5 flex items-center justify-center text-gray-500">
                  <IconComponent size="sm" className="text-gray-500" />
                </div>
                {isExpanded && <span className="ml-3 text-gray-500">{item.name}</span>}
              </button>
            )
          }

          // Regular link for other items
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`
                flex items-center ${isExpanded ? "w-[90%] px-4" : "w-10 justify-center"} h-10 rounded-md
                hover:bg-white/60 transition-all duration-200
              `}
              title={item.name}
            >
              <div className="w-5 h-5 flex items-center justify-center text-gray-500">
                <IconComponent size="sm" className="text-gray-500" />
              </div>
              {isExpanded && <span className="ml-3 text-gray-500">{item.name}</span>}
            </Link>
          )
        })}
      </div>
    </aside>
  )
}
