// /src/middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("auth_token")?.value
  const userType = request.cookies.get("user_type")?.value
  const path = request.nextUrl.pathname

  // Define route patterns - UPDATED
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
        // Redirect employees directly to their dashboard
        // We need to extract the user ID from the token or cookies
        // For now, we'll redirect to the main dashboard which will handle the redirection
        return NextResponse.redirect(new URL("/dashboard", request.url))
      default:
        // If user type is unknown, clear cookies and stay on login
        const response = NextResponse.next()
        response.cookies.delete("auth_token")
        response.cookies.delete("user_type")
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
        return NextResponse.redirect(new URL("/dashboard", request.url))
      default:
        // If user type is unknown, clear cookies and stay on login
        const response = NextResponse.redirect(new URL("/", request.url))
        response.cookies.delete("auth_token")
        response.cookies.delete("user_type")
        return response
    }
  }

  // Role-based access control for protected routes
  if (isAdminRoute && userType !== "admin") {
    return NextResponse.redirect(new URL(userType === "lead" ? "/lead" : "/dashboard", request.url))
  }

  if (isLeadRoute && userType !== "lead") {
    return NextResponse.redirect(new URL(userType === "admin" ? "/admin" : "/dashboard", request.url))
  }

  if (isEmployeeRoute && userType !== "employee") {
    return NextResponse.redirect(new URL(userType === "admin" ? "/admin" : userType === "lead" ? "/lead" : "/dashboard", request.url))
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