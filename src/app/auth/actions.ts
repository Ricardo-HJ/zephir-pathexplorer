"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { loginUser } from "@/services/api"

interface LoginResponse {
  success: boolean
  message: string
  token?: string
  user?: {
    idUsuario: string
    idTipoUsuario: number
    tipoUsuario: string
    correo: string
  }
}

export async function forceRelogin() {
  const cookieStore = await cookies()
  cookieStore.delete("auth_token")
  cookieStore.delete("user_type")
  cookieStore.delete("user_id")
  redirect("/")
}

export async function clearAuthCookies() {
  const cookieStore = await cookies()
  cookieStore.delete("auth_token")
  cookieStore.delete("user_type")
  cookieStore.delete("user_id")
}

// Update the login function to better handle errors
export async function login(prevState: any, formData: FormData) {
  const correo = formData.get("email") as string
  const contraseña = formData.get("password") as string
  const rememberMe = formData.get("remember-me") === "on"

  // Validate input
  if (!correo || !contraseña) {
    return {
      success: false,
      message: "Correo y contraseña son requeridos",
    }
  }

  try {
    // Use the API service instead of direct fetch
    const data = await loginUser(correo, contraseña)

    // Check if we have the expected data structure
    if (!data || !data.token || !data.user) {
      console.error("Unexpected API response:", data)
      return {
        success: false,
        message: "Respuesta inesperada del servidor",
      }
    }

    // Set the token in cookies
    const cookieStore = await cookies()

    // Calculate expiry if remember me is checked (30 days in seconds)
    const maxAge = rememberMe ? 30 * 24 * 60 * 60 : undefined

    cookieStore.set("auth_token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge,
    })

    // Store user type in a separate cookie for client-side access
    cookieStore.set("user_type", data.user.tipoUsuario, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge,
    })

    // Store user ID in a separate cookie for client-side access
    cookieStore.set("user_id", data.user.idUsuario, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge,
    })

    // Determine redirect based on user type
    let redirectTo = `/${data.user.idUsuario}/dashboard`
    if (data.user.tipoUsuario === "admin") {
      redirectTo = "/admin"
    } else if (data.user.tipoUsuario === "lead") {
      redirectTo = "/lead"
    }

    return {
      success: true,
      message: "Inicio de sesión exitoso",
      redirectTo,
    }
  } catch (error: any) {
    console.error("Login error:", error)
    return {
      success: false,
      message: error.message || "Error de conexión. Intente nuevamente.",
    }
  }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete("auth_token")
  cookieStore.delete("user_type")
  cookieStore.delete("user_id")
  redirect("/")
}

