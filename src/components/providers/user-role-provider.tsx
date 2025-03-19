"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import Cookies from "js-cookie"

type UserRoleContextType = {
  role: string | null
  isAdmin: boolean
  isLead: boolean
  isEmployee: boolean
}

const UserRoleContext = createContext<UserRoleContextType>({
  role: null,
  isAdmin: false,
  isLead: false,
  isEmployee: false,
})

export function UserRoleProvider({
  children,
  initialRole,
}: {
  children: React.ReactNode
  initialRole?: string
}) {
  const [role, setRole] = useState<string | null>(initialRole || null)

  useEffect(() => {
    if (!initialRole) {
      const userType = Cookies.get("user_type")
      setRole(userType || null)
    }
  }, [initialRole])

  const value = {
    role,
    isAdmin: role === "admin",
    isLead: role === "lead",
    isEmployee: role === "employee",
  }

  return <UserRoleContext.Provider value={value}>{children}</UserRoleContext.Provider>
}

export const useUserRoleContext = () => useContext(UserRoleContext)

