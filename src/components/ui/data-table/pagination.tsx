"use client"
import { cn } from "@/lib/utils"
import { CustomButton } from "../button"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
  maxPageButtons?: number
}

export function Pagination({ currentPage, totalPages, onPageChange, className, maxPageButtons = 5 }: PaginationProps) {
  // Calculate which page buttons to show
  const getPageNumbers = () => {
    const pageNumbers = []
    const halfMaxButtons = Math.floor(maxPageButtons / 2)

    let startPage = Math.max(1, currentPage - halfMaxButtons)
    const endPage = Math.min(totalPages, startPage + maxPageButtons - 1)

    if (endPage - startPage + 1 < maxPageButtons) {
      startPage = Math.max(1, endPage - maxPageButtons + 1)
    }

    // Always show first page
    if (startPage > 1) {
      pageNumbers.push(1)
      if (startPage > 2) {
        pageNumbers.push("ellipsis-start")
      }
    }

    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i)
    }

    // Always show last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push("ellipsis-end")
      }
      pageNumbers.push(totalPages)
    }

    return pageNumbers
  }

  const pageNumbers = getPageNumbers()

  return (
    <nav className={cn("flex items-center justify-center gap-2", className)} aria-label="Pagination">
      {/* First page button */}
      <CustomButton
        variant="white"
        size="sm"
        buttonType="icon"
        disabled={currentPage === 1}
        action={{
          type: "function",
          handler: () => onPageChange(1),
        }}
        aria-label="Primera página"
      >
        <ChevronsLeft className="h-4 w-4" />
      </CustomButton>

      {/* Previous page button */}
      <CustomButton
        variant="white"
        size="sm"
        buttonType="icon"
        disabled={currentPage === 1}
        action={{
          type: "function",
          handler: () => onPageChange(currentPage - 1),
        }}
        aria-label="Página anterior"
      >
        <ChevronLeft className="h-4 w-4" />
      </CustomButton>

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {pageNumbers.map((page, index) => {
          if (page === "ellipsis-start" || page === "ellipsis-end") {
            return (
              <span key={`${page}-${index}`} className="px-1 text-sm text-gray-500">
                ...
              </span>
            )
          }

          return (
            <CustomButton
              key={page}
              variant={currentPage === page ? "purple" : "white"}
              size="sm"
              action={{
                type: "function",
                handler: () => onPageChange(Number(page)),
              }}
              className={cn("min-w-[32px] h-8", currentPage === page ? "font-medium" : "")}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </CustomButton>
          )
        })}
      </div>

      {/* Next page button */}
      <CustomButton
        variant="white"
        size="sm"
        buttonType="icon"
        disabled={currentPage === totalPages}
        action={{
          type: "function",
          handler: () => onPageChange(currentPage + 1),
        }}
        aria-label="Página siguiente"
      >
        <ChevronRight className="h-4 w-4" />
      </CustomButton>

      {/* Last page button */}
      <CustomButton
        variant="white"
        size="sm"
        buttonType="icon"
        disabled={currentPage === totalPages}
        action={{
          type: "function",
          handler: () => onPageChange(totalPages),
        }}
        aria-label="Última página"
      >
        <ChevronsRight className="h-4 w-4" />
      </CustomButton>
    </nav>
  )
}
