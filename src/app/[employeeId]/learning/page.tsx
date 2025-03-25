"use client"

import { useState } from "react"
import { Search, Filter } from "lucide-react"
import { useAuth } from "@/app/auth/hooks/useAuth"

// Types for our learning data
interface Certificate {
  name: string
  category: string
  objective: string
}

interface Course {
  name: string
  category: string
  objective: string
}

interface Skill {
  name: string
}

export default function LearningPage() {
  const { userId, role } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")

  // Check if user is a lead
  const isLead = role === "lead"

  // Mock data for certificates
  const certificates: Certificate[] = [
    { name: "Francés C1", category: "Idioma", objective: "Objetivo de tercer idioma" },
    { name: "Python", category: "Lenguaje", objective: "Objetivo de introducción a AI" },
    { name: "Redes neurales", category: "Teoría", objective: "Objetivo de introducción a AI" },
    { name: "React", category: "Biblioteca", objective: "Objetivo de Frontend" },
    { name: "Teoría de color", category: "Diseño", objective: "Objetivo de UI/UX" },
    { name: "CSS", category: "Lenguaje", objective: "Objetivo de Frontend" },
    { name: "HTML", category: "Lenguaje", objective: "Objetivo de Frontend" },
  ]

  // Mock data for courses (same structure as certificates for this example)
  const courses: Course[] = [
    { name: "Francés C1", category: "Idioma", objective: "Objetivo de tercer idioma" },
    { name: "Python", category: "Lenguaje", objective: "Objetivo de introducción a AI" },
    { name: "Redes neurales", category: "Teoría", objective: "Objetivo de introducción a AI" },
    { name: "React", category: "Biblioteca", objective: "Objetivo de Frontend" },
    { name: "Teoría de color", category: "Diseño", objective: "Objetivo de UI/UX" },
    { name: "CSS", category: "Lenguaje", objective: "Objetivo de Frontend" },
  ]

  // Mock data for skills
  const softSkills: Skill[] = [
    { name: "Liderazgo" },
    { name: "Comunicación" },
    { name: "Manejo de tiempo" },
    { name: "Empatía" },
  ]

  const hardSkills: Skill[] = [{ name: "Python" }, { name: "IA" }, { name: "HTML" }, { name: "C++" }]

  // Filter function for search
  const filterItems = (query: string, items: any[]) => {
    if (!query) return items
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        (item.category && item.category.toLowerCase().includes(query.toLowerCase())),
    )
  }

  // Filtered data based on search query
  const filteredCertificates = filterItems(searchQuery, certificates)
  const filteredCourses = filterItems(searchQuery, courses)
  const filteredSoftSkills = filterItems(searchQuery, softSkills)
  const filteredHardSkills = filterItems(searchQuery, hardSkills)

  return (
    <div className="w-full">
      {/* Search bar */}
      <div className="flex items-center mb-8">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md block w-full pl-10 pr-3 py-2"
            placeholder="Buscar oportunidades"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="ml-2 p-2 border border-gray-300 rounded-md bg-white">
          <Filter className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Certificates section */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold text-[#a100ff] mb-4">Certificados recomendados</h2>
          <div className="space-y-6">
            {filteredCertificates.map((cert, index) => (
              <div key={`cert-${index}`} className="border-b pb-4 last:border-0">
                <div className="flex justify-between mb-1">
                  <h3 className="font-medium">{cert.name}</h3>
                  <span className="text-gray-600">{cert.category}</span>
                </div>
                <div className="inline-block px-2 py-1 bg-[#f1d6ff] text-[#a100ff] text-xs rounded-full">
                  {cert.objective}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Courses section */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold text-[#a100ff] mb-4">Cursos recomendados</h2>
          <div className="space-y-6">
            {filteredCourses.map((course, index) => (
              <div key={`course-${index}`} className="border-b pb-4 last:border-0">
                <div className="flex justify-between mb-1">
                  <h3 className="font-medium">{course.name}</h3>
                  <span className="text-gray-600">{course.category}</span>
                </div>
                <div className="inline-block px-2 py-1 bg-[#f1d6ff] text-[#a100ff] text-xs rounded-full">
                  {course.objective}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Soft Skills section */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold text-[#a100ff] mb-4">Soft skills</h2>
          <div className="space-y-4">
            {filteredSoftSkills.map((skill, index) => (
              <div key={`soft-${index}`} className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                  <span className="text-sm">{index + 1}</span>
                </div>
                <span>{skill.name}</span>
              </div>
            ))}
            <div className="flex items-center gap-2 text-gray-400 italic">
              <div className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center">
                <span className="text-sm">+</span>
              </div>
              <span>Añade uno nuevo</span>
            </div>
          </div>
        </div>

        {/* Hard Skills section */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold text-[#a100ff] mb-4">Hard skills</h2>
          <div className="space-y-4">
            {filteredHardSkills.map((skill, index) => (
              <div key={`hard-${index}`} className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                  <span className="text-sm">{index + 1}</span>
                </div>
                <span>{skill.name}</span>
              </div>
            ))}
            <div className="flex items-center gap-2 text-gray-400 italic">
              <div className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center">
                <span className="text-sm">+</span>
              </div>
              <span>Añade uno nuevo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

