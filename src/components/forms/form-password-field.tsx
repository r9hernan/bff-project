'use client'

import type { Control, FieldValues, Path } from 'react-hook-form'
import {
  FormControl,
  FormField as FormFieldPrimitive,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  PasswordField,
  usePasswordValidation
} from '@/components/common/password-field'

interface FormPasswordFieldProps<T extends FieldValues = FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  required?: boolean
}

export function FormPasswordField<T extends FieldValues = FieldValues>({
  control,
  name,
  label,
  required = false
}: FormPasswordFieldProps<T>) {
  const passwordValidation = usePasswordValidation()

  return (
    <FormFieldPrimitive
      control={control}
      name={name}
      rules={passwordValidation}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </FormLabel>
          <FormControl>
            <PasswordField
              id={name}
              label=""
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
              error={undefined}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
