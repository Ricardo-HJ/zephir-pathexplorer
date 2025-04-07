// Add console logs to track token validation and user retrieval
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { jwtDecode } from "jwt-decode"

// Define user types based on your backend using snake_case to match API
export type User = {
  id_usuario: string
  correo: string
  tipo_usuario: string // Just use the string representation
  profesion?: string
  nombre?: string
  apellido_p?: string
  apellido_m?: string
  fecha_ingreso?: string
  telefono?: string
  intereses?: string
  descripcion?: string
  created_at?: string
  updated_at?: string
}

// Helper function to map numeric role IDs to string role names
export function mapRoleIdToName(roleId: number): string {
  switch (roleId) {
    case 1:
      return "admin"
    case 2:
      return "lead"
    case 3:
      return "employee"
    default:
      return "unknown"
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth_token")?.value

  if (!token) {
    return null
  }

  try {
    const decoded = jwtDecode<{
      id_usuario: string
      correo: string
      id_tipo_usuario?: number
      tipo_usuario?: string
      profesion?: string
      nombre?: string
      apellido_p?: string
      apellido_m?: string
      fecha_ingreso?: string
      telefono?: string
      intereses?: string
      descripcion?: string
      iat: number
      exp: number
    }>(token)

    // Check if token is expired
    const currentTime = Math.floor(Date.now() / 1000)
    if (decoded.exp < currentTime) {
      return null
    }

    // Determine the user role - either use tipo_usuario from token or map from id_tipo_usuario
    let userRole = decoded.tipo_usuario
    if (!userRole && decoded.id_tipo_usuario) {
      userRole = mapRoleIdToName(decoded.id_tipo_usuario)
    }

    // Return user data from the token using
    return {
      id_usuario: decoded.id_usuario,
      correo: decoded.correo,
      tipo_usuario: userRole || "unknown",
      profesion: decoded.profesion,
      nombre: decoded.nombre,
      apellido_p: decoded.apellido_p,
      apellido_m: decoded.apellido_m,
      fecha_ingreso: decoded.fecha_ingreso,
      telefono: decoded.telefono,
      intereses: decoded.intereses,
      descripcion: decoded.descripcion,
    }
  } catch (error) {
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

  if (user.tipo_usuario !== role) {
    redirect("/unauthorized")
  }

  return user
}

