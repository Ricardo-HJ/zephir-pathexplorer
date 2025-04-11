"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/layout/sidebar"
import Image from "next/image"

export default function CareerPage() {
  const [currentStage, setCurrentStage] = useState(1)
  
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex-1 ml-16 transition-all duration-300">
        <main className="p-6">
          {/* Header Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">Senior DevOps Path</h1>
                <p className="text-gray-500">Mobile developer, Nivel 11</p>
              </div>
              <div className="text-right">
                <p className="text-sm mb-1">Plan de 5 años</p>
                <p className="text-sm text-gray-500">Salario probable al finalizar: $140K - $170K</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm mb-1">Avance</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-accenture-purple h-2.5 rounded-full" style={{ width: "16%" }}></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Progress Circle */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col items-center justify-center h-full">
                <div className="relative w-48 h-48">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle 
                      cx="50" cy="50" r="45" 
                      fill="none" 
                      stroke="#f3f4f6" 
                      strokeWidth="10" 
                    />
                    <circle 
                      cx="50" cy="50" r="45" 
                      fill="none" 
                      stroke="#a100ff" 
                      strokeWidth="10" 
                      strokeDasharray="283" 
                      strokeDashoffset="99" 
                      strokeLinecap="round" 
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-4xl font-bold">65%</span>
                      <p className="text-gray-500 text-sm">Avance de etapa</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Courses Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-semibold mb-4">Cursos</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>AWS Cloud Practitioner</span>
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Completo</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Kubernetes Administrator</span>
                  <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">En progreso</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Terraform Associate</span>
                  <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">Siguiente</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Terraform Associate</span>
                  <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">Siguiente</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Terraform Associate</span>
                  <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">Siguiente</span>
                </div>
              </div>
              <button className="text-sm text-gray-500 mt-4">Ver más</button>
            </div>

            {/* Skills Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-semibold mb-4">Skills</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center mb-1">
                    <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                    <span>Dominado</span>
                  </div>
                  <div className="text-gray-500 text-sm ml-5">
                    <p>Linux</p>
                    <p>Git</p>
                  </div>
                </div>
                <div>
                  <div className="flex items-center mb-1">
                    <span className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></span>
                    <span>En desarrollo</span>
                  </div>
                  <div className="text-gray-500 text-sm ml-5">
                    <p>CI/CD</p>
                    <p>Automatización</p>
                  </div>
                </div>
                <div>
                  <div className="flex items-center mb-1">
                    <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                    <span>Explorando</span>
                  </div>
                  <div className="text-gray-500 text-sm ml-5">
                    <p>Kubernetes</p>
                    <p>Terraform</p>
                  </div>
                </div>
              </div>
              <button className="text-sm text-gray-500 mt-4">Ver más</button>
            </div>
          </div>

          {/* Stage Information */}
          <div className="mt-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <div className="mx-4">
                    <h2 className="text-xl font-bold">Etapa 1</h2>
                    <p className="text-gray-500">Preparación y fundamentos</p>
                  </div>
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>
              <p className="text-gray-700">
                En esta etapa, aprenderás los fundamentos de Linux, Git y programación básica para gestionar sistemas,
                automatizar tareas y colaborar en proyectos de manera eficiente.
              </p>
            </div>
          </div>

          {/* Skills Radar Chart */}
          <div className="mt-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex">
                <div className="w-1/3">
                  <div className="aspect-square relative">
                    {/* Aquí iría el gráfico de radar, pero usaré una imagen estática para simplicidad */}
                    <svg viewBox="0 0 300 300" className="w-full h-full">
                      <polygon points="150,60 240,90 240,210 150,240 60,210 60,90" fill="rgba(255, 165, 0, 0.3)" stroke="orange" />
                      <line x1="150" y1="30" x2="150" y2="270" stroke="#ccc" />
                      <line x1="30" y1="150" x2="270" y2="150" stroke="#ccc" />
                      <line x1="90" y1="60" x2="210" y2="240" stroke="#ccc" />
                      <line x1="90" y1="240" x2="210" y2="60" stroke="#ccc" />
                    </svg>
                  </div>
                </div>
                <div className="w-2/3 pl-6 space-y-4">
                  <div>
                    <h3 className="font-medium">Cloud</h3>
                    <p className="text-sm text-gray-600">Tienes una base sólida en servicios en la nube, pero aún puedes mejorar en arquitecturas escalables y optimización de costos.</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Automation</h3>
                    <p className="text-sm text-gray-600">Tienes nociones básicas de automatización, pero necesitas trabajar más en la orquestación de procesos y herramientas avanzadas.</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Linux</h3>
                    <p className="text-sm text-gray-600">Dominas los comandos fundamentales y la administración básica, pero aún puedes mejorar en scripting y gestión avanzada de servidores.</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Git</h3>
                    <p className="text-sm text-gray-600">Conoces los conceptos esenciales de Git, pero te falta práctica en estrategias avanzadas como rebase y manejo de conflictos complejos.</p>
                  </div>
                  <div>
                    <h3 className="font-medium">CI/CD</h3>
                    <p className="text-sm text-gray-600">Tienes un buen conocimiento de los flujos de integración y despliegue continuo, pero necesitas experiencia aplicándolos en entornos productivos.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 