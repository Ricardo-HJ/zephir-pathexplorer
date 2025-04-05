// Add console logs to track middleware operations
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtDecode } from "jwt-decode"

// Helper function to map numeric role IDs to string role names
function mapRoleIdToName(roleId: number): string {
  switch (roleId) {
    case 1:
      return "admin"
    case 2:
      return "lead"
    case 3:
      return "employee"
    default:
      return "unknown"
  }
}

export function middleware(request: NextRequest) {
  console.log("middleware: Processing request for path:", request.nextUrl.pathname)

  const authToken = request.cookies.get("auth_token")?.value
  const userType = request.cookies.get("user_type")?.value
  const userId = request.cookies.get("user_id")?.value

  console.log("middleware: Cookies found - auth_token:", authToken ? "exists" : "not found")
  console.log("middleware: Cookies found - user_type:", userType || "not found")
  console.log("middleware: Cookies found - user_id:", userId || "not found")

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

  console.log(
    "middleware: Route type:",
    isRootPath
      ? "root"
      : isAdminRoute
        ? "admin"
        : isLeadRoute
          ? "lead"
          : isEmployeeRoute
            ? "employee"
            : isDashboardRoute
              ? "dashboard"
              : isAuthRoute
                ? "auth"
                : "other",
  )

  // Check if token is expired
  let isTokenExpired = false
  let decodedToken: any = null

  if (authToken) {
    try {
      console.log("middleware: Decoding JWT token")
      decodedToken = jwtDecode<{
        exp: number
        id_tipo_usuario?: number
        tipo_usuario?: string
      }>(authToken)

      const currentTime = Math.floor(Date.now() / 1000)
      isTokenExpired = decodedToken.exp < currentTime
      console.log("middleware: Token expiration time:", decodedToken.exp)
      console.log("middleware: Current time:", currentTime)
      console.log("middleware: Token expired:", isTokenExpired ? "Yes" : "No")

      // Log the user role information from the token
      if (decodedToken.tipo_usuario) {
        console.log("middleware: User role from token:", decodedToken.tipo_usuario)
      } else if (decodedToken.id_tipo_usuario) {
        console.log("middleware: User role ID from token:", decodedToken.id_tipo_usuario)
        console.log("middleware: Mapped to role name:", mapRoleIdToName(decodedToken.id_tipo_usuario))
      }
    } catch (error) {
      console.error("middleware: Error decoding token:", error)
      isTokenExpired = true
    }
  }

  // If token is expired, clear cookies and redirect to login
  if (authToken && isTokenExpired) {
    console.log("middleware: Token is expired, redirecting to login with invalidToken=true")
    const response = NextResponse.redirect(new URL("/?invalidToken=true", request.url))
    console.log("middleware: Deleting auth_token cookie")
    response.cookies.delete("auth_token")
    console.log("middleware: Deleting user_type cookie")
    response.cookies.delete("user_type")
    console.log("middleware: Deleting user_id cookie")
    response.cookies.delete("user_id") // Added user_id cookie deletion
    return response
  }

  // CASE 1: Unauthenticated users
  if (!authToken) {
    console.log("middleware: No auth token found")

    // Allow access to root (login) and auth routes
    if (isRootPath || isAuthRoute) {
      console.log("middleware: Allowing access to public route")
      return NextResponse.next()
    }

    // Redirect to root (login) for protected routes
    if (isAdminRoute || isLeadRoute || isEmployeeRoute || isDashboardRoute) {
      console.log("middleware: Redirecting unauthenticated user to login")
      return NextResponse.redirect(new URL("/", request.url))
    }

    // For other routes, just proceed
    console.log("middleware: Allowing access to other route")
    return NextResponse.next()
  }

  // CASE 2: Authenticated users
  console.log("middleware: User is authenticated")

  // If we have a token but no userType cookie, try to get the role from the token
  let effectiveUserType = userType
  if (!effectiveUserType && decodedToken) {
    if (decodedToken.tipo_usuario) {
      effectiveUserType = decodedToken.tipo_usuario
      console.log("middleware: No user_type cookie, using tipo_usuario from token:", effectiveUserType)
    } else if (decodedToken.id_tipo_usuario) {
      effectiveUserType = mapRoleIdToName(decodedToken.id_tipo_usuario)
      console.log("middleware: No user_type cookie, mapped id_tipo_usuario to role:", effectiveUserType)
    }
  }

  // Redirect from root (login) to appropriate dashboard
  if (isRootPath) {
    console.log("middleware: User is on root path, redirecting to dashboard")
    switch (effectiveUserType) {
      case "admin":
        console.log("middleware: Redirecting admin to /admin")
        return NextResponse.redirect(new URL("/admin", request.url))
      case "lead":
        console.log("middleware: Redirecting lead to /lead")
        return NextResponse.redirect(new URL("/lead", request.url))
      case "employee":
        // Redirect employees directly to their dashboard using their user ID
        if (userId) {
          console.log(`middleware: Redirecting employee to /${userId}/dashboard`)
          return NextResponse.redirect(new URL(`/${userId}/dashboard`, request.url))
        }
        // Fall back to generic dashboard if userId is missing
        console.log("middleware: Redirecting employee to /dashboard (fallback)")
        return NextResponse.redirect(new URL("/dashboard", request.url))
      default:
        // If user type is unknown, clear cookies and stay on login
        console.log("middleware: Unknown user type, clearing cookies")
        const response = NextResponse.next()
        console.log("middleware: Deleting auth_token cookie")
        response.cookies.delete("auth_token")
        console.log("middleware: Deleting user_type cookie")
        response.cookies.delete("user_type")
        console.log("middleware: Deleting user_id cookie")
        response.cookies.delete("user_id") // Added user_id cookie deletion
        return response
    }
  }

  // Redirect from auth routes to appropriate dashboard
  if (isAuthRoute) {
    console.log("middleware: User is on auth route, redirecting to dashboard")
    switch (effectiveUserType) {
      case "admin":
        console.log("middleware: Redirecting admin to /admin")
        return NextResponse.redirect(new URL("/admin", request.url))
      case "lead":
        console.log("middleware: Redirecting lead to /lead")
        return NextResponse.redirect(new URL("/lead", request.url))
      case "employee":
        // Redirect employees directly to their dashboard using their user ID
        if (userId) {
          console.log(`middleware: Redirecting employee to /${userId}/dashboard`)
          return NextResponse.redirect(new URL(`/${userId}/dashboard`, request.url))
        }
        // Fall back to generic dashboard if userId is missing
        console.log("middleware: Redirecting employee to /dashboard (fallback)")
        return NextResponse.redirect(new URL("/dashboard", request.url))
      default:
        // If user type is unknown, clear cookies and stay on login
        console.log("middleware: Unknown user type, clearing cookies")
        const response = NextResponse.redirect(new URL("/", request.url))
        console.log("middleware: Deleting auth_token cookie")
        response.cookies.delete("auth_token")
        console.log("middleware: Deleting user_type cookie")
        response.cookies.delete("user_type")
        console.log("middleware: Deleting user_id cookie")
        response.cookies.delete("user_id") // Added user_id cookie deletion
        return response
    }
  }

  // Role-based access control for protected routes
  if (isAdminRoute && effectiveUserType !== "admin") {
    console.log("middleware: Non-admin trying to access admin route, redirecting")
    return NextResponse.redirect(new URL(effectiveUserType === "lead" ? "/lead" : `/${userId}/dashboard`, request.url))
  }

  if (isLeadRoute && effectiveUserType !== "lead") {
    console.log("middleware: Non-lead trying to access lead route, redirecting")
    return NextResponse.redirect(
      new URL(effectiveUserType === "admin" ? "/admin" : `/${userId}/dashboard`, request.url),
    )
  }

  if (isEmployeeRoute && effectiveUserType !== "employee") {
    console.log("middleware: Non-employee trying to access employee route, redirecting")
    return NextResponse.redirect(
      new URL(
        effectiveUserType === "admin" ? "/admin" : effectiveUserType === "lead" ? "/lead" : `/${userId}/dashboard`,
        request.url,
      ),
    )
  }

  // For all other cases, proceed normally
  console.log("middleware: Allowing access to route")
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

