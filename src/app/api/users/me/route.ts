import type { NextRequest} from 'next/server'
import { NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    // TODO: Replace with actual user lookup
    // e.g., decode token, fetch from database, etc.

    return NextResponse.json({
      id: '1',
      email: 'admin@example.com',
      name: 'Admin',
      lastName: 'User',
      role: 'admin'
    })
  } catch {
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
