"use client"

import { useState, useEffect } from "react"
import { DataTable, type SortDirection } from "@/components/ui/data-table"
import { PageHeader } from "@/components/ui/header"
import Image from "next/image"

// Sample data type
type Employee = {
  id: number
  avatar: string
  nombre: string
  rol: string
  nivel: number
  cargabilidad: number
  correo: string
  descripcion?: string
}

// Sample data
const sampleData: Employee[] = [
  {
    id: 1,
    avatar: "/placeholder.svg?height=40&width=40",
    nombre: "Ralph Edwards",
    rol: "Lead",
    nivel: 9,
    cargabilidad: 96,
    correo: "mail.ejemplo@accenture.com",
    descripcion:
      "Desarrollador senior con experiencia en React, Node.js y AWS. Especializado en arquitectura de aplicaciones y optimización de rendimiento.",
  },
  {
    id: 2,
    avatar: "/placeholder.svg?height=40&width=40",
    nombre: "Jessica Taylor",
    rol: "Empleado",
    nivel: 7,
    cargabilidad: 92,
    correo: "mail.ejemplo@accenture.com",
  },
  {
    id: 3,
    avatar: "/placeholder.svg?height=40&width=40",
    nombre: "David Martínez",
    rol: "Lead",
    nivel: 4,
    cargabilidad: 89,
    correo: "mail.ejemplo@accenture.com",
    descripcion:
      "Especialista en UX/UI con enfoque en diseño centrado en el usuario. Experiencia en investigación de usuarios y prototipado.",
  },
  {
    id: 4,
    avatar: "/placeholder.svg?height=40&width=40",
    nombre: "Michael Brown",
    rol: "Lead",
    nivel: 10,
    cargabilidad: 98,
    correo: "mail.ejemplo@accenture.com",
  },
  {
    id: 5,
    avatar: "/placeholder.svg?height=40&width=40",
    nombre: "Emily Davis",
    rol: "Empleado",
    nivel: 5,
    cargabilidad: 85,
    correo: "mail.ejemplo@accenture.com",
    descripcion:
      "Analista de datos con experiencia en Power BI, Tableau y SQL. Enfocada en visualización de datos y análisis predictivo.",
  },
  {
    id: 6,
    avatar: "/placeholder.svg?height=40&width=40",
    nombre: "Chris Johnson",
    rol: "Empleado",
    nivel: 8,
    cargabilidad: 94,
    correo: "mail.ejemplo@accenture.com",
  },
  {
    id: 7,
    avatar: "/placeholder.svg?height=40&width=40",
    nombre: "Ralph Edwards",
    rol: "Lead",
    nivel: 9,
    cargabilidad: 96,
    correo: "mail.ejemplo@accenture.com",
  },
  {
    id: 8,
    avatar: "/placeholder.svg?height=40&width=40",
    nombre: "Michael Brown",
    rol: "Lead",
    nivel: 10,
    cargabilidad: 98,
    correo: "mail.ejemplo@accenture.com",
    descripcion:
      "Arquitecto de soluciones con amplia experiencia en sistemas distribuidos y microservicios. Certificado en AWS, Azure y GCP.",
  },
  {
    id: 9,
    avatar: "/placeholder.svg?height=40&width=40",
    nombre: "Sarah Wilson",
    rol: "Empleado",
    nivel: 6,
    cargabilidad: 90,
    correo: "mail.ejemplo@accenture.com",
  },
  {
    id: 10,
    avatar: "/placeholder.svg?height=40&width=40",
    nombre: "David Martínez",
    rol: "Lead",
    nivel: 4,
    cargabilidad: 89,
    correo: "mail.ejemplo@accenture.com",
  },
]

