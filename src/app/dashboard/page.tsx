import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Usuario Dashboard</h1>
      <p className="mb-4">Bienvenido al panel de control de usuario.</p>
      <Link href="/api/auth/logout" className="text-accenture-purple hover:underline">
        Cerrar sesión
      </Link>
    </div>
  )
}

