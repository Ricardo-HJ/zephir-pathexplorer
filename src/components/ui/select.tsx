"use client"

import React, { useState, useRef, useEffect, useId } from "react"
import { cn } from "@/lib/utils"
import { inputLabelVariants, inputVariants, inputWrapperVariants } from "./input"

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectGroup {
  label: string
  options: SelectOption[]
}

export type SelectOptions = SelectOption[] | SelectGroup[]

export interface CustomSelectProps {
  options: SelectOptions
  value?: string | string[]
  onChange?: (value: string | string[]) => void
  label?: string
  placeholder?: string
  error?: string
  disabled?: boolean
  required?: boolean
  multiple?: boolean
  fullWidth?: boolean
  wrapperClassName?: string
  labelClassName?: string
  selectClassName?: string
  errorClassName?: string
  id?: string
}

const isGroup = (option: SelectOption | SelectGroup): option is SelectGroup => {
  return (option as SelectGroup).options !== undefined
}

const CustomSelect = React.forwardRef<HTMLDivElement, CustomSelectProps>(
  (
    {
      options,
      value,
      onChange,
      label,
      placeholder = "Select an option",
      error,
      disabled,
      required,
      multiple = false,
      fullWidth = true,
      wrapperClassName,
      labelClassName,
      selectClassName,
      errorClassName,
      id,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedValues, setSelectedValues] = useState<string[]>(
      multiple ? (Array.isArray(value) ? value.map(String) : value ? [String(value)] : []) : value ? [String(value)] : [],
    )
    const dropdownRef = useRef<HTMLDivElement>(null)
    const inputId = useId()
    const finalId = id || inputId

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false)
        }
      }

      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [])

    // Update internal state when value prop changes
    useEffect(() => {
      if (multiple) {
        setSelectedValues(Array.isArray(value) ? value : value ? [value] : [])
      } else {
        setSelectedValues(value ? (Array.isArray(value) ? value : [value]) : [])
      }
    }, [value, multiple])

    const toggleDropdown = () => {
      if (!disabled) {
        setIsOpen(!isOpen)
      }
    }

    const handleOptionClick = (optionValue: string) => {
      let newValues: string[]

      if (multiple) {
        if (selectedValues.includes(optionValue)) {
          newValues = selectedValues.filter((val) => val !== optionValue)
        } else {
          newValues = [...selectedValues, optionValue]
        }
      } else {
        newValues = [optionValue]
        setIsOpen(false)
      }

      setSelectedValues(newValues)

      if (onChange) {
        onChange(multiple ? newValues : newValues[0])
      }
    }

    // Get display text for selected values
    const getDisplayText = () => {
      if (selectedValues.length === 0) {
        return placeholder
      }

      const selectedLabels: string[] = []

      const findLabel = (options: SelectOptions) => {
        options.forEach((option) => {
          if (isGroup(option)) {
            findLabel(option.options)
          } else if (selectedValues.includes(option.value)) {
            selectedLabels.push(option.label)
          }
        })
      }

      findLabel(options)

      return selectedLabels.join(", ")
    }

    return (
      <div className={cn(inputWrapperVariants({ fullWidth }), wrapperClassName)} ref={ref}>
        {label && (
          <label htmlFor={finalId} className={cn(inputLabelVariants({ error: !!error, disabled }), labelClassName)}>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative" ref={dropdownRef}>
          <div
            id={finalId}
            className={cn(inputVariants({ error: !!error }), "cursor-pointer select-none pr-12", selectClassName)}
            onClick={toggleDropdown}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-disabled={disabled}
            role="combobox"
            tabIndex={disabled ? -1 : 0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                toggleDropdown()
              } else if (e.key === "Escape" && isOpen) {
                setIsOpen(false)
              }
            }}
          >
            <div className={cn(selectedValues.length === 0 && "text-gray-400")}>{getDisplayText()}</div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                className={cn("w-[24px] h-[24px] text-gray-500 transition-transform", isOpen && "transform rotate-180")}
              >
                <use href="/sprite.svg#icon-chevron-down" />
              </svg>
            </div>
          </div>

          {isOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white rounded-[9px] border border-gray-300 shadow-lg max-h-60 overflow-auto">
              <ul role="listbox" aria-multiselectable={multiple}>
                {options.map((option, index) => {
                  if (isGroup(option)) {
                    return (
                      <li key={index} className="group">
                        <div className="px-4 py-2 font-medium text-[14px] text-gray-500 bg-gray-50">{option.label}</div>
                        <ul>
                          {option.options.map((groupOption, groupIndex) => (
                            <li
                              key={`${index}-${groupIndex}`}
                              role="option"
                              aria-selected={selectedValues.includes(groupOption.value)}
                              className={cn(
                                "px-4 py-3 text-[14px] cursor-pointer hover:bg-gray-100",
                                selectedValues.includes(groupOption.value) && "bg-[#9747ff]/10",
                                groupOption.disabled && "opacity-50 cursor-not-allowed",
                              )}
                              onClick={() => {
                                if (!groupOption.disabled) {
                                  handleOptionClick(groupOption.value)
                                }
                              }}
                            >
                              <div className="flex items-center">
                                {multiple && (
                                  <div
                                    className={cn(
                                      "w-5 h-5 mr-3 border rounded flex items-center justify-center",
                                      selectedValues.includes(groupOption.value)
                                        ? "bg-[#9747ff] border-[#9747ff]"
                                        : "border-gray-300",
                                    )}
                                  >
                                    {selectedValues.includes(groupOption.value) && (
                                      <svg
                                        className="w-3 h-3 text-white"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M10 3L4.5 8.5L2 6"
                                          stroke="currentColor"
                                          strokeWidth="2"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    )}
                                  </div>
                                )}
                                {groupOption.label}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </li>
                    )
                  } else {
                    return (
                      <li
                        key={index}
                        role="option"
                        aria-selected={selectedValues.includes(option.value)}
                        className={cn(
                          "px-4 py-3 text-[14px] cursor-pointer hover:bg-gray-100",
                          selectedValues.includes(option.value) && "bg-[#9747ff]/10",
                          option.disabled && "opacity-50 cursor-not-allowed",
                        )}
                        onClick={() => {
                          if (!option.disabled) {
                            handleOptionClick(option.value)
                          }
                        }}
                      >
                        <div className="flex items-center">
                          {multiple && (
                            <div
                              className={cn(
                                "w-5 h-5 mr-3 border rounded flex items-center justify-center",
                                selectedValues.includes(option.value)
                                  ? "bg-[#9747ff] border-[#9747ff]"
                                  : "border-gray-300",
                              )}
                            >
                              {selectedValues.includes(option.value) && (
                                <svg
                                  className="w-3 h-3 text-white"
                                  viewBox="0 0 12 12"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M10 3L4.5 8.5L2 6"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              )}
                            </div>
                          )}
                          {option.label}
                        </div>
                      </li>
                    )
                  }
                })}
              </ul>
            </div>
          )}
        </div>
        {error && <p className={cn("mt-2 text-sm text-red-500", errorClassName)}>{error}</p>}
      </div>
    )
  },
)
CustomSelect.displayName = "CustomSelect"

export { CustomSelect }
