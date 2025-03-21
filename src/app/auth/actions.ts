"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

interface LoginResponse {
  success: boolean
  message: string
  token?: string
  user?: {
    idUsuario: string
    tipoUsuario: string
    correo: string
  }
}

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
    // Call the backend API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correo: correo,
        contraseña: contraseña,
      }),
    })

    console.log("Login response:", response.status)

    const data: LoginResponse = await response.json()

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Error al iniciar sesión",
      }
    }

    if (data.token && data.user) {
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

      // Determine redirect based on user type
      let redirectTo = "/dashboard"
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
    }

    return {
      success: false,
      message: "Error al iniciar sesión",
    }
  } catch (error) {
    console.error("Login error:", error)
    return {
      success: false,
      message: "Error de conexión. Intente nuevamente.",
    }
  }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete("auth_token")
  cookieStore.delete("user_type")
  redirect("/")
}

