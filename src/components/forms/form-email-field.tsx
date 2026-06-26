'use client'

import type { Control, FieldValues, Path } from 'react-hook-form'
import { FormField } from '@/components/forms/form-field'
import { useEmailValidation } from '@/components/common/validation-utils'

interface FormEmailFieldProps<T extends FieldValues = FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
}

export function FormEmailField<T extends FieldValues = FieldValues>({
  control,
  name,
  label,
  placeholder = 'email@ejemplo.com',
  required = false,
  disabled = false
}: FormEmailFieldProps<T>) {
  const emailValidation = useEmailValidation()

  return (
    <FormField
      control={control}
      name={name}
      label={label}
      type="email"
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      rules={emailValidation}
    />
  )
}
