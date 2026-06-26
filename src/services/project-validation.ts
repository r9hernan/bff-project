import { prisma } from '@/lib/prisma'

interface StageValidationResult {
  canAdvance: boolean
  missing: string[]
}

export async function canAdvanceStage(projectId: string): Promise<StageValidationResult> {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      projectType: {
        include: {
          stages: { orderBy: { order: 'asc' } },
          photoSlots: { where: { required: true } },
          documentSlots: { where: { required: true } }
        }
      },
      currentStage: true,
      photos: true,
      documents: true
    }
  })

  if (!project) {
    throw new Error('Proyecto no encontrado')
  }

  if (!project.currentStage) {
    return { canAdvance: true, missing: [] }
  }

  const missing: string[] = []
  const stageName = project.currentStage.name.toLowerCase()

  if (stageName.includes('fotograf') || stageName.includes('foto')) {
    for (const slot of project.projectType.photoSlots) {
      const hasPhoto = project.photos.some(p => p.slotId === slot.id)
      if (!hasPhoto) {
        missing.push(`Foto: ${slot.name}`)
      }
    }
  }

  if (stageName.includes('documento')) {
    for (const slot of project.projectType.documentSlots) {
      const hasDoc = project.documents.some(d => d.slotId === slot.id)
      if (!hasDoc) {
        missing.push(`Documento: ${slot.name}`)
      }
    }
  }

  return {
    canAdvance: missing.length === 0,
    missing
  }
}

export async function advanceStage(projectId: string) {
  const { canAdvance, missing } = await canAdvanceStage(projectId)

  if (!canAdvance) {
    throw new Error(`No se puede avanzar. Faltan: ${missing.join(', ')}`)
  }

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      projectType: {
        include: {
          stages: { orderBy: { order: 'asc' } }
        }
      },
      currentStage: true
    }
  })

  if (!project) {
    throw new Error('Proyecto no encontrado')
  }

  const currentOrder = project.currentStage?.order ?? 0
  const nextStage = project.projectType.stages.find(s => s.order === currentOrder + 1)

  if (!nextStage) {
    throw new Error('No hay más etapas disponibles')
  }

  const updated = await prisma.project.update({
    where: { id: projectId },
    data: { currentStageId: nextStage.id },
    include: {
      currentStage: true
    }
  })

  return updated.currentStage
}

export async function getProjectStageInfo(projectId: string) {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      projectType: {
        include: {
          stages: { orderBy: { order: 'asc' } },
          photoSlots: { orderBy: { position: 'asc' } },
          documentSlots: { orderBy: { position: 'asc' } }
        }
      },
      currentStage: true,
      photos: {
        include: { slot: true }
      },
      documents: {
        include: { slot: true }
      }
    }
  })

  if (!project) {
    throw new Error('Proyecto no encontrado')
  }

  const totalStages = project.projectType.stages.length
  const currentStageNumber = project.currentStage?.order ?? 0
  const progress = totalStages > 0 ? (currentStageNumber / totalStages) * 100 : 0

  const photoSlotsStatus = project.projectType.photoSlots.map(slot => ({
    ...slot,
    completed: project.photos.some(p => p.slotId === slot.id),
    photo: project.photos.find(p => p.slotId === slot.id) ?? null
  }))

  const documentSlotsStatus = project.projectType.documentSlots.map(slot => ({
    ...slot,
    completed: project.documents.some(d => d.slotId === slot.id),
    document: project.documents.find(d => d.slotId === slot.id) ?? null
  }))

  return {
    project,
    totalStages,
    currentStageNumber,
    progress,
    photoSlotsStatus,
    documentSlotsStatus
  }
}
