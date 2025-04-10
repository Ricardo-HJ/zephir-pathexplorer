"use client"

import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const tagVariants = cva("inline-flex items-center justify-center font-medium rounded-full transition-colors", {
  variants: {
    variant: {
      yellow: "bg-[#ffff8e] text-[#c89900]",
      red: "bg-[#ffc6c8] text-[#fe3a44]",
      green: "bg-[#86f989] text-[#187c1b]",
      purple: "bg-[#f1d6ff] text-[#a100ff]",
      default: "bg-gray-100 text-gray-800",
    },
    size: {
      sm: "text-xs px-2 py-1 h-6",
      md: "text-sm px-3 py-1 h-7",
    },
    interactive: {
      true: "cursor-pointer hover:opacity-80",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    interactive: false,
  },
})

export interface CustomTagProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof tagVariants> {
  onRemove?: () => void
  removable?: boolean
  icon?: string
}

const CustomTag = React.forwardRef<HTMLDivElement, CustomTagProps>(
  ({ className, variant, size, interactive, children, onRemove, removable = false, icon, ...props }, ref) => {
    return (
      <div className={cn(tagVariants({ variant, size, interactive }), className)} ref={ref} {...props}>
        {icon && (
          <svg className="w-4 h-4 mr-1">
            <use href={`/sprite.svg#${icon}`} />
          </svg>
        )}
        <span>{children}</span>
        {removable && (
          <button
            type="button"
            className="ml-1 rounded-full hover:bg-opacity-25 hover:bg-black focus:outline-none"
            onClick={(e) => {
              e.stopPropagation()
              onRemove?.()
            }}
            aria-label="Remove tag"
          >
            <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
              <path
                d="M9 3L3 9M3 3L9 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
    )
  },
)
CustomTag.displayName = "CustomTag"

export { CustomTag, tagVariants }
