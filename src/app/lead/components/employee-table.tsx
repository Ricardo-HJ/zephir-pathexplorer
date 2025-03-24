"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Filter } from "lucide-react"
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination"

// Employee type definition
interface Employee {
  id: string
  name: string
  avatar: string
  level: number
  position: string
  availability: number
  experience: number
}

interface EmployeeTableProps {
  employees: Employee[]
}

// Client component for the employee table with pagination
export function EmployeeTable({ employees }: EmployeeTableProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  // Filter employees based on search query
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Calculate pagination
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentEmployees = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem)

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="w-full">
      {/* Search and filter bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
            placeholder="Buscar empleados"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="flex items-center justify-center p-2.5 ml-2 text-sm font-medium text-white bg-accenture-purple rounded-lg">
          <Filter className="h-5 w-5" />
        </button>
      </div>

      {/* Employee table */}
      <div className="w-full bg-white rounded-lg shadow">
        {/* Table header */}
        <div className="grid grid-cols-5 border-b py-4 px-6 text-sm font-medium text-gray-500">
          <div className="col-span-1">Nombre</div>
          <div className="col-span-1 text-center">Nivel</div>
          <div className="col-span-1">Puesto</div>
          <div className="col-span-1 text-center">Cargabilidad</div>
          <div className="col-span-1 text-center">Experiencia</div>
        </div>

        {/* Table body */}
        <div className="divide-y">
          {currentEmployees.map((employee) => (
            <Link
              href={`/dashboard/${employee.id}`}
              key={employee.id}
              className="grid grid-cols-5 items-center py-4 px-6 hover:bg-gray-50 transition-colors"
            >
              <div className="col-span-1 flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full overflow-hidden">
                  <Image
                    src={employee.avatar || "/placeholder.svg"}
                    alt={employee.name}
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="font-medium">{employee.name}</span>
              </div>
              <div className="col-span-1 text-center">{employee.level}</div>
              <div className="col-span-1">{employee.position}</div>
              <div className="col-span-1 text-center">{employee.availability}%</div>
              <div className="col-span-1 text-center">
                {employee.experience} {employee.experience === 1 ? "año" : "años"}
              </div>
            </Link>
          ))}
        </div>

        {/* Empty state */}
        {currentEmployees.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            No se encontraron empleados que coincidan con la búsqueda.
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-6">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                First
              </button>
            </PaginationItem>

            {Array.from({ length: Math.min(totalPages, 3) }).map((_, i) => {
              const pageNumber = i + 1
              return (
                <PaginationItem key={pageNumber}>
                  <button
                    onClick={() => handlePageChange(pageNumber)}
                    className={`w-10 h-10 flex items-center justify-center rounded-md ${
                      currentPage === pageNumber
                        ? "bg-white shadow-md font-semibold"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {pageNumber}
                  </button>
                </PaginationItem>
              )
            })}

            {totalPages > 3 && (
              <>
                <PaginationItem>
                  <span className="mx-1">—</span>
                </PaginationItem>

                <PaginationItem>
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    className={`w-10 h-10 flex items-center justify-center rounded-md ${
                      currentPage === totalPages
                        ? "bg-white shadow-md font-semibold"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {totalPages}
                  </button>
                </PaginationItem>
              </>
            )}

            <PaginationItem>
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Last
              </button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

