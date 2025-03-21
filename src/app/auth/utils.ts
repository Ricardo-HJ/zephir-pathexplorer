import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// Define user types based on your backend
export type User = {
  idUsuario: string
  correo: string
  tipoUsuario: string
}

/**
 * Get the current authenticated user
 */
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get("AUTH_TOKEN")?.value

  if (!token) {
    return null
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    })

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        // Token is invalid or expired - clear it
        cookieStore.delete("AUTH_TOKEN")
        return null
      }

      console.error("Error fetching user profile:", response.status, response.statusText)
      return null // Return null instead of throwing to prevent uncaught exceptions
    }

    const data = await response.json()
    return data.user
  } catch (error) {
    console.error("Error in getCurrentUser:", error)
    return null // Return null instead of throwing to prevent uncaught exceptions
  }
}

/**
 * Require authentication to access a page
 */
export async function requireAuth() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/")
  }

  return user
}

/**
 * Require a specific role to access a page
 */
export async function requireRole(role: string) {
  const user = await requireAuth()

  if (user.tipoUsuario !== role) {
    redirect("/unauthorized")
  }

  return user
}

