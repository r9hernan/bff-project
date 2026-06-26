import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { resetPasswordSchema } from '@/lib/validations/auth.schemas'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validation = resetPasswordSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      )
    }

    // TODO: Implement reset password logic

    return NextResponse.json({ message: 'Contraseña actualizada' })
  } catch {
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
