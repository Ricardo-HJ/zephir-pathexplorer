"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Filter, User } from "lucide-react"
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/app/auth/hooks/useAuth"
import * as React from "react"

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

// Filter options
type FilterOptions = {
  minLevel: number | null
  maxLevel: number | null
  positions: string[]
  minAvailability: number | null
  minExperience: number | null
}

// Client component for the employee table with pagination
export function EmployeeTable({ employees }: EmployeeTableProps) {
  const { userId } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    minLevel: null,
    maxLevel: null,
    positions: [],
    minAvailability: null,
    minExperience: null,
  })
  const [showFilters, setShowFilters] = useState(false)
  const itemsPerPage = 8

  const [tempFilterOptions, setTempFilterOptions] = useState<FilterOptions>({
    minLevel: null,
    maxLevel: null,
    positions: [],
    minAvailability: null,
    minExperience: null,
  })

  // Initialize temp filters when popover opens
  React.useEffect(() => {
    if (showFilters) {
      setTempFilterOptions({ ...filterOptions })
    }
  }, [showFilters, filterOptions])

  // Get unique positions for filter
  const uniquePositions = Array.from(new Set(employees.map((emp) => emp.position)))

  // Toggle position filter
  const togglePositionFilter = (position: string) => {
    setFilterOptions((prev) => {
      if (prev.positions.includes(position)) {
        return {
          ...prev,
          positions: prev.positions.filter((p) => p !== position),
        }
      } else {
        return {
          ...prev,
          positions: [...prev.positions, position],
        }
      }
    })
  }

  // Reset all filters (both temp and applied)
  const resetFilters = () => {
    const emptyFilters = {
      minLevel: null,
      maxLevel: null,
      positions: [],
      minAvailability: null,
      minExperience: null,
    }
    setFilterOptions(emptyFilters)
    setTempFilterOptions(emptyFilters)
    setShowFilters(false)
  }

  // Filter employees based on search query and filter options
  const filteredEmployees = employees.filter((employee) => {
    // Search filter
    const matchesSearch =
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchQuery.toLowerCase())

    // Level filter
    const matchesMinLevel = filterOptions.minLevel === null || employee.level >= filterOptions.minLevel
    const matchesMaxLevel = filterOptions.maxLevel === null || employee.level <= filterOptions.maxLevel

    // Position filter
    const matchesPosition = filterOptions.positions.length === 0 || filterOptions.positions.includes(employee.position)

    // Availability filter
    const matchesAvailability =
      filterOptions.minAvailability === null || employee.availability >= filterOptions.minAvailability

    // Experience filter
    const matchesExperience = filterOptions.minExperience === null || employee.experience >= filterOptions.minExperience

    return (
      matchesSearch && matchesMinLevel && matchesMaxLevel && matchesPosition && matchesAvailability && matchesExperience
    )
  })

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
        <div className="flex items-center w-full">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md block w-full pl-10 pr-3 py-2"
              placeholder="Buscar empleados"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter button */}
          <Popover open={showFilters} onOpenChange={setShowFilters}>
            <PopoverTrigger asChild>
              <button className="ml-2 p-2 border border-gray-300 rounded-md bg-white" aria-label="Filter">
                <Filter className="h-5 w-5 text-gray-500" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4">
              <div className="space-y-4">
                <h3 className="font-medium">Filtros</h3>

                {/* Level filter */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Nivel</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="min-level">Mínimo</Label>
                      <Select
                        value={tempFilterOptions.minLevel?.toString() || ""}
                        onValueChange={(value) =>
                          setTempFilterOptions({
                            ...tempFilterOptions,
                            minLevel: value ? Number.parseInt(value) : null,
                          })
                        }
                      >
                        <SelectTrigger id="min-level">
                          <SelectValue placeholder="Cualquiera" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Cualquiera</SelectItem>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                            <SelectItem key={level} value={level.toString()}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="max-level">Máximo</Label>
                      <Select
                        value={tempFilterOptions.maxLevel?.toString() || ""}
                        onValueChange={(value) =>
                          setTempFilterOptions({
                            ...tempFilterOptions,
                            maxLevel: value ? Number.parseInt(value) : null,
                          })
                        }
                      >
                        <SelectTrigger id="max-level">
                          <SelectValue placeholder="Cualquiera" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Cualquiera</SelectItem>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                            <SelectItem key={level} value={level.toString()}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Position filter */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Puesto</h4>
                  <div className="max-h-40 overflow-y-auto space-y-2">
                    {uniquePositions.map((position) => (
                      <div key={position} className="flex items-center space-x-2">
                        <Checkbox
                          id={`position-${position}`}
                          checked={tempFilterOptions.positions.includes(position)}
                          onCheckedChange={() => {
                            setTempFilterOptions((prev) => {
                              if (prev.positions.includes(position)) {
                                return {
                                  ...prev,
                                  positions: prev.positions.filter((p) => p !== position),
                                }
                              } else {
                                return {
                                  ...prev,
                                  positions: [...prev.positions, position],
                                }
                              }
                            })
                          }}
                        />
                        <Label htmlFor={`position-${position}`}>{position}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Availability filter */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Cargabilidad mínima</h4>
                  <Select
                    value={tempFilterOptions.minAvailability?.toString() || ""}
                    onValueChange={(value) =>
                      setTempFilterOptions({
                        ...tempFilterOptions,
                        minAvailability: value ? Number.parseInt(value) : null,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Cualquiera" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Cualquiera</SelectItem>
                      {[70, 75, 80, 85, 90, 95].map((percent) => (
                        <SelectItem key={percent} value={percent.toString()}>
                          {percent}%
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Experience filter */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Experiencia mínima</h4>
                  <Select
                    value={tempFilterOptions.minExperience?.toString() || ""}
                    onValueChange={(value) =>
                      setTempFilterOptions({
                        ...tempFilterOptions,
                        minExperience: value ? Number.parseInt(value) : null,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Cualquiera" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Cualquiera</SelectItem>
                      {[1, 2, 3, 4, 5, 6].map((years) => (
                        <SelectItem key={years} value={years.toString()}>
                          {years} {years === 1 ? "año" : "años"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Filter actions */}
                <div className="flex justify-between pt-2">
                  <Button variant="outline" onClick={resetFilters}>
                    Limpiar
                  </Button>
                  <Button
                    onClick={() => {
                      setFilterOptions(tempFilterOptions)
                      setShowFilters(false)
                    }}
                  >
                    Aplicar
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Profile button - links directly to the current user's profile using userId from auth hook */}
        {userId && (
          <Link href={`/${userId}/dashboard`}>
            <Button variant="default" className="ml-auto">
              <User className="mr-2 h-4 w-4" />
              Ver mi perfil
            </Button>
          </Link>
        )}
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
              href={`/${employee.id}/dashboard`}
              key={employee.id}
              className="grid grid-cols-5 items-center py-4 px-6 hover:bg-gray-50 transition-colors"
            >
              <div className="col-span-1 flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full overflow-hidden">
                  <Image
                    src={employee.avatar || "/placeholder.svg?height=40&width=40"}
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