export default function TablePage() {
  // State for pagination
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(5)

  // State for loading simulation
  const [isLoading, setIsLoading] = useState(true)

  // State for search
  const [searchTerm, setSearchTerm] = useState("")

  // State for sorting
  const [sortedData, setSortedData] = useState<Employee[]>([...sampleData])

  // Filtered data based on search term
  const filteredData = sortedData.filter(
    (employee) =>
      employee.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.correo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.rol.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Paginated data
  const paginatedData = filteredData.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)

  // Calculate page count
  const pageCount = Math.ceil(filteredData.length / pageSize)

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Handle search
  const handleSearch = (term: string) => {
    setSearchTerm(term)
    setPageIndex(0) // Reset to first page on search
  }

  // Handle sort
  const handleSort = (column: string, direction: SortDirection) => {
    if (!direction) {
      // Reset to original order
      setSortedData([...sampleData])
      return
    }

    const sorted = [...sortedData].sort((a, b) => {
      const aValue = a[column as keyof Employee]
      const bValue = b[column as keyof Employee]

      if (aValue === bValue) return 0

      // Handle different types
      if (typeof aValue === "string" && typeof bValue === "string") {
        return direction === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      if (aValue === null || aValue === undefined) return direction === "asc" ? -1 : 1
      if (bValue === null || bValue === undefined) return direction === "asc" ? 1 : -1

      return direction === "asc" ? (aValue < bValue ? -1 : 1) : aValue < bValue ? 1 : -1
    })

    setSortedData(sorted)
  }

  // Handle edit
  const handleEdit = (employee: Employee) => {
    alert(`Editando a ${employee.nombre}`)
  }

  // Handle delete
  const handleDelete = (employee: Employee) => {
    alert(`Eliminando a ${employee.nombre}`)
  }

  // Column definitions
  const columns = [
    {
      accessorKey: "avatar",
      header: "",
      cell: ({ row }: { row: Employee }) => (
        <div className="flex items-center justify-center">
          <div className="h-10 w-10 rounded-full overflow-hidden">
            <Image
              src={row.avatar || "/placeholder.svg"}
              alt={`Avatar de ${row.nombre}`}
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
        </div>
      ),
      size: 0.5, // Smaller column
      sortable: false,
    },
    {
      accessorKey: "nombre",
      header: "Nombre",
      size: 2, // Wider column
    },
    {
      accessorKey: "rol",
      header: "Rol",
      size: 1,
    },
    {
      accessorKey: "nivel",
      header: "Nivel",
      size: 0.7,
      align: "center" as const,
    },
    {
      accessorKey: "cargabilidad",
      header: "Cargabilidad",
      cell: ({ getValue }: { getValue: () => number }) => {
        const value = getValue()
        return `${value}%`
      },
      size: 1,
      align: "center" as const,
    },
    {
      accessorKey: "correo",
      header: "Correo",
      size: 2.5, // Wider column for email
    },
  ]

  // Action buttons
  const actions = [
    {
      label: "Editar",
      variant: "white" as const,
      onClick: handleEdit,
    },
    {
      label: "Eliminar",
      variant: "red" as const,
      icon: "icon-trash",
      onClick: handleDelete,
      requireConfirmation: true,
      confirmationMessage: "¿Estás seguro de que deseas eliminar a este empleado?",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Historial"
        breadcrumbs={[
          { label: "Proyectos", href: "/proyectos" },
          { label: "Historial", href: "/proyectos/historial" },
        ]}
        searchPlaceholder="Buscar empleados"
        onSearch={handleSearch}
        showFilter={true}
        onFilterClick={() => alert("Filtro clickeado")}
        actions={[
          {
            label: "Editar mi perfil",
            variant: "purple",
            icon: "icon-user",
            onClick: () => alert("Editar perfil"),
          },
        ]}
      />

      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <DataTable
            data={paginatedData}
            columns={columns}
            actions={actions}
            isLoading={isLoading}
            onSort={handleSort}
            expandable={{
              isExpandable: (row) => !!row.descripcion,
              content: (row) => (
                <div className="p-4 bg-gray-50 rounded-md">
                  <h4 className="font-medium mb-2">Descripción:</h4>
                  <p>{row.descripcion}</p>
                </div>
              ),
            }}
            pagination={{
              pageIndex,
              pageSize,
              pageCount,
              onPageChange: setPageIndex,
            }}
          />
        </div>
      </div>
    </div>
  )
}
