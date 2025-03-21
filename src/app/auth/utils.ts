import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { jwtDecode } from "jwt-decode"

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
  const token = cookieStore.get("auth_token")?.value

  if (!token) {
    return null
  }

  try {
    // Decode the JWT token directly instead of making an API call
    const decoded = jwtDecode<{
      idUsuario: string
      correo: string
      tipoUsuario: string
      iat: number
      exp: number
    }>(token)

    console.log("Decoded token:", JSON.stringify(decoded, null, 2))

    // Check if token is expired
    const currentTime = Math.floor(Date.now() / 1000)
    if (decoded.exp < currentTime) {
      // Token is expired - clear it
      cookieStore.delete("auth_token")
      cookieStore.delete("user_type")
      return null
    }

    // Return user data from the token
    return {
      idUsuario: decoded.idUsuario,
      correo: decoded.correo,
      tipoUsuario: decoded.tipoUsuario,
    }
  } catch (error) {
    console.error("Error decoding token:", error)
    // Invalid token - clear it
    cookieStore.delete("auth_token")
    cookieStore.delete("user_type")
    return null
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

/**
 * Helper function for lead role
 */
export async function requireLead() {
  return requireRole("lead")
}

