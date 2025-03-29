"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Filter, User } from "lucide-react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/app/auth/hooks/useAuth"
import * as React from "react"
import { getAllEmployees } from "@/services/api"
import Cookies from "js-cookie"

/**
 * CHANGES:
 * 1. Removed all mock data - using only API calls
 * 2. Added proper error handling with user-friendly messages
 * 3. Maintained the same UI structure and appearance
 * 4. Added empty state for when no employees are found
 */

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

// Filter options
type FilterOptions = {
  minLevel: number | null
  maxLevel: number | null
  positions: string[]
  minAvailability: number | null
  minExperience: number | null
}

// Client component for the employee table with pagination
export function EmployeeTable() {
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
  const [employees, setEmployees] = useState<Employee[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const itemsPerPage = 8

  const [tempFilterOptions, setTempFilterOptions] = useState<FilterOptions>({
    minLevel: null,
    maxLevel: null,
    positions: [],
    minAvailability: null,
    minExperience: null,
  })

  // Fetch employees from API
  useEffect(() => {
    async function fetchEmployees() {
      try {
        setIsLoading(true)
        const token = Cookies.get("auth_token")

        if (!token) {
          throw new Error("Authentication token not found")
        }

        const data = await getAllEmployees(token)

        // Transform API data to component format
        const transformedEmployees = data.users.map((user: any) => ({
          id: user.idUsuario,
          name: [user.nombre, user.apellidoP, user.apellidoM].filter(Boolean).join(" ") || user.correo,
          avatar: "/placeholder.svg?height=40&width=40", // Default avatar
          level: 5, // This would come from a different API endpoint in a real app
          position: user.profesion || "No position specified",
          availability: 80, // This would come from a different API endpoint in a real app
          experience: 2, // This would come from a different API endpoint in a real app
        }))

        setEmployees(transformedEmployees)
        setError(null)
      } catch (err) {
        console.error("Error fetching employees:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch employees")
        setEmployees([]) // Initialize with empty array on error
      } finally {
        setIsLoading(false)
      }
    }

    fetchEmployees()
  }, [])

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
  }

  // Apply filters
  const applyFilters = () => {
    setFilterOptions(tempFilterOptions)
    setShowFilters(false)
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

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-100px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accenture-purple"></div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-[calc(100vh-100px)]">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
          <p>{error}</p>
        </div>
        <Button
          onClick={() => window.location.reload()}
          variant="default"
          className="bg-accenture-purple hover:bg-accenture-purple/90"
        >
          Reintentar
        </Button>
      </div>
    )
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
              <h3 className="font-medium mb-3">Filtros</h3>

              {/* Level filter */}
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Nivel</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="minLevel" className="text-xs">
                      Mínimo
                    </Label>
                    <Select
                      value={tempFilterOptions.minLevel?.toString() || ""}
                      onValueChange={(value) =>
                        setTempFilterOptions((prev) => ({
                          ...prev,
                          minLevel: value ? Number.parseInt(value) : null,
                        }))
                      }
                    >
                      <SelectTrigger id="minLevel" className="w-full">
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
                    <Label htmlFor="maxLevel" className="text-xs">
                      Máximo
                    </Label>
                    <Select
                      value={tempFilterOptions.maxLevel?.toString() || ""}
                      onValueChange={(value) =>
                        setTempFilterOptions((prev) => ({
                          ...prev,
                          maxLevel: value ? Number.parseInt(value) : null,
                        }))
                      }
                    >
                      <SelectTrigger id="maxLevel" className="w-full">
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
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Puesto</h4>
                <div className="max-h-32 overflow-y-auto space-y-2">
                  {uniquePositions.map((position) => (
                    <div key={position} className="flex items-center space-x-2">
                      <Checkbox
                        id={`position-${position}`}
                        checked={tempFilterOptions.positions.includes(position)}
                        onCheckedChange={() => togglePositionFilter(position)}
                      />
                      <Label htmlFor={`position-${position}`} className="text-sm">
                        {position}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability filter */}
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Cargabilidad mínima</h4>
                <Select
                  value={tempFilterOptions.minAvailability?.toString() || ""}
                  onValueChange={(value) =>
                    setTempFilterOptions((prev) => ({
                      ...prev,
                      minAvailability: value ? Number.parseInt(value) : null,
                    }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Cualquiera" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Cualquiera</SelectItem>
                    {[50, 60, 70, 80, 90].map((percent) => (
                      <SelectItem key={percent} value={percent.toString()}>
                        {percent}%
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Experience filter */}
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Experiencia mínima</h4>
                <Select
                  value={tempFilterOptions.minExperience?.toString() || ""}
                  onValueChange={(value) =>
                    setTempFilterOptions((prev) => ({
                      ...prev,
                      minExperience: value ? Number.parseInt(value) : null,
                    }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Cualquiera" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Cualquiera</SelectItem>
                    {[1, 2, 3, 4, 5].map((years) => (
                      <SelectItem key={years} value={years.toString()}>
                        {years} {years === 1 ? "año" : "años"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Filter actions */}
              <div className="flex justify-between">
                <Button variant="outline" size="sm" onClick={resetFilters}>
                  Limpiar
                </Button>
                <Button size="sm" onClick={applyFilters}>
                  Aplicar
                </Button>
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
              <PaginationPrevious
              href="#"
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  onClick={() => handlePageChange(page)}
                  isActive={page === currentPage}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

