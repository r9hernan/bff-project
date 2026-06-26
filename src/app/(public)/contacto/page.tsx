import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const ContactoPage = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <h1 className="text-4xl font-bold mb-8">Contacto</h1>
      <div className="border rounded-lg p-8">
        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Nombre</label>
              <Input placeholder="Tu nombre" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input type="email" placeholder="tu@email.com" className="mt-1" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Asunto</label>
            <Input placeholder="Asunto del mensaje" className="mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium">Mensaje</label>
            <Textarea
              placeholder="Escribe tu mensaje..."
              className="mt-1 min-h-[120px]"
            />
          </div>
          <Button type="submit">Enviar Mensaje</Button>
        </form>
      </div>
    </div>
  )
}

export default ContactoPage
