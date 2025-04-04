"use client"

import { useState, useEffect } from "react"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"

export function useAuth() {
  const [role, setRole] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const userType = Cookies.get("user_type")
    // Get the user ID from the cookie instead of using a mock ID
    const userIdFromCookie = Cookies.get("user_id")

    setUserId(userIdFromCookie || null)
    setRole(userType || null)
    setIsLoading(false)
  }, [])

  const logout = async () => {
    try {
      // Call the auth API to logout
      await fetch("/auth/api", {
        method: "DELETE",
      })

      // Clear cookies on the client side as a fallback
      Cookies.remove("auth_token")
      Cookies.remove("user_type")
      Cookies.remove("user_id")

      // Navigate to login page
      router.push("/")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return {
    role,
    userId,
    isLoading,
    isAdmin: role === "admin",
    isLead: role === "lead",
    isEmployee: role === "employee",
    logout,
  }
}

