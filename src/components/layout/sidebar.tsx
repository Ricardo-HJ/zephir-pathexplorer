"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function AppSidebar() {
  const pathname = usePathname()

  // Navigation items - you can replace these with your actual routes
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Tools", path: "/tools" },
    { name: "Resources", path: "/resources" },
    { name: "Team", path: "/team" },
    { name: "Reports", path: "/reports" },
  ]

  // Footer items
  const footerItems = [
    { name: "Settings", path: "/settings" },
    { name: "Logout", path: "/logout" },
  ]

  return (
    <aside className="h-screen w-16 flex flex-col bg-white border-r border-gray-200">
      {/* Logo at the top */}
      <div className="flex justify-center py-4">
        <div className="w-8 h-8">
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-purple-600 font-bold text-2xl">&gt;</div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="flex-1 flex flex-col items-center gap-6 py-4">
        {navItems.map((item, index) => {
          const isActive = pathname === item.path
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`
                flex justify-center items-center w-12 h-12 rounded-lg
                ${index === 0 ? "bg-white shadow-md" : "bg-gray-300"}
                transition-colors duration-200
              `}
              title={item.name}
            >
              {/* This is where you'll place your custom SVG icons later */}
              <div className="w-6 h-6 flex items-center justify-center">
                {index === 0 && <div className="w-5 h-5 bg-gray-800 rounded-sm"></div>}
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Footer navigation */}
      <div className="flex flex-col items-center gap-6 py-8 mt-auto">
        {footerItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className="flex justify-center items-center w-12 h-12 rounded-lg bg-gray-300 transition-colors duration-200"
            title={item.name}
          >
            {/* This is where you'll place your custom SVG icons later */}
            <div className="w-6 h-6 flex items-center justify-center"></div>
          </Link>
        ))}
      </div>
    </aside>
  )
}

