import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FileQuestion } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <div className="flex items-center gap-3 mb-4">
        <FileQuestion className="h-12 w-12 text-muted-foreground" />
        <h2 className="text-2xl font-semibold">Página no encontrada</h2>
      </div>
      <p className="text-muted-foreground mb-6 text-center max-w-md">
        La página que buscas no existe o fue movida.
      </p>
      <div className="flex gap-3">
        <Button asChild variant="default">
          <Link href="/">Ir al inicio</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/admin">Ir al panel</Link>
        </Button>
      </div>
    </div>
  )
}
