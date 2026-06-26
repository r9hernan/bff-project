const ProjectDetailPage = async ({
  params
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">
        Proyecto #{id}
      </h1>
      <p className="text-muted-foreground">
        Vista de detalle del proyecto.
      </p>
    </div>
  )
}

export default ProjectDetailPage
