import type { NextRequest} from 'next/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // TODO: Replace with actual project fetching logic
    return NextResponse.json({ data: [], total: 0, page: 1, pageSize: 10 })
  } catch {
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // TODO: Replace with actual project creation logic
    // e.g., validate, save to database, upload images, etc.

    return NextResponse.json(
      {
        data: { id: '1', ...body },
        message: 'Proyecto creado correctamente'
      },
      { status: 201 }
    )
  } catch {
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
