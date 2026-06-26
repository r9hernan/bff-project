import { Button } from '@/components/ui/button'
import Link from 'next/link'

const HomePage = () => {
  return (
    <div>
      <section className="py-20 px-4 text-center">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
            Bienvenido a Mi Empresa
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Descripci\u00f3n principal de tu empresa y lo que ofreces.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/servicios">
              <Button size="lg">Nuestros Servicios</Button>
            </Link>
            <Link href="/contacto">
              <Button variant="outline" size="lg">
                Cont\u00e1ctanos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nuestros Servicios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-background rounded-lg border p-6 text-center"
              >
                <div className="h-12 w-12 bg-primary/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">
                    {i}
                  </span>
                </div>
                <h3 className="font-semibold mb-2">Servicio {i}</h3>
                <p className="text-sm text-muted-foreground">
                  Descripci\u00f3n del servicio.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
