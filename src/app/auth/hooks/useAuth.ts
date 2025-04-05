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
    const userIdFromCookie = Cookies.get("user_id")

    console.log("useAuth: Retrieved cookies - user_type:", userType || "not found")
    console.log("useAuth: Retrieved cookies - user_id:", userIdFromCookie || "not found")

    setUserId(userIdFromCookie || null)
    setRole(userType || null)
    setIsLoading(false)
  }, [])

  const logout = async () => {
    try {
      console.log("useAuth: Logout initiated")
      // Call the auth API to logout
      await fetch("/auth/api", {
        method: "DELETE",
      })

      console.log("useAuth: Removing cookies on client side")
      // Clear cookies on the client side as a fallback
      Cookies.remove("auth_token")
      Cookies.remove("user_type")
      Cookies.remove("user_id")

      // Navigate to login page
      console.log("useAuth: Redirecting to login page")
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

