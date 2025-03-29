import { cookies } from "next/headers"
import { NextResponse, type NextRequest } from "next/server"
import { clearAuthCookies } from "../actions"
import { getCurrentUser } from "../utils"

// Handle session validation (GET request)
export async function GET(request: NextRequest) {
  const user = await getCurrentUser()

  if (!user) {
    // Clear cookies if token is invalid
    await clearAuthCookies()
    return NextResponse.json({ authenticated: false })
  }

  const cookieStore = await cookies()
  const userType = cookieStore.get("user_type")

  return NextResponse.json({
    authenticated: true,
    userType: userType?.value,
    userId: user.idUsuario, // Added userId to the response
  })
}

// Handle logout (DELETE request)
export async function DELETE(request: NextRequest) {
  const cookieStore = await cookies()
  cookieStore.delete("auth_token")
  cookieStore.delete("user_type")
  cookieStore.delete("user_id") // Added user_id cookie deletion

  // Return success response
  return NextResponse.json({ success: true })
}

// Handle clear cookies (for specific scenarios like token invalidation)
export async function POST(request: NextRequest) {
  const { action } = await request.json()

  if (action === "clear-cookies") {
    await clearAuthCookies()
    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ success: false, message: "Invalid action" }, { status: 400 })
}

