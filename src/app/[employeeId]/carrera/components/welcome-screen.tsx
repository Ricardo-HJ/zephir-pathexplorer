"use client"

import { useRouter } from "next/navigation"
import { CustomButton } from "@/components/ui/button"

export default function WelcomeScreen() {
  const router = useRouter()

  const handleStart = () => {
    // Navigate to the next screen in the flow
    router.push(`/carrera/information`)
  }

  return (
    <div
      className="h-screen w-full flex items-center justify-center"
      style={{
        backgroundImage: "url('/public/welcome-screen.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Content overlay */}
      <div className="text-center px-4 max-w-3xl">
        <h1 className="text-5xl font-bold text-white mb-6">¡ Define tu trayectoria profesional !</h1>

        <p className="text-white text-xl mb-12">
          Personaliza tu camino según lo que te motiva, lo que quieres lograr y lo que más valoras en tu carrera.
        </p>

        <CustomButton
          variant="white"
          size="md"
          action={{
            type: "function",
            handler: handleStart,
          }}
          className="font-medium"
          iconName="icon-star"
          iconPosition="right"
        >
          Comenzar
        </CustomButton>
      </div>
    </div>
  )
}
