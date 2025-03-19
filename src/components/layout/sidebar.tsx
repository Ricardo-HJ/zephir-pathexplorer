"use client"

import * as React from "react"
import { Home, Users, Settings, FileText, User, MessageSquare } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useUserRole } from "@/hooks/useUserRole"

export function AppSidebar() {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const pathname = usePathname()
  const { role } = useUserRole()

  // Define navigation items based on user role
  const getNavItems = () => {
    // Base navigation items for all users
    const sharedItems = [
      {
        title: "Dashboard",
        icon: Home,
        href: `/${role}/dashboard`,
      },
      {
        title: "Mensajes",
        icon: MessageSquare,
        href: "/shared/messages",
      },
      {
        title: "Perfil",
        icon: User,
        href: "/shared/profile",
      },
      {
        title: "Configuración",
        icon: Settings,
        href: "/shared/settings",
      },
    ]

    // Role-specific items
    if (role === "admin") {
      return [
        ...sharedItems,
        {
          title: "Usuarios",
          icon: Users,
          href: "/admin/users",
        },
      ]
    } else if (role === "lead") {
      return [
        ...sharedItems,
        {
          title: "Equipo",
          icon: Users,
          href: "/lead/team",
        },
      ]
    } else if (role === "employee") {
      return [
        ...sharedItems,
        {
          title: "Tareas",
          icon: FileText,
          href: "/employee/tasks",
        },
      ]
    }

    return sharedItems
  }

  const navItems = getNavItems()

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-20 h-screen bg-background transition-all duration-300 ease-in-out border-r",
        isExpanded ? "w-64" : "w-16",
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex h-14 items-center justify-center border-b">
        <div
          className={cn(
            "flex items-center overflow-hidden transition-all duration-300",
            isExpanded ? "justify-start px-4" : "justify-center",
          )}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accenture-purple text-white">A</div>
          <span
            className={cn(
              "ml-2 font-semibold transition-opacity duration-300",
              isExpanded ? "opacity-100" : "opacity-0",
            )}
          >
            Zephir HR
          </span>
        </div>
      </div>

      <nav className="flex flex-col gap-2 p-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex h-10 items-center rounded-md px-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-accenture-purple text-white"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <item.icon className={cn("h-5 w-5", isExpanded ? "mr-2" : "mx-auto")} />
              <span
                className={cn(
                  "transition-all duration-300",
                  isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden",
                )}
              >
                {item.title}
              </span>

              {/* Tooltip for icon-only mode */}
              {!isExpanded && (
                <div className="absolute left-full ml-2 rounded bg-accenture-purple px-2 py-1 text-xs font-medium text-white opacity-0 shadow transition-opacity group-hover:opacity-100">
                  {item.title}
                </div>
              )}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

