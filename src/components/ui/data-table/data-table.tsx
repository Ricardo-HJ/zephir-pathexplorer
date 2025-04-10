"use client"

import React, { useState, useMemo } from "react"
import { cn } from "@/lib/utils"
import { CustomButton } from "../button"
import { Pagination } from "./pagination"
import { TableSkeleton } from "./table-skeleton"
import { ChevronDown, ChevronUp } from "lucide-react"

export type SortDirection = "asc" | "desc" | null

export type ColumnDef<T> = {
  accessorKey: keyof T | string
  header: string
  cell?: (info: { row: T; getValue: () => any }) => React.ReactNode
  enableSorting?: boolean
  size?: number // Size in flex units
  minWidth?: string // Minimum width for the column
  maxWidth?: string // Maximum width for the column
  align?: "left" | "center" | "right"
  sortable?: boolean
}

export type ActionButton<T> = {
  label: string
  icon?: string
  variant?: "purple" | "dark" | "white" | "red" | "green" | "transparent"
  onClick: (row: T) => void
  requireConfirmation?: boolean
  confirmationMessage?: string
  isHidden?: (row: T) => boolean
}

export interface ExpandableContent<T> {
  isExpandable: (row: T) => boolean
  content: (row: T) => React.ReactNode
}

export interface DataTableProps<T extends Record<string, any>> {
  data: T[]
  columns: ColumnDef<T>[]
  actions?: ActionButton<T>[]
  isLoading?: boolean
  emptyMessage?: string
  errorMessage?: string
  hasError?: boolean
  expandable?: ExpandableContent<T>
  pagination?: {
    pageIndex: number
    pageSize: number
    pageCount: number
    onPageChange: (page: number) => void
  }
  onSort?: (column: string, direction: SortDirection) => void
  className?: string
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  actions,
  isLoading = false,
  emptyMessage = "No hay datos disponibles",
  errorMessage = "Ha ocurrido un error al cargar los datos",
  hasError = false,
  expandable,
  pagination,
  onSort,
  className,
}: DataTableProps<T>) {
  // State for sorting
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)

  // State for expanded rows
  const [expandedRows, setExpandedRows] = useState<Record<string | number, boolean>>({})

  // Calculate column widths based on size property
  const columnStyles = useMemo(() => {
    return columns.map((column) => {
      const style: React.CSSProperties = {}

      if (column.minWidth) {
        style.minWidth = column.minWidth
      }

      if (column.maxWidth) {
        style.maxWidth = column.maxWidth
      }

      if (column.size) {
        style.flex = column.size
      } else {
        style.flex = 1
      }

      return style
    })
  }, [columns])

  // Handle sort click
  const handleSortClick = (column: ColumnDef<T>) => {
    if (column.sortable === false) return

    let newDirection: SortDirection = "asc"

    if (sortColumn === column.accessorKey) {
      if (sortDirection === "asc") {
        newDirection = "desc"
      } else if (sortDirection === "desc") {
        newDirection = null
      }
    }

    setSortColumn(newDirection === null ? null : column.accessorKey.toString())
    setSortDirection(newDirection)

    if (onSort) {
      onSort(column.accessorKey.toString(), newDirection)
    }
  }

  // Handle row expansion toggle
  const toggleRowExpansion = (rowId: string | number) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }))
  }

  // Handle action click with confirmation if needed
  const handleActionClick = (action: ActionButton<T>, row: T) => {
    if (action.requireConfirmation && action.confirmationMessage) {
      if (window.confirm(action.confirmationMessage)) {
        action.onClick(row)
      }
    } else {
      action.onClick(row)
    }
  }

  // Function to get value from nested properties (e.g. "user.name")
  const getValue = (row: T, accessorKey: string) => {
    if (accessorKey.includes(".")) {
      const keys = accessorKey.split(".")
      let value: any = row
      for (const key of keys) {
        value = value?.[key]
        if (value === undefined) return undefined
      }
      return value
    }
    return row[accessorKey as keyof T]
  }

  // Render cell content based on column definition
  const renderCell = (row: T, column: ColumnDef<T>) => {
    const value = getValue(row, column.accessorKey as string)

    if (column.cell) {
      return column.cell({
        row,
        getValue: () => value,
      })
    }

    // Handle different value types
    if (value === null || value === undefined) {
      return "-"
    }

    if (typeof value === "boolean") {
      return value ? "Sí" : "No"
    }

    return value
  }

  // Render loading state
  if (isLoading) {
    return <TableSkeleton columns={columns.length} rows={5} hasActions={!!actions && actions.length > 0} />
  }

  // Render error state
  if (hasError) {
    return <div className="text-center py-8 text-red-500">{errorMessage}</div>
  }

  // Render empty state
  if (data.length === 0) {
    return <div className="text-center py-8 text-gray-500">{emptyMessage}</div>
  }

  return (
    <div className={cn("w-full overflow-hidden", className)}>
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              {expandable && <th className="w-10 py-3 px-2"></th>}
              {columns.map((column, index) => (
                <th
                  key={column.accessorKey.toString()}
                  className={cn(
                    "py-3 px-4 text-sm font-medium text-gray-500",
                    column.sortable !== false && "cursor-pointer select-none",
                    column.align === "center" && "text-center",
                    column.align === "right" && "text-right",
                  )}
                  style={columnStyles[index]}
                  onClick={() => column.sortable !== false && handleSortClick(column)}
                >
                  <div className="flex items-center gap-1 justify-between">
                    <span>{column.header}</span>
                    {column.sortable !== false && (
                      <div className="flex flex-col">
                        <ChevronUp
                          className={cn(
                            "h-3 w-3 transition-colors",
                            sortColumn === column.accessorKey && sortDirection === "asc"
                              ? "text-[#a100ff]"
                              : "text-gray-400",
                          )}
                        />
                        <ChevronDown
                          className={cn(
                            "h-3 w-3 -mt-1 transition-colors",
                            sortColumn === column.accessorKey && sortDirection === "desc"
                              ? "text-[#a100ff]"
                              : "text-gray-400",
                          )}
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
              {actions && actions.length > 0 && (
                <th className="py-3 px-4 text-right text-sm font-medium text-gray-500">Acciones</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((row, rowIndex) => {
              const rowId = (row.id || rowIndex).toString()
              const isExpanded = expandedRows[rowId] || false
              const isExpandableRow = expandable?.isExpandable ? expandable.isExpandable(row) : false

              return (
                <React.Fragment key={rowId}>
                  <tr className="hover:bg-gray-50 transition-colors">
                    {expandable && (
                      <td className="py-4 px-2 text-center">
                        {isExpandableRow && (
                          <button
                            onClick={() => toggleRowExpansion(rowId)}
                            className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                            aria-label={isExpanded ? "Collapse row" : "Expand row"}
                          >
                            {isExpanded ? (
                              <ChevronUp className="h-4 w-4 text-gray-500" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-gray-500" />
                            )}
                          </button>
                        )}
                      </td>
                    )}
                    {columns.map((column) => (
                      <td
                        key={column.accessorKey.toString()}
                        className={cn(
                          "py-4 px-4 text-sm text-gray-700",
                          column.align === "center" && "text-center",
                          column.align === "right" && "text-right",
                        )}
                      >
                        {renderCell(row, column)}
                      </td>
                    ))}
                    {actions && actions.length > 0 && (
                      <td className="py-2 px-4 text-right space-x-2 whitespace-nowrap">
                        {actions
                          .filter((action) => !action.isHidden || !action.isHidden(row))
                          .map((action, actionIndex) => (
                            <CustomButton
                              key={actionIndex}
                              variant={action.variant || "white"}
                              size="sm"
                              iconName={action.icon}
                              action={{
                                type: "function",
                                handler: () => handleActionClick(action, row),
                              }}
                            >
                              {action.label}
                            </CustomButton>
                          ))}
                      </td>
                    )}
                  </tr>
                  {isExpandableRow && isExpanded && (
                    <tr className="bg-gray-50">
                      <td
                        colSpan={columns.length + (expandable ? 1 : 0) + (actions && actions.length > 0 ? 1 : 0)}
                        className="py-4 px-6 text-sm text-gray-700"
                      >
                        {expandable?.content(row)}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              )
            })}
          </tbody>
        </table>
      </div>

      {pagination && pagination.pageCount > 1 && (
        <div className="mt-4 flex justify-center">
          <Pagination
            currentPage={pagination.pageIndex + 1}
            totalPages={pagination.pageCount}
            onPageChange={(page) => pagination.onPageChange(page - 1)}
          />
        </div>
      )}
    </div>
  )
}
