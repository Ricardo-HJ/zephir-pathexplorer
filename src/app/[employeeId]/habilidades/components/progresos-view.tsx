"use client"

import { useState, useEffect } from "react"

// Sample data for skills and progress
const skillsData = [
  { id: 1, name: "Desarrollo con JavaScript", progress: 75, category: "Desarrollo web", status: "En progreso" },
  {
    id: 2,
    name: "Desarrollo de aplicaciones móviles",
    progress: 60,
    category: "Desarrollo móvil",
    status: "En progreso",
  },
  { id: 3, name: "Gestión de proyectos ágiles", progress: 90, category: "Gestión", status: "Completado" },
  { id: 4, name: "Experiencia de usuario efectiva", progress: 80, category: "Diseño", status: "En progreso" },
  { id: 5, name: "Introducción a la inteligencia artificial", progress: 45, category: "IA", status: "En progreso" },
  { id: 6, name: "Técnicas de ventas efectivas", progress: 65, category: "Ventas", status: "En progreso" },
  { id: 7, name: "Configuración de diseño gráfico", progress: 55, category: "Diseño", status: "En progreso" },
  { id: 8, name: "Machine learning with TensorFlow", progress: 30, category: "IA", status: "En progreso" },
]

export function ProgresosView() {
  const [isLoading, setIsLoading] = useState(true)
  const [completedCount, setCompletedCount] = useState(0)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
      // Calculate completed courses
      const completed = skillsData.filter((skill) => skill.status === "Completado").length
      setCompletedCount(completed)
      setTotalCount(skillsData.length)
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

  // Calculate percentage for the progress circle
  const completionPercentage = Math.round((completedCount / totalCount) * 100)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left column - Skills list */}
      <div className="md:col-span-2 bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Cursos en progreso</h2>
        <div className="space-y-6">
          {skillsData.map((skill) => (
            <div key={skill.id} className="border-b pb-4 last:border-0">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="font-medium">{skill.name}</h3>
                  <p className="text-sm text-gray-500">{skill.category}</p>
                </div>
                <span
                  className={`text-sm px-2 py-1 rounded-full ${
                    skill.status === "Completado" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {skill.status}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-accenture-purple h-2.5 rounded-full" style={{ width: `${skill.progress}%` }}></div>
              </div>
              <div className="flex justify-end mt-1">
                <span className="text-xs text-gray-500">{skill.progress}% completado</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right column - Progress summary */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">Resumen de progreso</h2>

        {/* Progress circle */}
        <div className="flex justify-center mb-8">
          <div className="relative w-36 h-36">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle cx="50" cy="50" r="45" fill="none" stroke="#f3f4f6" strokeWidth="10" />

              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#a100ff"
                strokeWidth="10"
                strokeDasharray={`${(2 * Math.PI * 45 * completionPercentage) / 100} ${2 * Math.PI * 45}`}
                strokeDashoffset="0"
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />

              {/* Percentage text */}
              <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" fontSize="20" fontWeight="bold">
                {completionPercentage}%
              </text>
              <text x="50" y="65" textAnchor="middle" dominantBaseline="middle" fontSize="10">
                Completado
              </text>
            </svg>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Cursos completados</span>
            <span className="text-sm font-bold text-green-600">{completedCount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Cursos en progreso</span>
            <span className="text-sm font-bold text-yellow-600">{totalCount - completedCount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Total de cursos</span>
            <span className="text-sm font-bold">{totalCount}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-8 space-y-3">
          <button className="w-full py-2 px-4 bg-accenture-purple text-white rounded-md hover:bg-accenture-purple/90 transition-colors">
            Ver todos los cursos
          </button>
          <button className="w-full py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
            Explorar nuevos cursos
          </button>
        </div>
      </div>
    </div>
  )
}
