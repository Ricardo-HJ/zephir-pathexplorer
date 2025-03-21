import { cookies } from "next/headers"
import { redirect } from "next/navigation"

interface User {
  idUsuario: string
  tipoUsuario: string
  correo: string
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies()
  const authToken = cookieStore.get("auth_token")?.value

  if (!authToken) {
    return null
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      cache: "no-store",
    })

    if (!response.ok) {
      if (response.status === 401) {
        // Token is invalid or expired
        cookieStore.delete("auth_token")
        cookieStore.delete("user_type")
        return null
      }
      throw new Error("Failed to fetch user")
    }

    const data = await response.json()
    return data.user
  } catch (error) {
    console.error("Error fetching current user:", error)
    return null
  }
}

export async function requireAuth() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/")
  }

  return user
}

export async function requireRole(allowedRoles: string[]) {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/")
  }

  if (!allowedRoles.includes(user.tipoUsuario)) {
    // Redirect to appropriate dashboard based on user type
    redirect(`/${user.tipoUsuario}/dashboard`)
  }

  return user
}

// Specific role requirements (for convenience)
export async function requireAdmin() {
  return requireRole(["admin"])
}

export async function requireLead() {
  return requireRole(["lead"])
}

export async function requireEmployee() {
  return requireRole(["employee"])
}