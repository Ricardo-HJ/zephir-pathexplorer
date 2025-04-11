"use client"

import { useState, useEffect } from "react"
import { DataTable, type SortDirection } from "@/components/ui/data-table"

// Sample data type
type Education = {
  id: number
  nombre: string
  fechaExpedicion: string
  fechaExpiracion: string
  empresa: string
}

// Sample data
const sampleData: Education[] = [
  {
    id: 1,
    nombre: "TN Programador",
    fechaExpedicion: "09/10/19",
    fechaExpiracion: "09/10/21",
    empresa: "ITESM",
  },
  {
    id: 2,
    nombre: "Azure Cloud Architect",
    fechaExpedicion: "10/10/19",
    fechaExpiracion: "10/10/21",
    empresa: "Microsoft",
  },
  {
    id: 3,
    nombre: "Certified ScrumMaster",
    fechaExpedicion: "05/05/20",
    fechaExpiracion: "05/05/22",
    empresa: "Scrum Alliance",
  },
  {
    id: 4,
    nombre: "AWS Solutions Architect",
    fechaExpedicion: "07/07/20",
    fechaExpiracion: "07/07/22",
    empresa: "Amazon",
  },
  {
    id: 5,
    nombre: "Google Cloud Engineer",
    fechaExpedicion: "08/08/20",
    fechaExpiracion: "08/08/22",
    empresa: "Google",
  },
  {
    id: 6,
    nombre: "Cisco Certified Network Associate",
    fechaExpedicion: "09/09/20",
    fechaExpiracion: "09/09/22",
    empresa: "Cisco",
  },
  {
    id: 7,
    nombre: "CompTIA Security+",
    fechaExpedicion: "10/10/20",
    fechaExpiracion: "10/10/22",
    empresa: "CompTIA",
  },
  {
    id: 8,
    nombre: "Oracle Certified Professional",
    fechaExpedicion: "11/11/20",
    fechaExpiracion: "11/11/22",
    empresa: "Oracle",
  },
  {
    id: 9,
    nombre: "Project Management Professional",
    fechaExpedicion: "12/12/20",
    fechaExpiracion: "12/12/22",
    empresa: "PMI",
  },
  {
    id: 10,
    nombre: "ITIL Foundation",
    fechaExpedicion: "01/01/21",
    fechaExpiracion: "01/01/23",
    empresa: "Axelos",
  },
]

export function HistorialView() {
  // State for pagination
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(5)

  // State for loading simulation
  const [isLoading, setIsLoading] = useState(true)

  // State for search
  const [searchTerm, setSearchTerm] = useState("")

  // State for sorting
  const [sortedData, setSortedData] = useState<Education[]>([...sampleData])

  // Filtered data based on search term
  const filteredData = sortedData.filter(
    (education) =>
      education.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      education.empresa.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Paginated data
  const paginatedData = filteredData.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)

  // Calculate page count
  const pageCount = Math.ceil(filteredData.length / pageSize)

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

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
      const aValue = a[column as keyof Education]
      const bValue = b[column as keyof Education]

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
  const handleEdit = (education: Education) => {
    alert(`Editando ${education.nombre}`)
  }

  // Handle delete
  const handleDelete = (education: Education) => {
    alert(`Eliminando ${education.nombre}`)
  }

  // Column definitions
  const columns = [
    {
      accessorKey: "nombre",
      header: "Nombre",
      size: 2,
    },
    {
      accessorKey: "fechaExpedicion",
      header: "Fecha de expedición",
      size: 1.5,
    },
    {
      accessorKey: "fechaExpiracion",
      header: "Fecha de expiración",
      size: 1.5,
    },
    {
      accessorKey: "empresa",
      header: "Empresa",
      size: 1.5,
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
      confirmationMessage: "¿Estás seguro de que deseas eliminar esta educación?",
    },
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <DataTable
        data={paginatedData}
        columns={columns}
        actions={actions}
        isLoading={isLoading}
        onSort={handleSort}
        pagination={{
          pageIndex,
          pageSize,
          pageCount,
          onPageChange: setPageIndex,
        }}
      />
    </div>
  )
}
