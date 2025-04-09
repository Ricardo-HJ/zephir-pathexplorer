// Add console logs to track cookie operations
"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { loginUser } from "@/services/api"
import { jwtDecode } from "jwt-decode"
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

export type CurrentUser = {
  userId: string | null
  role: string | null
  token: string | null
}

export async function getCurrentUser(): Promise<CurrentUser> {
  try {
    const cookieStore = cookies()
    const token = (await cookieStore).get("auth_token")?.value
    const userType = (await cookieStore).get("user_type")?.value
    const userId = (await cookieStore).get("user_id")?.value

    console.log("getCurrentUser: Cookies retrieved", {
      hasToken: !!token,
      userType,
      userId,
    })

    if (token) {
      try {
        const decoded = jwtDecode<{
          id_usuario: string
          exp: number
          id_tipo_usuario?: number
          tipo_usuario?: string
        }>(token)

        const currentTime = Math.floor(Date.now() / 1000)
        if (decoded.exp < currentTime) {
          console.log("getCurrentUser: Token expired")
          return { userId: null, role: null, token: null }
        }

        let effectiveRole = userType
        if (!effectiveRole) {
          if (decoded.tipo_usuario) {
            effectiveRole = decoded.tipo_usuario
          } else if (decoded.id_tipo_usuario) {
            effectiveRole = mapRoleIdToName(decoded.id_tipo_usuario)
          }
        }

        console.log("getCurrentUser: Returning user data", {
          userId: userId || decoded.id_usuario,
          role: effectiveRole,
          token: token,
        })

        return {
          userId: userId || decoded.id_usuario,
          role: effectiveRole ?? null,
          token,
        }
      } catch (error) {
        console.error("Error decoding token:", error)
        return { userId: null, role: null, token: null }
      }
    }

    console.log("getCurrentUser: No token found, returning null values")
    return {
      userId: userId ?? null,
      role: userType ?? null,
      token: token ?? null,
    }
  } catch (error) {
    console.error("Error in getCurrentUser:", error)
    return { userId: null, role: null, token: null }
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
      httpOnly: true, // Changed to true for security
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge,
    })

    console.log("auth/actions: Setting user_type cookie:", userRole)
    // Store user type in a separate cookie for client-side access
    cookieStore.set("user_type", userRole, {
      httpOnly: true, // Changed to true for security
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge,
    })

    console.log("auth/actions: Setting user_id cookie:", data.user.id_usuario)
    // Store user ID in a separate cookie for client-side access
    cookieStore.set("user_id", data.user.id_usuario, {
      httpOnly: true, // Changed to true for security
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge,
    })

    // Determine redirect based on user type
    let redirectTo = `/${data.user.id_usuario}/dashboard`

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
  const cookieStore = await cookies()
  cookieStore.delete("auth_token")
  cookieStore.delete("user_type")
  cookieStore.delete("user_id")
  redirect("/")
}

