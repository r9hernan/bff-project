'use client'

import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

interface AdminErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function AdminError({ error, reset }: AdminErrorProps) {
  console.error(error)

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <div className="flex items-center gap-3 mb-4">
        <AlertTriangle className="h-12 w-12 text-destructive" />
        <h2 className="text-2xl font-semibold">Error en el panel</h2>
      </div>
      <p className="text-muted-foreground mb-6 text-center max-w-md">
        Ocurrió un error al cargar el panel de administración.
      </p>
      <div className="flex gap-3">
        <Button onClick={reset} variant="default">
          Intentar nuevamente
        </Button>
        <Button onClick={() => { window.location.href = '/' }} variant="outline">
          Ir al inicio
        </Button>
      </div>
    </div>
  )
}
