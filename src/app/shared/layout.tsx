import type React from "react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { AppSidebar } from "@/components/layout/sidebar"
import { UserRoleProvider } from "@/components/providers/user-role-provider"

export default async function SharedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check if user is authenticated
  const cookieStore = await cookies()
  const authToken = cookieStore.get("auth_token")?.value
  const userType = cookieStore.get("user_type")?.value

  if (!authToken) {
    redirect("/login")
  }

  return (
    <UserRoleProvider initialRole={userType || undefined}>
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex-1 pl-16 pt-14">
          <div className="container mx-auto p-6">{children}</div>
        </main>
      </div>
    </UserRoleProvider>
  )
}

