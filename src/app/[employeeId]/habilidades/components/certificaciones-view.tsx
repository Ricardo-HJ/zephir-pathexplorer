"use client"

import { useState, useEffect } from "react"
import { CustomButton } from "@/components/ui/button"

// Sample data for certifications
const certificationsData = [
  {
    id: 1,
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    issueDate: "2023-05-15",
    expiryDate: "2026-05-15",
    credentialId: "AWS-123456",
    skills: ["Cloud Architecture", "AWS Services", "Security"],
  },
  {
    id: 2,
    name: "Microsoft Certified: Azure Developer Associate",
    issuer: "Microsoft",
    issueDate: "2023-02-10",
    expiryDate: "2025-02-10",
    credentialId: "MS-789012",
    skills: ["Azure", "Cloud Development", ".NET"],
  },
  {
    id: 3,
    name: "Google Professional Cloud Architect",
    issuer: "Google Cloud",
    issueDate: "2022-11-20",
    expiryDate: "2024-11-20",
    credentialId: "GCP-345678",
    skills: ["GCP", "Cloud Architecture", "Security"],
  },
]

export function CertificacionesView() {
  const [isLoading, setIsLoading] = useState(true)
  const [certifications, setCertifications] = useState(certificationsData)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accenture-purple"></div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left column - Certifications list */}
      <div className="md:col-span-2 bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">Mis Certificaciones</h2>

        {certifications.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No tienes certificaciones registradas</p>
            <CustomButton variant="purple" action={{ type: "function", handler: () => alert("Agregar certificación") }}>
              Agregar certificación
            </CustomButton>
          </div>
        ) : (
          <div className="space-y-6">
            {certifications.map((cert) => (
              <div key={cert.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between">
                  <h3 className="font-medium text-lg">{cert.name}</h3>
                  <div className="flex space-x-2">
                    <button className="text-gray-500 hover:text-accenture-purple">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </button>
                    <button className="text-gray-500 hover:text-red-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <p className="text-sm text-gray-500 mt-1">{cert.issuer}</p>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-xs text-gray-500">Fecha de emisión</p>
                    <p className="text-sm">{new Date(cert.issueDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Fecha de expiración</p>
                    <p className="text-sm">{new Date(cert.expiryDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">ID de credencial</p>
                    <p className="text-sm">{cert.credentialId}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-xs text-gray-500 mb-2">Habilidades</p>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right column - Summary and actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">Resumen</h2>

        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Certificaciones activas</h3>
            <div className="text-3xl font-bold text-accenture-purple">{certifications.length}</div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Próximas a expirar</h3>
            <div className="text-3xl font-bold text-yellow-500">1</div>
            <p className="text-sm text-gray-500 mt-2">En los próximos 90 días</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Habilidades certificadas</h3>
            <div className="text-3xl font-bold text-green-500">8</div>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <CustomButton
            variant="purple"
            className="w-full"
            action={{ type: "function", handler: () => alert("Agregar certificación") }}
          >
            Agregar certificación
          </CustomButton>

          <CustomButton
            variant="white"
            className="w-full"
            action={{ type: "function", handler: () => alert("Ver todas las certificaciones") }}
          >
            Ver todas
          </CustomButton>
        </div>
      </div>
    </div>
  )
}
