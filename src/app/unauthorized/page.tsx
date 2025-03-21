export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-3xl font-bold text-accenture-purple mb-4">Acceso No Autorizado</h1>
      <p className="text-gray-600 mb-8 text-center">No tienes los permisos necesarios para acceder a esta página.</p>
    </div>
  )
}

