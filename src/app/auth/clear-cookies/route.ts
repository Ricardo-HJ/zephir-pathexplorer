import { cookies } from "next/headers"
import { NextResponse } from "next/server"

// This route handler can be called to clear cookies when needed
export async function GET() {
  const cookieStore = cookies()
  ;(await cookieStore).delete("auth_token")
  ;(await cookieStore).delete("user_type")

  return NextResponse.json({ success: true })
}

