import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function Home() {
  // Check if user is authenticated
  const cookieStore = await cookies()
  const authToken = cookieStore.get("auth_token")?.value
  const userType = cookieStore.get("user_type")?.value

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

