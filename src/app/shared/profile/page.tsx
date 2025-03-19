"use client"

import { useState } from "react"
import { useUserRole } from "@/hooks/useUserRole"

export default function ProfilePage() {
  const { role } = useUserRole()
  const [user] = useState({
    name: "Juan Pérez",
    email: "juan.perez@accenture.com",
    role: role || "employee",
    department: "IT",
    joinDate: "2022-03-15",
    phone: "+52 55 1234 5678",
    location: "Monterrey, México",
  })

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Mi Perfil</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border shadow-sm lg:col-span-1">
          <div className="p-6 flex flex-col items-center">
            <div className="h-32 w-32 rounded-full bg-accenture-purple/10 flex items-center justify-center mb-4">
              <span className="text-4xl font-bold text-accenture-purple">{user.name.charAt(0)}</span>
            </div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-gray-500">{user.role}</p>
            <p className="text-gray-500">{user.department}</p>

            <div className="w-full mt-6 pt-6 border-t">
              <h3 className="font-medium mb-2">Información de Contacto</h3>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="text-gray-500">Email:</span> {user.email}
                </p>
                <p className="text-sm">
                  <span className="text-gray-500">Teléfono:</span> {user.phone}
                </p>
                <p className="text-sm">
                  <span className="text-gray-500">Ubicación:</span> {user.location}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border shadow-sm lg:col-span-2">
          <div className="border-b p-4">
            <h3 className="text-lg font-medium">Información Personal</h3>
          </div>
          <div className="p-4">
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    defaultValue={user.name}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    defaultValue={user.email}
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    defaultValue={user.phone}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    defaultValue={user.location}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    defaultValue={user.department}
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Ingreso</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    defaultValue={user.joinDate}
                    disabled
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-accenture-dark text-white font-medium rounded-md hover:bg-accenture-dark/90"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

