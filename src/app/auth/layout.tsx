import type React from "react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check if user is already authenticated
  const cookieStore = await cookies()
  const authToken = cookieStore.get("auth_token")?.value
  const userType = cookieStore.get("user_type")?.value

  // If authenticated, redirect to appropriate dashboard
  if (authToken) {
    redirect("/dashboard")
  }

  return children
}

