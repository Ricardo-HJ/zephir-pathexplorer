"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        purple: "bg-[#a100ff] text-white hover:bg-[#a100ff]/90 active:bg-[#a100ff]/80",
        dark: "bg-[#272329] text-white hover:bg-[#272329]/90 active:bg-[#272329]/80",
        white: "bg-white text-[#272329] border border-gray-200 hover:bg-gray-50 active:bg-gray-100",
        red: "bg-[#fe3a44] text-white hover:bg-[#fe3a44]/90 active:bg-[#fe3a44]/80",
        green: "bg-[#00cb07] text-white hover:bg-[#00cb07]/90 active:bg-[#00cb07]/80",
        transparent: "bg-transparent text-[#272329] hover:bg-gray-100 active:bg-gray-200",
      },
      size: {
        sm: "text-[14px] rounded-[4px]",
        md: "text-[21px] rounded-[6px]",
        lg: "text-[26px] rounded-[8px]",
      },
      buttonType: {
        text: "",
        icon: "",
        "text-icon": "",
      },
    },
    compoundVariants: [
      // Text only buttons
      {
        buttonType: "text",
        size: "sm",
        className: "py-[6px] px-[12px]",
      },
      {
        buttonType: "text",
        size: "md",
        className: "py-[9px] px-[18px]",
      },
      {
        buttonType: "text",
        size: "lg",
        className: "py-[10px] px-[24px]",
      },
      // Icon only buttons
      {
        buttonType: "icon",
        size: "sm",
        className: "p-[4px] w-[24px] h-[24px]",
      },
      {
        buttonType: "icon",
        size: "md",
        className: "p-[6px] w-[36px] h-[36px]",
      },
      {
        buttonType: "icon",
        size: "lg",
        className: "p-[8px] w-[46px] h-[46px]",
      },
      // Text and icon buttons
      {
        buttonType: "text-icon",
        size: "sm",
        className: "py-[6px] px-[12px] gap-[8px]",
      },
      {
        buttonType: "text-icon",
        size: "md",
        className: "py-[9px] px-[18px] gap-[12px]",
      },
      {
        buttonType: "text-icon",
        size: "lg",
        className: "py-[12px] px-[24px] gap-[16px]",
      },
    ],
    defaultVariants: {
      variant: "purple",
      size: "md",
      buttonType: "text",
    },
  },
)

// Icon component that uses the SVG sprite system
const Icon = ({
  name,
  size = "md",
  className,
  ...props
}: {
  name: string
  size?: "sm" | "md" | "lg"
  className?: string
} & React.SVGProps<SVGSVGElement>) => {
  const sizeMap = {
    sm: "w-[16px] h-[16px]",
    md: "w-[24px] h-[24px]",
    lg: "w-[30px] h-[30px]",
  }

  return (
    <svg className={cn(sizeMap[size], className)} {...props}>
      <use href={`/sprite.svg#${name}`} />
    </svg>
  )
}

export type ButtonActionType =
  | { type: "button"; onClick?: React.MouseEventHandler<HTMLButtonElement> }
  | { type: "submit" }
  | { type: "reset" }
  | { type: "link"; href: string }
  | { type: "route"; to: string }
  | { type: "function"; handler: () => void }

export interface CustomButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type" | "onClick">,
    VariantProps<typeof buttonVariants> {
  iconName?: string
  iconPosition?: "left" | "right"
  action?: ButtonActionType
  loading?: boolean
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  (
    {
      className,
      variant,
      size,
      buttonType = "text",
      iconName,
      iconPosition = "right",
      children,
      action = { type: "button" },
      loading = false,
      ...props
    },
    ref,
  ) => {
    const router = useRouter()

    // Determine the button type based on children and iconName
    let effectiveButtonType = buttonType
    if (iconName && !children) {
      effectiveButtonType = "icon"
    } else if (iconName && children) {
      effectiveButtonType = "text-icon"
    } else {
      effectiveButtonType = "text"
    }

    // Determine icon color based on variant
    const iconColorClass = variant === "white" || variant === "transparent" ? "text-[#272329]" : "text-white"

    // Common content for all button types
    const buttonContent = (
      <>
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {iconName && iconPosition === "left" && <Icon name={iconName} size={size ?? undefined} className={iconColorClass} />}
        {children}
        {iconName && iconPosition === "right" && <Icon name={iconName} size={size ?? undefined} className={iconColorClass} />}
      </>
    )

    // Handle different action types
    switch (action.type) {
      case "link":
        return (
          <Link
            href={action.href}
            className={cn(buttonVariants({ variant, size, buttonType: effectiveButtonType, className }))}
            {...(props as any)}
          >
            {buttonContent}
          </Link>
        )

      case "route":
        return (
          <button
            className={cn(buttonVariants({ variant, size, buttonType: effectiveButtonType, className }))}
            onClick={() => router.push(action.to)}
            type="button"
            ref={ref}
            {...props}
          >
            {buttonContent}
          </button>
        )

      case "function":
        return (
          <button
            className={cn(buttonVariants({ variant, size, buttonType: effectiveButtonType, className }))}
            onClick={action.handler}
            type="button"
            ref={ref}
            {...props}
          >
            {buttonContent}
          </button>
        )

      case "submit":
        return (
          <button
            className={cn(buttonVariants({ variant, size, buttonType: effectiveButtonType, className }))}
            type="submit"
            ref={ref}
            {...props}
          >
            {buttonContent}
          </button>
        )

      case "reset":
        return (
          <button
            className={cn(buttonVariants({ variant, size, buttonType: effectiveButtonType, className }))}
            type="reset"
            ref={ref}
            {...props}
          >
            {buttonContent}
          </button>
        )

      case "button":
      default:
        return (
          <button
            className={cn(buttonVariants({ variant, size, buttonType: effectiveButtonType, className }))}
            type="button"
            onClick={action.onClick}
            ref={ref}
            {...props}
          >
            {buttonContent}
          </button>
        )
    }
  },
)
CustomButton.displayName = "CustomButton"

export { CustomButton, buttonVariants }
