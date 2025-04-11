// Add console logs to track API route operations
import { cookies } from "next/headers"
import { NextResponse, type NextRequest } from "next/server"
import { clearAuthCookies } from "../actions"
import { getCurrentUser } from "../utils"

// Handle session validation (GET request)
export async function GET(request: NextRequest) {
  console.log("auth/api/route: GET request received")
  const user = await getCurrentUser()
  console.log("auth/api/route: getCurrentUser result:", user ? "User found" : "No user found")

  if (!user) {
    // Clear cookies if token is invalid
    console.log("auth/api/route: No user found, clearing cookies")
    await clearAuthCookies()
    return NextResponse.json({ authenticated: false })
  }

  const cookieStore = await cookies()
  const userType = cookieStore.get("user_type")
  console.log("auth/api/route: User type from cookie:", userType?.value || "not found")

  return NextResponse.json({
    authenticated: true,
    userType: userType?.value,
    userId: user.id_usuario, // Added userId to the response
  })
}

// Handle logout (DELETE request)
export async function DELETE(request: NextRequest) {
  console.log("auth/api/route: DELETE request received (logout)")
  const cookieStore = await cookies()
  console.log("auth/api/route: Deleting auth_token cookie")
  cookieStore.delete("auth_token")
  console.log("auth/api/route: Deleting user_type cookie")
  cookieStore.delete("user_type")
  console.log("auth/api/route: Deleting user_id cookie")
  cookieStore.delete("user_id") // Added user_id cookie deletion

  // Return success response
  return NextResponse.json({ success: true })
}

// Handle clear cookies (for specific scenarios like token invalidation)
export async function POST(request: NextRequest) {
  console.log("auth/api/route: POST request received")
  const { action } = await request.json()
  console.log("auth/api/route: Action:", action)

  if (action === "clear-cookies") {
    console.log("auth/api/route: Clearing cookies")
    await clearAuthCookies()
    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ success: false, message: "Invalid action" }, { status: 400 })
}

