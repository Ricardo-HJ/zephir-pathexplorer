import { LogoutButton } from "../components/logout-button"

export default function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Usuario Dashboard</h1>
      <p className="mb-4">Bienvenido al panel de control de usuario.</p>
      <LogoutButton />
    </div>
  )
}

