import Link from 'next/link'
import { Button } from '@/components/ui/button'

const PublicHeader = () => {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold">
          Mi Empresa
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/nosotros"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Nosotros
          </Link>
          <Link
            href="/servicios"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Servicios
          </Link>
          <Link
            href="/contacto"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Contacto
          </Link>
          <Link href="/login">
            <Button variant="outline" size="sm">
              Iniciar Sesi\u00f3n
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}

const PublicFooter = () => {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">Mi Empresa</h3>
            <p className="text-sm text-muted-foreground">
              Descripci\u00f3n breve de la empresa.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Enlaces</h4>
            <nav className="space-y-1">
              <Link
                href="/nosotros"
                className="block text-sm text-muted-foreground hover:text-foreground"
              >
                Nosotros
              </Link>
              <Link
                href="/servicios"
                className="block text-sm text-muted-foreground hover:text-foreground"
              >
                Servicios
              </Link>
              <Link
                href="/contacto"
                className="block text-sm text-muted-foreground hover:text-foreground"
              >
                Contacto
              </Link>
            </nav>
          </div>
          <div>
            <h4 className="font-medium mb-2">Contacto</h4>
            <p className="text-sm text-muted-foreground">
              Santiago, Chile
            </p>
            <p className="text-sm text-muted-foreground">
              info@miempresa.cl
            </p>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Mi Empresa. Todos los derechos
          reservados.
        </div>
      </div>
    </footer>
  )
}

export { PublicHeader, PublicFooter }
