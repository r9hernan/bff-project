'use client'

import type { Control, FieldValues, Path, RegisterOptions } from 'react-hook-form'
import {
  FormControl,
  FormField as FormFieldPrimitive,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface FormFieldProps<T extends FieldValues = FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  placeholder?: string
  type?: string
  prefix?: string
  required?: boolean
  showRequired?: boolean
  className?: string
  disabled?: boolean
  min?: number | string
  max?: number | string
  step?: number
  rules?: RegisterOptions<T>
}

export const FormField = <T extends FieldValues = FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = 'text',
  prefix,
  required,
  className,
  disabled = false,
  showRequired = true,
  min,
  max,
  step,
  rules
}: FormFieldProps<T>) => {
  return (
    <FormFieldPrimitive
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            {required && showRequired && (
              <span className="text-red-500 ml-1">*</span>
            )}
          </FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              prefix={prefix}
              className={cn(className)}
              disabled={disabled}
              min={min}
              max={max}
              step={step}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
