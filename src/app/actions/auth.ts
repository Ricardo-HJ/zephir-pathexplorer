"use server"

import cookies from "js-cookie"
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
        contraseña: contraseña 
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
      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" as const,
        path: "/",
        // If remember me is checked, set expiry to 30 days, otherwise session cookie
        ...(rememberMe ? { maxAge: 30 * 24 * 60 * 60 } : {}),
      }

      cookies.set("auth_token", data.token, cookieOptions)

      // Store user type in a separate cookie for client-side access
      cookies.set("user_type", data.user.tipoUsuario, {
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" as const,
        path: "/",
        ...(rememberMe ? { maxAge: 30 * 24 * 60 * 60 } : {}),
      })
    }

    return {
      success: true,
      message: "Inicio de sesión exitoso",
      redirectTo: data.user?.tipoUsuario === "admin" ? "/admin/dashboard" : "/dashboard",
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
  cookies.remove("auth_token")
  cookies.remove("user_type")
  redirect("/login")
}

