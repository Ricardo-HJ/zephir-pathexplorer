// /src/middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtDecode } from "jwt-decode"

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("auth_token")?.value
  const userType = request.cookies.get("user_type")?.value
  const userId = request.cookies.get("user_id")?.value
  const path = request.nextUrl.pathname

  // Define route patterns
  const adminRoutes = ["/admin"]
  const leadRoutes = ["/lead"]
  const employeeRoutes = ["/employee"]
  const dashboardRoutes = ["/dashboard"]
  const authRoutes = ["/auth"]
  const isRootPath = path === "/"

  // Check if the path matches any of our patterns
  const isAdminRoute = adminRoutes.some((route) => path.startsWith(route))
  const isLeadRoute = leadRoutes.some((route) => path.startsWith(route))
  const isEmployeeRoute = employeeRoutes.some((route) => path.startsWith(route))
  const isDashboardRoute = dashboardRoutes.some((route) => path.startsWith(route))
  const isAuthRoute = authRoutes.some((route) => path.startsWith(route))

  // Check if token is expired
  let isTokenExpired = false
  if (authToken) {
    try {
      const decoded = jwtDecode<{ exp: number }>(authToken)
      const currentTime = Math.floor(Date.now() / 1000)
      isTokenExpired = decoded.exp < currentTime
    } catch (error) {
      isTokenExpired = true
    }
  }

  // If token is expired, clear cookies and redirect to login
  if (authToken && isTokenExpired) {
    const response = NextResponse.redirect(new URL("/?invalidToken=true", request.url))
    response.cookies.delete("auth_token")
    response.cookies.delete("user_type")
    response.cookies.delete("user_id") // Added user_id cookie deletion
    return response
  }

  // CASE 1: Unauthenticated users
  if (!authToken) {
    // Allow access to root (login) and auth routes
    if (isRootPath || isAuthRoute) {
      return NextResponse.next()
    }

    // Redirect to root (login) for protected routes
    if (isAdminRoute || isLeadRoute || isEmployeeRoute || isDashboardRoute) {
      return NextResponse.redirect(new URL("/", request.url))
    }

    // For other routes, just proceed
    return NextResponse.next()
  }

  // CASE 2: Authenticated users
  // Redirect from root (login) to appropriate dashboard
  if (isRootPath) {
    switch (userType) {
      case "admin":
        return NextResponse.redirect(new URL("/admin", request.url))
      case "lead":
        return NextResponse.redirect(new URL("/lead", request.url))
      case "employee":
        // Redirect employees directly to their dashboard using their user ID
        if (userId) {
          return NextResponse.redirect(new URL(`/${userId}/dashboard`, request.url))
        }
        // Fall back to generic dashboard if userId is missing
        return NextResponse.redirect(new URL("/dashboard", request.url))
      default:
        // If user type is unknown, clear cookies and stay on login
        const response = NextResponse.next()
        response.cookies.delete("auth_token")
        response.cookies.delete("user_type")
        response.cookies.delete("user_id") // Added user_id cookie deletion
        return response
    }
  }

  // Redirect from auth routes to appropriate dashboard
  if (isAuthRoute) {
    switch (userType) {
      case "admin":
        return NextResponse.redirect(new URL("/admin", request.url))
      case "lead":
        return NextResponse.redirect(new URL("/lead", request.url))
      case "employee":
        // Redirect employees directly to their dashboard using their user ID
        if (userId) {
          return NextResponse.redirect(new URL(`/${userId}/dashboard`, request.url))
        }
        // Fall back to generic dashboard if userId is missing
        return NextResponse.redirect(new URL("/dashboard", request.url))
      default:
        // If user type is unknown, clear cookies and stay on login
        const response = NextResponse.redirect(new URL("/", request.url))
        response.cookies.delete("auth_token")
        response.cookies.delete("user_type")
        response.cookies.delete("user_id") // Added user_id cookie deletion
        return response
    }
  }

  // Role-based access control for protected routes
  if (isAdminRoute && userType !== "admin") {
    return NextResponse.redirect(new URL(userType === "lead" ? "/lead" : `/${userId}/dashboard`, request.url))
  }

  if (isLeadRoute && userType !== "lead") {
    return NextResponse.redirect(new URL(userType === "admin" ? "/admin" : `/${userId}/dashboard`, request.url))
  }

  if (isEmployeeRoute && userType !== "employee") {
    return NextResponse.redirect(
      new URL(userType === "admin" ? "/admin" : userType === "lead" ? "/lead" : `/${userId}/dashboard`, request.url),
    )
  }

  // For all other cases, proceed normally
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next
     * - static (static files)
     * - favicon.ico (favicon file)
     * - api (API routes)
     */
    "/((?!_next|static|favicon.ico|api).*)",
  ],
}

