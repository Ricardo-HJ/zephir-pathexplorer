import { cookies } from "next/headers"
import { NextResponse, type NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const cookieStore = await cookies()
  cookieStore.delete("auth_token")
  cookieStore.delete("user_type")

  // Use a relative URL for redirection instead of constructing a new URL
  return NextResponse.redirect(new URL("/login", request.url))
}

