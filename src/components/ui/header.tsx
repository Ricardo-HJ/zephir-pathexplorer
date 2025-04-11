"use client"

import React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { CustomButton } from "./button"
import { CustomSearchbar } from "./searchbar"
import { CustomTabMenu, type TabItem } from "./tab-menu"
import { FilterIcon } from "@/components/ui/icons"

export interface BreadcrumbItem {
  label: string
  href: string
}

export interface ActionButton {
  label: string
  variant?: "purple" | "dark" | "white" | "red" | "green" | "transparent"
  icon?: string
  size?: "small" | "medium" | "large"
  onClick: () => void
  loading?: boolean
  requireConfirmation?: boolean
  confirmationMessage?: string
}

export interface PageHeaderProps {
  title: string
  breadcrumbs?: BreadcrumbItem[]
  searchPlaceholder?: string
  onSearch?: (searchTerm: string) => void
  showFilter?: boolean
  onFilterClick?: () => void
  actions?: ActionButton[]
  tabs?: TabItem[]
  activeTab?: string
  onTabChange?: (tabId: string) => void
  className?: string
}

export function PageHeader({
  title,
  breadcrumbs,
  searchPlaceholder = "Buscar empleados",
  onSearch,
  showFilter = false,
  onFilterClick,
  actions = [],
  tabs,
  activeTab,
  onTabChange,
  className,
}: PageHeaderProps) {
  // Handle confirmation dialog for actions that require it
  const handleActionClick = (action: ActionButton) => {
    if (action.requireConfirmation && action.confirmationMessage) {
      if (window.confirm(action.confirmationMessage)) {
        action.onClick()
      }
    } else {
      action.onClick()
    }
  }

  return (
    <header className={cn("sticky top-0 bg-gray-50 z-10 pt-4 pb-16", className)}>
      <div className="container mx-auto px-4">
        {/* First row: Title, breadcrumbs, search, and actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div className="mb-4 md:mb-0">
            {/* Title and breadcrumbs */}
            <h1 className="text-2xl font-bold text-[#272329]">{title}</h1>
            {breadcrumbs && breadcrumbs.length > 0 && (
              <nav aria-label="Breadcrumb" className="mt-1">
                <ol className="flex items-center text-sm text-gray-500">
                  {breadcrumbs.map((item, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && <span className="mx-2">&gt;</span>}
                      <li>
                        <Link
                          href={item.href}
                          className={cn(
                            "hover:text-[#a100ff] transition-colors",
                            index === breadcrumbs.length - 1 && "font-medium text-[#272329]",
                          )}
                        >
                          {item.label}
                        </Link>
                      </li>
                    </React.Fragment>
                  ))}
                </ol>
              </nav>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Search and filter */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {onSearch && (
                <div className="w-full sm:w-[300px]">
                  <CustomSearchbar placeholder={searchPlaceholder} onSearch={onSearch} />
                </div>
              )}
              {showFilter && (
                <button
                  onClick={onFilterClick}
                  className="p-2 rounded-md hover:bg-gray-200 transition-colors"
                  aria-label="Filter"
                >
                  <FilterIcon className="text-gray-500" />
                </button>
              )}
            </div>

            {/* Action buttons */}
            {actions.length > 0 && (
              <div className="flex items-center gap-2 mt-3 sm:mt-0">
                {actions.map((action, index) => (
                  <CustomButton
                    key={index}
                    variant={action.variant || "purple"}
                    iconName={action.icon}
                    size={"sm"}
                    loading={action.loading}
                    action={{
                      type: "function",
                      handler: () => handleActionClick(action),
                    }}
                  >
                    {action.label}
                  </CustomButton>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Second row: Tabs */}
        {tabs && tabs.length > 0 && activeTab && onTabChange && (
          <div className="mt-6">
            <CustomTabMenu tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />
          </div>
        )}
      </div>
    </header>
  )
}
