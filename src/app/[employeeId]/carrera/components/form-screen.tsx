"use client"

import type React from "react"

import { useState } from "react"
import { CustomButton } from "@/components/ui/button"
import { CustomInput } from "@/components/ui/input"
import { CustomSelect } from "@/components/ui/select"

interface FormScreenProps {
  onNext: () => void
  onSkip: () => void
}

export default function FormScreen({ onNext, onSkip }: FormScreenProps) {
  const [formData, setFormData] = useState({
    interests: "",
    skills: [],
    experience: "",
  })

  const handleChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically save the data to your backend
    console.log("Form data:", formData)
    onNext()
  }

  const skillOptions = [
    { value: "react", label: "React" },
    { value: "nextjs", label: "Next.js" },
    { value: "typescript", label: "TypeScript" },
    { value: "node", label: "Node.js" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "csharp", label: "C#" },
    { value: "aws", label: "AWS" },
    { value: "azure", label: "Azure" },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          <h1 className="text-3xl font-bold text-accenture-purple mb-8">Completa tu perfil profesional</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <CustomInput
              label="Intereses profesionales"
              placeholder="Ej: Desarrollo web, inteligencia artificial, gestión de proyectos..."
              value={formData.interests}
              onChange={(e) => handleChange("interests", e.target.value)}
            />

            <CustomSelect
              label="Habilidades técnicas"
              options={skillOptions}
              value={formData.skills}
              onChange={(value) => handleChange("skills", value)}
              multiple
              placeholder="Selecciona tus habilidades"
            />

            <CustomInput
              label="Años de experiencia"
              type="number"
              placeholder="Ej: 3"
              value={formData.experience}
              onChange={(e) => handleChange("experience", e.target.value)}
            />

            <div className="pt-4 flex justify-end space-x-4">
              <CustomButton variant="white" size="md" action={{ type: "function", handler: onSkip }}>
                Completar después
              </CustomButton>
              <CustomButton variant="purple" size="md" action={{ type: "submit" }}>
                Guardar y continuar
              </CustomButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
