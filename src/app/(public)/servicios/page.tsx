const ServiciosPage = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Servicios</h1>
      <div className="grid gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Servicio {i}</h2>
            <p className="text-muted-foreground">
              Descripci\u00f3n detallada del servicio.
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ServiciosPage
