import cookie from "js-cookie"
import { NextResponse } from "next/server"

export async function GET() {
  cookie.remove("auth_token")
  cookie.remove("user_type")

  return NextResponse.redirect(new URL("/login", process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"))
}

