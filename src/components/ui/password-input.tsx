"use client"

import React, { useState } from "react"
import { CustomInput, type CustomInputProps } from "./input"
import { EyeIcon, EyeOffIcon } from "@/components/ui/icons"

export interface CustomPasswordInputProps extends CustomInputProps {}

const CustomPasswordInput = React.forwardRef<HTMLInputElement, CustomPasswordInputProps>((props, ref) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <CustomInput
      type={showPassword ? "text" : "password"}
      iconRight={showPassword ? "icon-eye-off" : "icon-eye"}
      ref={ref}
      {...props}
      onIconRightClick={togglePasswordVisibility}
      renderIconRight={() =>
        showPassword ? <EyeOffIcon className="text-gray-500" /> : <EyeIcon className="text-gray-500" />
      }
    />
  )
})
CustomPasswordInput.displayName = "CustomPasswordInput"

export { CustomPasswordInput }
