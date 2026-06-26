'use client'

import { useState } from 'react'
import type { FieldError } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff } from 'lucide-react'

interface PasswordFieldProps {
  id: string
  label: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  onBlur?: () => void
  name?: string
  error?: FieldError
  required?: boolean
}

export const PasswordField = ({
  id,
  label,
  placeholder = 'M\u00ednimo 8 caracteres, 1 may\u00fascula, 1 min\u00fascula, 1 n\u00famero y 1 s\u00edmbolo',
  value,
  onChange,
  onBlur,
  name,
  error
}: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onBlur={onBlur}
          name={name}
          placeholder={placeholder}
          className="pr-10"
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setShowPassword(!showPassword)}
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4 text-gray-500" />
          ) : (
            <Eye className="h-4 w-4 text-gray-500" />
          )}
        </Button>
      </div>
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  )
}

export const usePasswordValidation = () => {
  return {
    required: 'La contrase\u00f1a es requerida',
    minLength: {
      value: 8,
      message: 'La contrase\u00f1a debe tener al menos 8 caracteres'
    },
    validate: {
      hasUppercase: (value: string) =>
        /[A-Z]/.test(value)
        || 'La contrase\u00f1a debe contener al menos una may\u00fascula',
      hasLowercase: (value: string) =>
        /[a-z]/.test(value)
        || 'La contrase\u00f1a debe contener al menos una min\u00fascula',
      hasNumber: (value: string) =>
        /[0-9]/.test(value)
        || 'La contrase\u00f1a debe contener al menos un n\u00famero',
      hasSymbol: (value: string) =>
        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)
        || 'La contrase\u00f1a debe contener al menos un s\u00edmbolo'
    }
  }
}
