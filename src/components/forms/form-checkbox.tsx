'use client'

import type { Control, FieldValues, Path } from 'react-hook-form'
import {
  FormControl,
  FormField as FormFieldPrimitive,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { cn } from '@/lib/utils'

interface FormCheckboxProps<T extends FieldValues = FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  required?: boolean
  className?: string
  disabled?: boolean
}

export function FormCheckbox<T extends FieldValues = FieldValues>({
  control,
  name,
  label,
  required = false,
  className,
  disabled = false
}: FormCheckboxProps<T>) {
  return (
    <FormFieldPrimitive
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
          <FormControl>
            <input
              type="checkbox"
              disabled={disabled}
              checked={field.value}
              onChange={field.onChange}
              className={cn(
                'h-4 w-4 rounded border border-input bg-white text-white focus:ring-2 cursor-pointer',
                className
              )}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel className="text-sm font-medium">
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </FormLabel>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
