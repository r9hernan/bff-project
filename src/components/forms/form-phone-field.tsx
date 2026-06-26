'use client'

import type { Control, FieldValues, Path } from 'react-hook-form'
import { FormField } from '@/components/forms/form-field'
import { usePhoneValidation } from '@/components/common/validation-utils'

interface FormPhoneFieldProps<T extends FieldValues = FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  placeholder?: string
  prefix?: string
  required?: boolean
  disabled?: boolean
}

export function FormPhoneField<T extends FieldValues = FieldValues>({
  control,
  name,
  label,
  placeholder = '912345678',
  prefix = '+56',
  required = false,
  disabled = false
}: FormPhoneFieldProps<T>) {
  const phoneValidation = usePhoneValidation()

  return (
    <FormField
      control={control}
      name={name}
      label={label}
      placeholder={placeholder}
      prefix={prefix}
      required={required}
      disabled={disabled}
      rules={phoneValidation}
    />
  )
}
