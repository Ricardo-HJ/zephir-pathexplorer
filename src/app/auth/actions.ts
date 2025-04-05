// Add console logs to track cookie operations
"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { loginUser } from "@/services/api"
import { mapRoleIdToName } from "./utils"

interface LoginResponse {
  success: boolean
  message: string
  token?: string
  user?: {
    id_usuario: string
    id_tipo_usuario?: number
    tipo_usuario?: string
    correo: string
  }
}

export async function forceRelogin() {
  console.log("auth/actions: Force relogin initiated")
  const cookieStore = await cookies()
  console.log("auth/actions: Deleting auth_token cookie")
  cookieStore.delete("auth_token")
  console.log("auth/actions: Deleting user_type cookie")
  cookieStore.delete("user_type")
  console.log("auth/actions: Deleting user_id cookie")
  cookieStore.delete("user_id")
  redirect("/")
}

export async function clearAuthCookies() {
  console.log("auth/actions: Clearing auth cookies")
  const cookieStore = await cookies()
  console.log("auth/actions: Deleting auth_token cookie")
  cookieStore.delete("auth_token")
  console.log("auth/actions: Deleting user_type cookie")
  cookieStore.delete("user_type")
  console.log("auth/actions: Deleting user_id cookie")
  cookieStore.delete("user_id")
}

export async function login(prevState: any, formData: FormData) {
  const correo = formData.get("email") as string
  const contraseña = formData.get("password") as string
  const rememberMe = formData.get("remember-me") === "on"

  console.log("auth/actions: Login attempt for email:", correo)
  console.log("auth/actions: Remember me:", rememberMe)

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
      console.error("auth/actions: Unexpected API response:", data)
      return {
        success: false,
        message: "Respuesta inesperada del servidor",
      }
    }

    // Determine the user role - either use tipo_usuario from API or map from id_tipo_usuario
    let userRole = data.user.tipo_usuario
    if (!userRole && data.user.id_tipo_usuario) {
      userRole = mapRoleIdToName(data.user.id_tipo_usuario)
      console.log("auth/actions: Mapped role ID to name:", data.user.id_tipo_usuario, "->", userRole)
    }

    console.log("auth/actions: User role:", userRole)
    console.log("auth/actions: Login successful, setting cookies")

    // Set the token in cookies
    const cookieStore = await cookies()

    // Calculate expiry if remember me is checked (30 days in seconds)
    const maxAge = rememberMe ? 30 * 24 * 60 * 60 : undefined
    console.log("auth/actions: Cookie maxAge:", maxAge || "session")

    console.log("auth/actions: Setting auth_token cookie")
    cookieStore.set("auth_token", data.token, {
      httpOnly: false, // Changed to false so client-side JS can access it
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge,
    })

    console.log("auth/actions: Setting user_type cookie:", userRole)
    // Store user type in a separate cookie for client-side access
    cookieStore.set("user_type", userRole, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge,
    })

    console.log("auth/actions: Setting user_id cookie:", data.user.id_usuario)
    // Store user ID in a separate cookie for client-side access
    cookieStore.set("user_id", data.user.id_usuario, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge,
    })

    // Determine redirect based on user type
    let redirectTo = `/${data.user.id_usuario}/dashboard`
    if (userRole === "admin") {
      redirectTo = "/admin"
    } else if (userRole === "lead") {
      redirectTo = "/lead"
    }

    console.log("auth/actions: Redirect path:", redirectTo)

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
  console.log("auth/actions: Server-side logout initiated")
  const cookieStore = await cookies()
  console.log("auth/actions: Deleting auth_token cookie")
  cookieStore.delete("auth_token")
  console.log("auth/actions: Deleting user_type cookie")
  cookieStore.delete("user_type")
  console.log("auth/actions: Deleting user_id cookie")
  cookieStore.delete("user_id")
  redirect("/")
}

