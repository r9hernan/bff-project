import { PrismaClient } from '../generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'
import 'dotenv/config'

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  const admin = await prisma.profile.upsert({
    where: { email: 'admin@demo.com' },
    update: {},
    create: {
      email: 'admin@demo.com',
      name: 'Admin',
      lastName: 'Demo',
      role: 'admin'
    }
  })

  const operator = await prisma.profile.upsert({
    where: { email: 'operator@demo.com' },
    update: {},
    create: {
      email: 'operator@demo.com',
      name: 'Operador',
      lastName: 'Demo',
      role: 'operator'
    }
  })

  await prisma.projectType.create({
    data: {
      name: 'Casa',
      description: 'Proyectos de vivienda individual',
      stages: {
        create: [
          { order: 1, name: 'Cargar fotografías', description: 'Subir fotos requeridas' },
          { order: 2, name: 'Documentación', description: 'Adjuntar documentos' },
          { order: 3, name: 'Aprobación', description: 'Revisión y aprobación final' }
        ]
      },
      photoSlots: {
        create: [
          { position: 1, name: 'Piso' },
          { position: 2, name: 'Techo' },
          { position: 3, name: 'Inversor' }
        ]
      },
      documentSlots: {
        create: [
          { position: 1, name: 'Permiso de edificación', acceptedTypes: '.pdf,.jpg,.png' },
          { position: 2, name: 'Certificado de carga', acceptedTypes: '.pdf' }
        ]
      }
    }
  })

  await prisma.projectType.create({
    data: {
      name: 'Departamento',
      description: 'Proyectos de departamentos',
      stages: {
        create: [
          { order: 1, name: 'Cargar fotografías', description: 'Subir fotos requeridas' },
          { order: 2, name: 'Aprobación', description: 'Revisión y aprobación final' }
        ]
      },
      photoSlots: {
        create: [
          { position: 1, name: 'Piso' },
          { position: 2, name: 'Techo' }
        ]
      },
      documentSlots: {
        create: [
          { position: 1, name: 'Reglamento de copia', acceptedTypes: '.pdf' }
        ]
      }
    }
  })

  console.log('Seed completado:', { admin: admin.email, operator: operator.email })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
