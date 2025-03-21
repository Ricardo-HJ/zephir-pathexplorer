"use client"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { useAuth } from "@/app/auth/hooks/useAuth"

type IconIdKeys = "Inicio" | "Carrera" | "Habilidades" | "Proyectos" | "Analisis" | "Ajustes" | "Cerrar sesion"

export function AppSidebar() {
  const pathname = usePathname()
  const [isExpanded, setIsExpanded] = useState(false)
  const { isLead } = useAuth()

  // Navigation items with Spanish names
  const navItems: { name: IconIdKeys; path: string }[] = [
    { 
      name: "Inicio", 
      path: isLead ? "/lead" : "/dashboard" 
    },
    { name: "Carrera", path: "/tools" },
    { name: "Habilidades", path: "/resources" },
    { name: "Proyectos", path: "/team" },
    { name: "Analisis", path: "/reports" },
  ]

  // Icon mapping (Spanish name to icon ID)
  const iconIds: Record<IconIdKeys, string> = {
    Inicio: "icon-home",
    Carrera: "icon-carrer",
    Habilidades: "icon-education",
    Proyectos: "icon-teams",
    Analisis: "icon-charts",
    Ajustes: "icon-setting",
    "Cerrar sesion": "icon-logout",
  }

  // Footer items with Spanish names
  const footerItems: { name: IconIdKeys; path: string}[] = [
    { name: "Ajustes", path: "/shared/settings" },
    { name: "Cerrar sesion", path: "#" },
  ]

  return (
    <aside
      className={`fixed left-0 top-0 h-screen ${isExpanded ? "w-64" : "w-16"} flex flex-col bg-[#ffffff] border-r border-gray-200 z-10 transition-all duration-300 ease-in-out`}
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
          const isActive = pathname.includes(item.path)

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
                <svg className="w-4 h-4" aria-hidden="true">
                  <use href={`/sprite.svg#${iconIds[item.name]}`} />
                </svg>
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
          // Special handling for logout
          if (item.name === "Cerrar sesion") {
            return (
              <button
                key={item.name}
                onClick={async () => {
                  try {
                    // Call the logout API endpoint
                    await fetch("/api/auth/logout", { method: "GET" })
                    // Redirect to login page
                    window.location.href = "/"
                  } catch (error) {
                    console.error("Logout failed:", error)
                  }
                }}
                className={`
                  flex items-center ${isExpanded ? "w-[90%] px-4" : "w-10 justify-center"} h-10 rounded-md
                  hover:bg-white/60 transition-all duration-200 cursor-pointer
                `}
                title={item.name}
              >
                <div className="w-5 h-5 flex items-center justify-center text-gray-500">
                  <svg className="w-4 h-4" aria-hidden="true">
                    <use href={`/sprite.svg#${iconIds[item.name]}`} />
                  </svg>
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
                <svg className="w-4 h-4" aria-hidden="true">
                  <use href={`/sprite.svg#${iconIds[item.name]}`} />
                </svg>
              </div>
              {isExpanded && <span className="ml-3 text-gray-500">{item.name}</span>}
            </Link>
          )
        })}
      </div>
    </aside>
  )
}

