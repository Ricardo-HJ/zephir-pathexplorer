"use client"

import { useState, useEffect } from "react"
import { getCurrentUser, logout, type CurrentUser } from "@/app/auth/actions"

export function useAuth() {
  const [authState, setAuthState] = useState<{
    userData: CurrentUser
    isLoading: boolean
    error: string | null
  }>({
    userData: { userId: null, role: null, token: null },
    isLoading: true,
    error: null,
  })

  console.log("useAuth: Initial state:", authState)

  // Function to fetch the current user data
  const fetchUserData = async () => {
    console.log("useAuth: Fetching user data...")
    try {
      const data = await getCurrentUser()
      console.log("useAuth: User data received:", {
        userId: data.userId,
        role: data.role,
        token: data.token,
      })

      setAuthState({
        userData: data,
        isLoading: false,
        error: null,
      })
    } catch (error) {
      console.error("useAuth: Error fetching user data:", error)
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Failed to fetch user data",
      }))
    }
  }

  useEffect(() => {
    console.log("useAuth: Running initial data fetch")
    fetchUserData()
  }, [])

  // Handle logout
  const handleLogout = async () => {
    try {
      console.log("useAuth: Logging out...")
      await logout()
      setAuthState({
        userData: { userId: null, role: null, token: null },
        isLoading: false,
        error: null,
      })
    } catch (error) {
      console.error("useAuth: Logout error:", error)
    }
  }

  // Refresh auth state
  const refreshAuth = () => {
    console.log("useAuth: Refreshing auth state")
    setAuthState((prev) => ({ ...prev, isLoading: true }))
    fetchUserData()
  }

  // Derived properties
  const isAuthenticated = !!authState.userData.token
  const isAdmin = authState.userData.role === "admin"
  const isLead = authState.userData.role === "lead"
  const isEmployee = authState.userData.role === "employee"

  console.log("useAuth: Final state:", {
    userId: authState.userData.userId,
    role: authState.userData.role,
    hasToken: !!authState.userData.token,
    isLoading: authState.isLoading,
  })

  return {
    // User data
    userId: authState.userData.userId,
    role: authState.userData.role,
    token: authState.userData.token,

    // Status
    isLoading: authState.isLoading,
    error: authState.error,

    // Derived properties
    isAuthenticated,
    isAdmin,
    isLead,
    isEmployee,

    // Actions
    logout: handleLogout,
    refreshAuth,
  }
}

