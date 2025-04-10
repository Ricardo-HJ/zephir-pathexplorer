"use client"

import { useState, useCallback } from "react"
import WelcomeScreen from "./components/welcome-screen"
import FormScreen from "./components/form-screen"

export default function CareerPage() {
  const [currentStep, setCurrentStep] = useState(0)

  // Create a callback that explicitly only changes the step without navigation
  const handleNext = useCallback(() => {
    console.log("Moving to next step")
    setCurrentStep((prev) => prev + 1)
  }, [])

  const handleSkip = useCallback(() => {
    console.log("Skipping to next step")
    setCurrentStep((prev) => prev + 1)
  }, [])

  console.log("Current step:", currentStep)

  // Render the appropriate component based on the current step
  return (
    <>
      {currentStep === 0 && <WelcomeScreen onNext={handleNext} />}
      {currentStep === 1 && <FormScreen onNext={handleNext} onSkip={handleSkip} />}
      {/* Add more steps as needed */}
    </>
  )
}
