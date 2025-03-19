"use client"

import type React from "react"

import { useState } from "react"
import { useUserRole } from "@/hooks/useUserRole"

export default function SettingsPage() {
  const { role } = useUserRole()
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      browser: true,
      mobile: false,
    },
    theme: "light",
    language: "es",
  })

  const handleNotificationChange = (type: keyof typeof settings.notifications) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [type]: !settings.notifications[type],
      },
    })
  }

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSettings({
      ...settings,
      theme: e.target.value,
    })
  }

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSettings({
      ...settings,
      language: e.target.value,
    })
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Configuración</h1>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-lg border shadow-sm">
          <div className="border-b p-4">
            <h3 className="text-lg font-medium">Notificaciones</h3>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Notificaciones por Correo</p>
                  <p className="text-sm text-gray-500">Recibir notificaciones por correo electrónico</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.notifications.email}
                    onChange={() => handleNotificationChange("email")}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accenture-purple"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Notificaciones del Navegador</p>
                  <p className="text-sm text-gray-500">Recibir notificaciones en el navegador</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.notifications.browser}
                    onChange={() => handleNotificationChange("browser")}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accenture-purple"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Notificaciones Móviles</p>
                  <p className="text-sm text-gray-500">Recibir notificaciones en dispositivos móviles</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.notifications.mobile}
                    onChange={() => handleNotificationChange("mobile")}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accenture-purple"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border shadow-sm">
          <div className="border-b p-4">
            <h3 className="text-lg font-medium">Apariencia</h3>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tema</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={settings.theme}
                  onChange={handleThemeChange}
                >
                  <option value="light">Claro</option>
                  <option value="dark">Oscuro</option>
                  <option value="system">Sistema</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Idioma</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={settings.language}
                  onChange={handleLanguageChange}
                >
                  <option value="es">Español</option>
                  <option value="en">Inglés</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {role === "admin" && (
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="border-b p-4">
              <h3 className="text-lg font-medium">Configuración Avanzada</h3>
            </div>
            <div className="p-4">
              <p className="text-gray-500 mb-4">Estas opciones solo están disponibles para administradores.</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Modo de Mantenimiento</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option value="off">Desactivado</option>
                    <option value="on">Activado</option>
                    <option value="scheduled">Programado</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nivel de Registro</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option value="error">Solo Errores</option>
                    <option value="warning">Advertencias y Errores</option>
                    <option value="info">Información</option>
                    <option value="debug">Depuración</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="button"
            className="px-4 py-2 bg-accenture-dark text-white font-medium rounded-md hover:bg-accenture-dark/90"
          >
            Guardar Configuración
          </button>
        </div>
      </div>
    </div>
  )
}

