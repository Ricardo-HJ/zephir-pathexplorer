"use client"

import type React from "react"

import { useUserRole } from "@/hooks/useUserRole"

interface RoleBasedUIProps {
  roles: string[]
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function RoleBasedUI({ roles, children, fallback = null }: RoleBasedUIProps) {
  const { role, isLoading } = useUserRole()

  // Don't render anything while loading
  if (isLoading) {
    return null
  }

  // Render children if user has one of the required roles
  if (role && roles.includes(role)) {
    return <>{children}</>
  }

  // Otherwise render fallback
  return <>{fallback}</>
}

