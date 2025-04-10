"use client"

import { useActionState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { login } from "@/app/auth/actions"
import { Loader2 } from "lucide-react"
import { CustomInput } from "@/components/ui/input"
import { CustomPasswordInput } from "@/components/ui/password-input"
import { CustomButton } from "@/components/ui/button"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const invalidToken = searchParams.get("invalidToken") === "true"

  const [state, formAction, isPending] = useActionState(login, {
    success: false,
    message: "",
    redirectTo: "",
  })

  // Handle redirection after successful login
  useEffect(() => {
    if (state.success && state.redirectTo) {
      router.push(state.redirectTo)
    }
  }, [state, router])

  // Clear invalid tokens if needed
  useEffect(() => {
    if (invalidToken) {
      fetch("/api/auth/clear-cookies")
    }
  }, [invalidToken])

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
          <form className="space-y-6" action={formAction}>
            {state.message && (
              <div
                className={`p-3 rounded-md ${state.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
              >
                {state.message}
              </div>
            )}

            {invalidToken && (
              <div className="p-3 rounded-md bg-yellow-50 text-yellow-700">
                Tu sesión ha expirado. Por favor inicia sesión nuevamente.
              </div>
            )}

            <div className="space-y-2">
              <CustomInput
                id="email"
                name="email"
                type="email"
                label="Correo"
                placeholder="correo@ejemplo.com"
                iconLeft="icon-mail"
                disabled={isPending}
                required
              />
            </div>

            <div className="space-y-2">
              <CustomPasswordInput
                id="password"
                name="password"
                label="Contraseña"
                placeholder=""
                disabled={isPending}
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 border-gray-300 rounded text-[#a100ff] focus:ring-[#a100ff]"
                  disabled={isPending}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Mantener sesión
                </label>
              </div>

              <div className="text-sm">
                <Link href="/auth/forgot-password" className="text-accenture-purple hover:underline">
                  Olvidaste tu contraseña
                </Link>
              </div>
            </div>

            <CustomButton
              disabled={isPending}
              variant="purple"
              size="sm"
              className="w-full"
              action={{ type: "submit" }}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                "Iniciar sesión"
              )}
            </CustomButton>
          </form>
        </div>
      </div>

      {/* Right side - Image with overlay */}
      <div className="hidden md:block md:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-l from-black/70 to-black/40 z-10"></div>
        <Image src="/accenture-bg.png" alt="Accenture Building" fill className="object-cover" priority />
      </div>
    </div>
  )
}
