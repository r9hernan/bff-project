const NosotrosPage = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Nosotros</h1>
      <div className="prose max-w-none">
        <p className="text-lg text-muted-foreground mb-6">
          Informaci\u00f3n sobre la empresa, su historia y misi\u00f3n.
        </p>
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Nuestra Historia</h2>
          <p className="text-muted-foreground">
            Aqu\u00ed va la historia de la empresa.
          </p>
        </section>
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Nuestro Equipo</h2>
          <p className="text-muted-foreground">
            Informaci\u00f3n sobre el equipo.
          </p>
        </section>
      </div>
    </div>
  )
}

export default NosotrosPage
