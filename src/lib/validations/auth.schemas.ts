import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Password es requerido')
})

export const forgotPasswordSchema = z.object({
  email: z.string().email('Email inválido')
})

export const resetPasswordSchema = z.object({
  email: z.string().email('Email inválido'),
  newPassword: z.string().min(8, 'Mínimo 8 caracteres'),
  confirmationCode: z.string().min(1, 'Código es requerido')
})

export type LoginInput = z.infer<typeof loginSchema>
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>
