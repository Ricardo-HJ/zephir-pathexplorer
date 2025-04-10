"use client"

import React, { useState, useRef, useCallback } from "react"
import { CustomInput, type CustomInputProps } from "./input"
import { debounce } from "@/lib/utils"
import { SearchIcon, XIcon } from "@/components/ui/icons"

export interface CustomSearchbarProps extends Omit<CustomInputProps, "onChange"> {
  onSearch?: (searchTerm: string) => void
  minChars?: number
  debounceTime?: number
}

const CustomSearchbar = React.forwardRef<HTMLInputElement, CustomSearchbarProps>(
  (
    { onSearch, minChars = 3, debounceTime = 300, iconLeft = "icon-search", placeholder = "Search...", ...props },
    ref,
  ) => {
    const [searchTerm, setSearchTerm] = useState("")
    const inputRef = useRef<HTMLInputElement>(null)

    // Create a debounced search function
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSearch = useCallback(
      debounce((term: string) => {
        if (term.length >= minChars && onSearch) {
          onSearch(term)
        }
      }, debounceTime),
      [onSearch, minChars, debounceTime],
    )

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setSearchTerm(value)

      if (value.length >= minChars) {
        debouncedSearch(value)
      }
    }

    const handleClear = () => {
      setSearchTerm("")
      if (inputRef.current) {
        inputRef.current.focus()
      }
      if (onSearch) {
        onSearch("")
      }
    }

    // Merge refs
    const handleRef = (element: HTMLInputElement) => {
      // Update the inputRef
      inputRef.current = element

      // Forward the ref
      if (typeof ref === "function") {
        ref(element)
      } else if (ref) {
        ref.current = element
      }
    }

    return (
      <CustomInput
        ref={handleRef}
        type="search"
        value={searchTerm}
        onChange={handleChange}
        iconLeft={iconLeft}
        iconRight={searchTerm ? "icon-x" : undefined}
        onIconRightClick={searchTerm ? handleClear : undefined}
        placeholder={placeholder}
        renderIconLeft={() => <SearchIcon className="text-gray-500" />}
        renderIconRight={searchTerm ? () => <XIcon className="text-gray-500" /> : undefined}
        {...props}
      />
    )
  },
)
CustomSearchbar.displayName = "CustomSearchbar"

export { CustomSearchbar }
