import Image from "next/image"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="flex h-screen">
      {/* Left side - Login form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-8 md:px-16 lg:px-24">
        <div className="w-full max-w-md">
          {/* Accenture logo */}
          <div className="flex justify-center mb-12">
            <Image src="/isotype.png" alt="Accenture" width={412} height={122} className="h-12 w-auto" />
          </div>

          {/* Welcome text */}
          <h1 className="text-3xl font-bold text-center text-accenture-purple mb-2">Bienvenido de Nuevo</h1>
          <p className="text-center text-gray-600 mb-10">Porfavor Ingresa tus Datos</p>

          {/* Login form */}
          <form className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Placeholder"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Placeholder"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Mantener sesión
                </label>
              </div>

              <div className="text-sm">
                <Link href="/forgot-password" className="text-accenture-purple hover:underline">
                  Olvidaste tu contraseña
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-accenture-dark text-white font-medium rounded-md hover:bg-accenture-dark/90"
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>

      {/* Right side - Image with overlay */}
      <div className="hidden md:block md:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-l from-black/70 to-black/40 z-10"></div>
        <Image
          src="/accenture-bg.png"
          alt="Accenture Building"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  )
}

