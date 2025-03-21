// /app/auth/components/logout-button.tsx
"use client"

import { useAuth } from "../hooks/useAuth"

export function LogoutButton() {
  const { logout } = useAuth()

  return (
    <button onClick={logout} className="text-accenture-purple hover:underline">
      Cerrar sesión
    </button>
  )
}