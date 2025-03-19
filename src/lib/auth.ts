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
        const cookieStore = await cookies()
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

export async function requireAdmin() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/")
  }

  if (user.tipoUsuario !== "admin") {
    // Redirect to appropriate dashboard based on user type
    if (user.tipoUsuario === "lead") {
      redirect("/lead/dashboard")
    } else if (user.tipoUsuario === "employee") {
      redirect("/employee/dashboard")
    } else {
      redirect("/")
    }
  }

  return user
}

export async function requireLead() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/")
  }

  if (user.tipoUsuario !== "lead") {
    // Redirect to appropriate dashboard based on user type
    if (user.tipoUsuario === "admin") {
      redirect("/admin/dashboard")
    } else if (user.tipoUsuario === "employee") {
      redirect("/employee/dashboard")
    } else {
      redirect("/")
    }
  }

  return user
}

export async function requireEmployee() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/")
  }

  if (user.tipoUsuario !== "employee") {
    // Redirect to appropriate dashboard based on user type
    if (user.tipoUsuario === "admin") {
      redirect("/admin/dashboard")
    } else if (user.tipoUsuario === "lead") {
      redirect("/lead/dashboard")
    } else {
      redirect("/")
    }
  }

  return user
}

