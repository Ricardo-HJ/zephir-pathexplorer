// Add console logs to track middleware operations
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtDecode } from "jwt-decode"
import { mapRoleIdToName } from "./app/auth/utils"

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
  let decodedToken: any = null

  if (authToken) {
    try {
      decodedToken = jwtDecode<{
        exp: number
        id_tipo_usuario?: number
        tipo_usuario?: string
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
    response.cookies.delete("user_type")
    response.cookies.delete("user_id") // Added user_id cookie deletion
    return response
  }

  // CASE 1: Unauthenticated users
  if (!authToken) {

    if (isRootPath || isAuthRoute) {
      return NextResponse.next()
    }

    if (isAdminRoute || isLeadRoute || isEmployeeRoute || isDashboardRoute) {
      return NextResponse.redirect(new URL("/", request.url))
    }

    return NextResponse.next()
  }

  // If we have a token but no userType cookie, try to get the role from the token
  let effectiveUserType = userType
  if (!effectiveUserType && decodedToken) {
    if (decodedToken.tipo_usuario) {
      effectiveUserType = decodedToken.tipo_usuario
    } else if (decodedToken.id_tipo_usuario) {
      effectiveUserType = mapRoleIdToName(decodedToken.id_tipo_usuario)
    }
  }

  // Redirect from root (login) to appropriate dashboard
  if (isRootPath) {
    switch (effectiveUserType) {
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
    switch (effectiveUserType) {
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
  if (isAdminRoute && effectiveUserType !== "admin") {
    return NextResponse.redirect(new URL(effectiveUserType === "lead" ? "/lead" : `/${userId}/dashboard`, request.url))
  }

  if (isLeadRoute && effectiveUserType !== "lead") {
    return NextResponse.redirect(
      new URL(effectiveUserType === "admin" ? "/admin" : `/${userId}/dashboard`, request.url),
    )
  }

  if (isEmployeeRoute && effectiveUserType !== "employee") {
    return NextResponse.redirect(
      new URL(
        effectiveUserType === "admin" ? "/admin" : effectiveUserType === "lead" ? "/lead" : `/${userId}/dashboard`,
        request.url,
      ),
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!_next|static|favicon.ico|api).*)",
  ],
}

