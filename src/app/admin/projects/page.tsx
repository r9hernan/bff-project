import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

const ProjectsListPage = () => {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Proyectos</h1>
        <Link href="/admin/projects/new">
          <Button>Crear Proyecto</Button>
        </Link>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Sin proyectos</CardTitle>
            <CardDescription>
              Crea tu primer proyecto para comenzar.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/projects/new">
              <Button variant="outline">Crear Proyecto</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ProjectsListPage
