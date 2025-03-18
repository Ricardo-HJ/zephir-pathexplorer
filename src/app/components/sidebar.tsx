"use client"

import * as React from "react"
import { Home, Users, BarChart3, Settings, HelpCircle, Mail, Calendar, FileText } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "../lib/utils"

export function AppSidebar() {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const pathname = usePathname()

  // Navigation items with icons and labels
  const navItems = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/dashboard",
    },
    {
      title: "Users",
      icon: Users,
      href: "/users",
    },
    {
      title: "Analytics",
      icon: BarChart3,
      href: "/analytics",
    },
    {
      title: "Messages",
      icon: Mail,
      href: "/messages",
    },
    {
      title: "Calendar",
      icon: Calendar,
      href: "/calendar",
    },
    {
      title: "Documents",
      icon: FileText,
      href: "/documents",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/settings",
    },
    {
      title: "Help",
      icon: HelpCircle,
      href: "/help",
    },
  ]

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
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            A
          </div>
          <span
            className={cn(
              "ml-2 font-semibold transition-opacity duration-300",
              isExpanded ? "opacity-100" : "opacity-0",
            )}
          >
            App Name
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
                  ? "bg-primary text-primary-foreground"
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
                <div className="absolute left-full ml-2 rounded bg-primary px-2 py-1 text-xs font-medium text-primary-foreground opacity-0 shadow transition-opacity group-hover:opacity-100">
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

