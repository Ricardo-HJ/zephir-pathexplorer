import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtDecode } from "jwt-decode"

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("auth_token")?.value
  const userId = request.cookies.get("user_id")?.value

  const path = request.nextUrl.pathname
  const isRootPath = path === "/"
  const isAuthRoute = path.startsWith("/auth")

  // Check if token is expired
  let isTokenExpired = false
  let decodedToken: any = null

  if (authToken) {
    try {
      decodedToken = jwtDecode<{
        exp: number
      }>(authToken)

      const currentTime = Math.floor(Date.now() / 1000)
      isTokenExpired = decodedToken.exp < currentTime
    } catch (error) {
      console.error("middleware: Error decoding token:", error)
      isTokenExpired = true
    }
  }

  // If token is expired, clear cookies and redirect to login
  if (authToken && isTokenExpired) {
    const response = NextResponse.redirect(new URL("/?invalidToken=true", request.url))
    response.cookies.delete("auth_token")
    response.cookies.delete("user_id")
    return response
  }

  // Unauthenticated users can only access root and auth routes
  if (!authToken) {
    if (isRootPath || isAuthRoute) {
      return NextResponse.next()
    }
    return NextResponse.redirect(new URL("/", request.url))
  }

  // For authenticated users
  if (isRootPath || isAuthRoute) {
    // Ensure we have a userId to redirect to
    if (!userId) {
      // If userId is missing, clear cookies and stay on login
      const response = NextResponse.redirect(new URL("/", request.url))
      response.cookies.delete("auth_token")
      response.cookies.delete("user_id")
      return response
    }

    // Redirect all authenticated users to their dashboard
    return NextResponse.redirect(new URL(`/${userId}/dashboard`, request.url))
  }

  // If user is not already in their own dashboard area, redirect them
  if (userId && !path.startsWith(`/${userId}/`)) {
    return NextResponse.redirect(new URL(`/${userId}/dashboard`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico|api).*)"],
}
