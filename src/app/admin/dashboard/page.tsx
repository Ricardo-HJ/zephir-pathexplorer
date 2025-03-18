import Link from "next/link"

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p className="mb-4">Bienvenido al panel de control de administrador.</p>
      <Link href="/api/auth/logout" className="text-accenture-purple hover:underline">
        Cerrar sesión
      </Link>
    </div>
  )
}

