'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang="es">
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-background">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="h-12 w-12 text-destructive" />
            <h2 className="text-2xl font-semibold">Error crítico</h2>
          </div>
          <p className="text-muted-foreground mb-6 text-center max-w-md">
            Ocurrió un error grave en la aplicación.
          </p>
          <div className="flex gap-3">
            <Button onClick={reset} variant="default">
              Recargar página
            </Button>
            <Button onClick={() => { window.location.href = '/' }} variant="outline">
              Ir al inicio
            </Button>
          </div>
        </div>
      </body>
    </html>
  )
}
