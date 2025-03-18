import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("auth_token")?.value
  const userType = request.cookies.get("user_type")?.value
  const path = request.nextUrl.pathname

  // Define protected routes
  const protectedRoutes = ["/dashboard", "/profile", "/admin"]
  const adminRoutes = ["/admin"]
  const authRoutes = ["/login", "/register", "/forgot-password"]

  // Check if the path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route))
  const isAdminRoute = adminRoutes.some((route) => path.startsWith(route))
  const isAuthRoute = authRoutes.some((route) => path === route)

  // Redirect logic
  if (isProtectedRoute && !authToken) {
    // Redirect to login if trying to access protected route without auth
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (isAdminRoute && userType !== "admin") {
    // Redirect to dashboard if non-admin tries to access admin routes
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  if (isAuthRoute && authToken) {
    // Redirect to dashboard if already logged in and trying to access auth routes
    const redirectUrl = userType === "admin" ? "/admin/dashboard" : "/dashboard"
    return NextResponse.redirect(new URL(redirectUrl, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all routes except for static files, api routes, and _next
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)",
  ],
}

