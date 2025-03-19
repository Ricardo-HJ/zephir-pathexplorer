export default function ForgotPasswordPage() {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-accenture-purple">Recuperar Contraseña</h1>
            <p className="mt-2 text-gray-600">Ingresa tu correo para recibir instrucciones</p>
          </div>
  
          <form className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo Electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="correo@ejemplo.com"
              />
            </div>
  
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-accenture-dark hover:bg-accenture-dark/90"
              >
                Enviar Instrucciones
              </button>
            </div>
  
            <div className="text-center">
              <a href="/login" className="text-sm text-accenture-purple hover:underline">
                Volver a Iniciar Sesión
              </a>
            </div>
          </form>
        </div>
      </div>
    )
  }
  
  