'use client'

import type { Control, FieldValues, Path } from 'react-hook-form'
import {
  FormControl,
  FormField as FormFieldPrimitive,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { formatRutInput, validateRut, cleanRut } from '@/utils/rut.util'
import { useState, useEffect } from 'react'

interface RutFieldInnerProps {
  field: {
    value: string
    onChange: (value: string) => void
    onBlur: () => void
    name: string
  }
  label: string
  placeholder: string
  required: boolean
  disabled: boolean
}

const RutFieldInner = ({
  field,
  label,
  placeholder,
  required,
  disabled
}: RutFieldInnerProps) => {
  const [formattedRut, setFormattedRut] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (field.value) {
      const formatted = formatRutInput(field.value)
      setFormattedRut(formatted)

      const clean = cleanRut(field.value)
      if (clean.length >= 8 && !validateRut(clean)) {
        setError('El RUT no es v\u00e1lido')
      } else {
        setError(null)
      }
    } else {
      setFormattedRut('')
      setError(null)
    }
  }, [field.value])

  const handleChange = (inputValue: string) => {
    const formatted = formatRutInput(inputValue)
    setFormattedRut(formatted)
    field.onChange(formatted)

    const clean = cleanRut(inputValue)
    if (clean.length >= 8 && !validateRut(clean)) {
      setError('El RUT no es v\u00e1lido')
    } else {
      setError(null)
    }
  }

  return (
    <FormItem>
      <FormLabel>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </FormLabel>
      <FormControl>
        <Input
          id={field.name}
          type="text"
          value={formattedRut}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={field.onBlur}
          name={field.name}
          placeholder={placeholder}
          className={cn(error ? 'border-red-500' : '')}
          disabled={disabled}
        />
      </FormControl>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <FormMessage />
    </FormItem>
  )
}

interface FormRutFieldProps<T extends FieldValues = FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
}

export function FormRutField<T extends FieldValues = FieldValues>({
  control,
  name,
  label,
  placeholder = '12.345.678-9',
  required = false,
  disabled = false
}: FormRutFieldProps<T>) {
  return (
    <FormFieldPrimitive
      control={control}
      name={name}
      rules={{
        required: 'El RUT es requerido',
        validate: {
          valid: (value: string | undefined) => {
            if (!value) {return true}
            const clean = cleanRut(value)
            if (clean.length >= 8) {
              return validateRut(clean) || 'El RUT no es v\u00e1lido'
            }
            return true
          }
        }
      }}
      render={({ field }) => (
        <RutFieldInner
          field={field}
          label={label}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
        />
      )}
    />
  )
}
