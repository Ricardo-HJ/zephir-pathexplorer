"use client"

import React, { useState } from "react"
import { CustomInput, type CustomInputProps } from "./input"

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
    />
  )
})
CustomPasswordInput.displayName = "CustomPasswordInput"

export { CustomPasswordInput }
