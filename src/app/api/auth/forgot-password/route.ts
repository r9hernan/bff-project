import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { forgotPasswordSchema } from '@/lib/validations/auth.schemas'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validation = forgotPasswordSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      )
    }

    // TODO: Implement forgot password logic
    // e.g., send reset email, generate token, etc.

    return NextResponse.json({ message: 'Email enviado correctamente' })
  } catch {
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
