"use client"

import type React from "react"
import { useCallback } from "react"
import { CustomButton } from "@/components/ui/button"
import {CareerMainBackground} from "@/components/ui/backgrounds/index"

interface WelcomeScreenProps {
  onNext: () => void
}

export default function CareerPage({ onNext }: WelcomeScreenProps) {

  const handleNext = useCallback(
    (e: React.MouseEvent) => {
      // Stop the event from propagating up to parent elements
      if (e) {
        e.preventDefault()
        e.stopPropagation()
      }

      // Call the original onNext function
      onNext()
    },
    [onNext],
  )

  return (
    <div className="fixed inset-0 z-50 w-screen h-screen overflow-hidden">
      {/* Background using SVG component */}
      <div className="absolute inset-0">
        <CareerMainBackground />
      </div>

      {/* Content overlay */}
      <div className="relative z-20 h-full w-full flex items-center justify-center">
        <div className="text-center px-4 max-w-3xl">
          <h1 className="text-5xl font-bold text-white mb-6">¡ Define tu trayectoria profesional !</h1>

          <p className="text-white text-xl mb-12">
            Personaliza tu camino según lo que te motiva, lo que quieres lograr y lo que más valoras en tu carrera.
          </p>

        {/* Option 2: If you need to use CustomButton, uncomment this*/}
        <CustomButton 
          variant="white" 
          size="md" 
          action={{ type: "button", onClick: handleNext }} 
          className="font-medium"
        >
          Comenzar
        </CustomButton>
        </div>
      </div>
    </div>
  )
}

