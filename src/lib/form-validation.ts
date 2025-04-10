export type ValidationRule = {
    required?: boolean | string
    minLength?: { value: number; message: string }
    maxLength?: { value: number; message: string }
    pattern?: { value: RegExp; message: string }
    validate?: (value: any) => string | boolean | undefined
  }
  
  export type ValidationRules = Record<string, ValidationRule>
  
  export function validateForm(values: Record<string, any>, rules: ValidationRules): Record<string, string> {
    const errors: Record<string, string> = {}
  
    Object.entries(rules).forEach(([fieldName, fieldRules]) => {
      const value = values[fieldName]
  
      // Required validation
      if (fieldRules.required) {
        const isEmptyValue = value === undefined || value === null || value === ""
        const isEmptyArray = Array.isArray(value) && value.length === 0
  
        if (isEmptyValue || isEmptyArray) {
          errors[fieldName] = typeof fieldRules.required === "string" ? fieldRules.required : `${fieldName} is required`
          return // Skip other validations if required fails
        }
      }
  
      // Skip other validations if value is empty and not required
      if (value === undefined || value === null || value === "") {
        return
      }
  
      // Min length validation
      if (fieldRules.minLength && typeof value === "string" && value.length < fieldRules.minLength.value) {
        errors[fieldName] = fieldRules.minLength.message
      }
  
      // Max length validation
      if (fieldRules.maxLength && typeof value === "string" && value.length > fieldRules.maxLength.value) {
        errors[fieldName] = fieldRules.maxLength.message
      }
  
      // Pattern validation
      if (fieldRules.pattern && typeof value === "string" && !fieldRules.pattern.value.test(value)) {
        errors[fieldName] = fieldRules.pattern.message
      }
  
      // Custom validation
      if (fieldRules.validate) {
        const result = fieldRules.validate(value)
        if (typeof result === "string") {
          errors[fieldName] = result
        } else if (result === false) {
          errors[fieldName] = `${fieldName} is invalid`
        }
      }
    })
  
    return errors
  }
  