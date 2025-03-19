"use client"

import { useRouter } from "next/navigation"

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    // Clear cookies on the client side as a fallback
    document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    document.cookie = "user_type=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"

    // Navigate to login page
    router.push("/login")
  }

  return (
    <button onClick={handleLogout} className="text-accenture-purple hover:underline">
      Cerrar sesión
    </button>
  )
}

