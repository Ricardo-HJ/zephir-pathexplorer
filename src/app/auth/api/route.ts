import { cookies } from "next/headers"
import { NextResponse, type NextRequest } from "next/server"

// Handle session validation (GET request)
export async function GET(request: NextRequest) {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth_token")
  const userType = cookieStore.get("user_type")
  
  if (!token) {
    return NextResponse.json({ authenticated: false })
  }
  
  return NextResponse.json({ 
    authenticated: true,
    userType: userType?.value 
  })
}

// Handle logout (DELETE request)
export async function DELETE(request: NextRequest) {
  const cookieStore = await cookies()
  cookieStore.delete("auth_token")
  cookieStore.delete("user_type")
  
  // Return success response
  return NextResponse.json({ success: true })
}

// Handle clear cookies (for specific scenarios like token invalidation)
export async function POST(request: NextRequest) {
  const { action } = await request.json()
  
  if (action === "clear-cookies") {
    const cookieStore = await cookies()
    cookieStore.delete("auth_token")
    cookieStore.delete("user_type")
    return NextResponse.json({ success: true })
  }
  
  return NextResponse.json({ success: false, message: "Invalid action" }, { status: 400 })
}