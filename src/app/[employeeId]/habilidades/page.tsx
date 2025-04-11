"use client"

import { useState } from "react"
import { PageHeader } from "@/components/ui/header"
import { HistorialView } from "./components/historial-view"
import { ProgresosView } from "./components/progresos-view"
import { CertificacionesView } from "./components/certificaciones-view"

// Tab menu items
const tabs = [
  { id: "historial", label: "Historial", icon: "icon-charts" },
  { id: "progresos", label: "Progresos", icon: "icon-education" },
  { id: "certificaciones", label: "Certificaciones", icon: "icon-carrer" },
]

export default function EducacionPage() {
  const [activeTab, setActiveTab] = useState("historial")

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Educación"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Educación", href: "/educacion" },
        ]}
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        actions={[
          {
            label: "Nueva Educación",
            variant: "purple",
            icon: "icon-education",
            onClick: () => alert("Agregar nueva educación"),
          },
        ]}
      />

      <div className="container mx-auto px-4 py-6">
        {activeTab === "historial" && <HistorialView />}
        {activeTab === "progresos" && <ProgresosView />}
        {activeTab === "certificaciones" && <CertificacionesView />}
      </div>
    </div>
  )
}
