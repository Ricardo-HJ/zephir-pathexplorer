"use client"

import React, { useId } from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { getIconByName } from "@/components/ui/icons"

const inputWrapperVariants = cva("flex flex-col w-full", {
  variants: {
    fullWidth: {
      true: "w-full",
      false: "w-auto",
    },
  },
  defaultVariants: {
    fullWidth: true,
  },
})

const inputLabelVariants = cva("text-[16px] font-medium text-[#272329] mb-2", {
  variants: {
    error: {
      true: "text-red-500",
      false: "",
    },
    disabled: {
      true: "text-gray-400",
      false: "",
    },
  },
  defaultVariants: {
    error: false,
    disabled: false,
  },
})

const inputVariants = cva(
  "flex items-center w-full rounded-[9px] border border-gray-300 bg-white px-4 py-[16px] text-[14px] text-[#272329] transition-colors placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9747ff] disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      error: {
        true: "border-red-500 focus-visible:ring-red-500",
        false: "",
      },
    },
    defaultVariants: {
      error: false,
    },
  },
)

export interface CustomInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string
  error?: string
  iconLeft?: string
  iconRight?: string
  onIconLeftClick?: () => void
  onIconRightClick?: () => void
  fullWidth?: boolean
  wrapperClassName?: string
  labelClassName?: string
  inputClassName?: string
  errorClassName?: string
  renderIconRight?: () => React.ReactNode
  renderIconLeft?: () => React.ReactNode
}

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  (
    {
      label,
      error,
      iconLeft,
      iconRight,
      onIconLeftClick,
      onIconRightClick,
      fullWidth = true,
      className,
      wrapperClassName,
      labelClassName,
      inputClassName,
      errorClassName,
      id,
      disabled,
      renderIconRight,
      renderIconLeft,
      ...props
    },
    ref,
  ) => {
    const inputId = useId()
    const finalId = id || inputId

    // Get icon components
    const IconLeft = iconLeft ? getIconByName(iconLeft) : null
    const IconRight = iconRight ? getIconByName(iconRight) : null

    return (
      <div className={cn(inputWrapperVariants({ fullWidth }), wrapperClassName)}>
        {label && (
          <label htmlFor={finalId} className={cn(inputLabelVariants({ error: !!error, disabled }), labelClassName)}>
            {label}
          </label>
        )}
        <div className="relative">
          {iconLeft && (
            <div
              className={cn("absolute left-4 top-1/2 -translate-y-1/2", onIconLeftClick && "cursor-pointer")}
              onClick={onIconLeftClick}
            >
              {renderIconLeft ? renderIconLeft() : IconLeft ? <IconLeft className="text-gray-500" /> : null}
            </div>
          )}
          <input
            id={finalId}
            className={cn(inputVariants({ error: !!error }), iconLeft && "pl-12", iconRight && "pr-12", inputClassName)}
            disabled={disabled}
            ref={ref}
            {...props}
          />
          {iconRight && (
            <div
              className={cn("absolute right-4 top-1/2 -translate-y-1/2", onIconRightClick && "cursor-pointer")}
              onClick={onIconRightClick}
            >
              {renderIconRight ? renderIconRight() : IconRight ? <IconRight className="text-gray-500" /> : null}
            </div>
          )}
        </div>
        {error && <p className={cn("mt-2 text-sm text-red-500", errorClassName)}>{error}</p>}
      </div>
    )
  },
)
CustomInput.displayName = "CustomInput"

export { CustomInput, inputVariants, inputLabelVariants, inputWrapperVariants }
