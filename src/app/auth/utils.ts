import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { jwtDecode } from "jwt-decode"

// Define user types based on your backend
export type User = {
  idUsuario: string
  correo: string
  idTipoUsuario: number
  tipoUsuario?: string
  profesion?: string
  nombre?: string
  apellidoP?: string
  apellidoM?: string
  fechaIngreso?: string
  telefono?: string
  intereses?: string
  descripcion?: string
  created_at?: string
  updated_at?: string
}

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
      idTipoUsuario: number
      tipoUsuario?: string
      profesion?: string
      nombre?: string
      apellidoP?: string
      apellidoM?: string
      fechaIngreso?: string
      telefono?: string
      intereses?: string
      descripcion?: string
      iat: number
      exp: number
    }>(token)

    // Check if token is expired
    const currentTime = Math.floor(Date.now() / 1000)
    if (decoded.exp < currentTime) {
      // Don't modify cookies here - return null and handle in a Server Action
      return null
    }

    // Return user data from the token
    return {
      idUsuario: decoded.idUsuario,
      correo: decoded.correo,
      idTipoUsuario: decoded.idTipoUsuario,
      tipoUsuario: decoded.tipoUsuario,
      profesion: decoded.profesion,
      nombre: decoded.nombre,
      apellidoP: decoded.apellidoP,
      apellidoM: decoded.apellidoM,
      fechaIngreso: decoded.fechaIngreso,
      telefono: decoded.telefono,
      intereses: decoded.intereses,
      descripcion: decoded.descripcion,
    }
  } catch (error) {
    console.error("Error decoding token:", error)
    // Don't modify cookies here - return null and handle in a Server Action
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

export async function requireRole(role: string) {
  const user = await requireAuth()

  if (user.tipoUsuario !== role) {
    redirect("/unauthorized")
  }

  return user
}

export async function requireLead() {
  return requireRole("lead")
}

