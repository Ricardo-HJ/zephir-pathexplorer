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
  console.log("auth/utils: getCurrentUser called")
  const cookieStore = await cookies()
  const token = cookieStore.get("auth_token")?.value
  console.log("auth/utils: auth_token from cookies:", token ? "Token exists" : "Token not found")

  if (!token) {
    console.log("auth/utils: No auth_token found in cookies")
    return null
  }

  try {
    // Decode the JWT token directly instead of making an API call
    console.log("auth/utils: Decoding JWT token")
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
    console.log("auth/utils: Token expiration time:", decoded.exp)
    console.log("auth/utils: Current time:", currentTime)
    console.log("auth/utils: Token expired:", decoded.exp < currentTime ? "Yes" : "No")

    if (decoded.exp < currentTime) {
      console.log("auth/utils: Token is expired")
      // Don't modify cookies here - return null and handle in a Server Action
      return null
    }

    // Determine the user role - either use tipo_usuario from token or map from id_tipo_usuario
    let userRole = decoded.tipo_usuario
    if (!userRole && decoded.id_tipo_usuario) {
      userRole = mapRoleIdToName(decoded.id_tipo_usuario)
      console.log("auth/utils: Mapped role ID to name:", decoded.id_tipo_usuario, "->", userRole)
    }

    console.log("auth/utils: Token is valid, returning user data")
    console.log("auth/utils: User role from token:", userRole)

    // Return user data from the token using snake_case
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
    console.error("auth/utils: Error decoding token:", error)
    // Don't modify cookies here - return null and handle in a Server Action
    return null
  }
}

export async function requireAuth() {
  console.log("auth/utils: requireAuth called")
  const user = await getCurrentUser()
  console.log("auth/utils: User authenticated:", user ? "Yes" : "No")

  if (!user) {
    console.log("auth/utils: No authenticated user, redirecting to login")
    redirect("/")
  }

  return user
}

export async function requireRole(role: string) {
  console.log(`auth/utils: requireRole called for role: ${role}`)
  const user = await requireAuth()

  console.log("auth/utils: User role:", user.tipo_usuario)
  console.log("auth/utils: Required role:", role)
  console.log("auth/utils: Role match:", user.tipo_usuario === role ? "Yes" : "No")

  if (user.tipo_usuario !== role) {
    console.log("auth/utils: Role mismatch, redirecting to unauthorized")
    redirect("/unauthorized")
  }

  return user
}

export async function requireLead() {
  console.log("auth/utils: requireLead called")
  return requireRole("lead")
}

