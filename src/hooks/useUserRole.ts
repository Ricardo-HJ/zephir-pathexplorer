"use client"

import { useState, useEffect } from "react"
import Cookies from "js-cookie"

export function useUserRole() {
  const [role, setRole] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const userType = Cookies.get("user_type")
    setRole(userType || null)
    setIsLoading(false)
  }, [])

  return {
    role,
    isLoading,
    isAdmin: role === "admin",
    isLead: role === "lead",
    isEmployee: role === "employee",
  }
}

