"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/app/auth/hooks/useAuth"
import { getUserProfile } from "@/services/api"
import type { User } from "@/app/auth/utils"

export function useUserProfile(userId?: string) {
  const { userId: currentUserId, token } = useAuth()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Use the provided userId or fall back to the current user's ID
  const targetUserId = userId || currentUserId

  useEffect(() => {
    async function fetchUserProfile() {
      if (!targetUserId) {
        setIsLoading(false)
        return
      }

      if (!token) {
        setError("Authentication token not found")
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        const data = await getUserProfile(targetUserId, token)
        setUser(data.user)
        setError(null)
      } catch (err) {
        console.error("Error fetching user profile:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch user profile")
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserProfile()
  }, [targetUserId, token])

  return { user, isLoading, error }
}

