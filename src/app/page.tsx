import cookie from "js-cookie"
import { redirect } from "next/navigation"

export default async function Home() {
  // Check if user is authenticated
  const authToken = cookie.get("auth_token")
  const userType = cookie.get("user_type")

  if (!authToken) {
    // If not authenticated, redirect to login
    redirect("/login")
  }

  // If authenticated, redirect based on user type
  if (userType === "admin") {
    redirect("/admin/dashboard")
  } else {
    redirect("/dashboard")
  }
}

