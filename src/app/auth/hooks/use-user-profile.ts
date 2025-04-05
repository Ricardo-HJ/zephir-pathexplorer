"use client"

// Add console logs to track token retrieval and API calls
import { useState, useEffect } from "react"
import { useAuth } from "@/app/auth/hooks/useAuth"
import { getUserProfile } from "@/services/api"
import Cookies from "js-cookie"
import type { User } from "@/app/auth/utils"

export function useUserProfile(userId?: string) {
  const { userId: currentUserId } = useAuth()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Use the provided userId or fall back to the current user's ID
  const targetUserId = userId || currentUserId

  useEffect(() => {
    async function fetchUserProfile() {
      if (!targetUserId) {
        console.log("useUserProfile: No targetUserId provided")
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        const token = Cookies.get("auth_token")
        console.log(
          "useUserProfile: Retrieved auth_token from cookies:",
          token ? "Token exists" : "Token is null or undefined",
        )

        if (!token) {
          console.log("useUserProfile: No auth_token found in cookies")
          throw new Error("Authentication token not found")
        }

        console.log(`useUserProfile: Fetching profile for user ID: ${targetUserId}`)
        const data = await getUserProfile(targetUserId, token)
        console.log("useUserProfile: Profile data received:", data)
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
  }, [targetUserId])

  return { user, isLoading, error }
}

