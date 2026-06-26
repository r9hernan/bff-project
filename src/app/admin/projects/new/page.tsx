'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { FormField } from '@/components/forms/form-field'
import { FormSelect } from '@/components/forms/form-select'
import { FormSection } from '@/components/forms/form-section'
import { FormGrid } from '@/components/forms/form-grid'
import { FileInput } from '@/components/common/file-input'
import { WizardLayout } from '@/components/wizard/wizard-stepper'
import { toast } from 'sonner'
import {
  FileText,
  Image,
  MapPin,
  Building,
  DollarSign,
  CheckCircle,
  Info
} from 'lucide-react'

const WIZARD_STEPS = [
  {
    id: 'basic-info',
    title: 'Informaci\u00f3n B\u00e1sica',
    description: 'Nombre y descripci\u00f3n',
    icon: FileText
  },
  {
    id: 'location',
    title: 'Ubicaci\u00f3n',
    description: 'Direcci\u00f3n y zona',
    icon: MapPin
  },
  {
    id: 'images-step-1',
    title: 'Im\u00e1genes Paso 1',
    description: 'Im\u00e1genes iniciales',
    icon: Image
  },
  {
    id: 'images-step-2',
    title: 'Im\u00e1genes Paso 2',
    description: 'Im\u00e1genes intermedias',
    icon: Image
  },
  {
    id: 'images-step-3',
    title: 'Im\u00e1genes Paso 3',
    description: 'Im\u00e1genes de detalle',
    icon: Image
  },
  {
    id: 'details',
    title: 'Detalles',
    description: 'Caracter\u00edsticas y specs',
    icon: Building
  },
  {
    id: 'pricing',
    title: 'Precios',
    description: 'Valores y condiciones',
    icon: DollarSign
  }
]

const NewProjectPage = () => {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [files1, setFiles1] = useState<File[]>([])
  const [files2, setFiles2] = useState<File[]>([])
  const [files3, setFiles3] = useState<File[]>([])

  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
      address: '',
      zone: '',
      type: '',
      details: '',
      price: ''
    }
  })

  const { control } = form

  const goNext = () => {
    if (currentStep < WIZARD_STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const goPrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    toast.success('Proyecto creado correctamente')
    router.push('/admin/projects')
  }

  const isLastStep = currentStep === WIZARD_STEPS.length - 1

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <FormSection
            title="Informaci\u00f3n B\u00e1sica"
            description="Datos generales del proyecto"
          >
            <FormGrid columns={1}>
              <FormField
                control={control}
                name="name"
                label="Nombre del Proyecto"
                placeholder="Nombre..."
                required
              />
              <FormField
                control={control}
                name="description"
                label="Descripci\u00f3n"
                placeholder="Descripci\u00f3n del proyecto..."
              />
            </FormGrid>
          </FormSection>
        )
      case 1:
        return (
          <FormSection
            title="Ubicaci\u00f3n"
            description="D\u00f3nde se ubica el proyecto"
          >
            <FormGrid columns={2}>
              <FormField
                control={control}
                name="address"
                label="Direcci\u00f3n"
                placeholder="Direcci\u00f3n..."
                required
              />
              <FormField
                control={control}
                name="zone"
                label="Zona / Comuna"
                placeholder="Comuna..."
              />
            </FormGrid>
          </FormSection>
        )
      case 2:
        return (
          <FormSection
            title="Im\u00e1genes - Paso 1"
            description="Carga las im\u00e1genes iniciales del proyecto"
          >
            <FileInput
              id="files-step-1"
              label="Im\u00e1genes"
              selectedFiles={files1}
              onFilesChange={setFiles1}
              acceptedFileTypes={['image/jpeg', 'image/png', 'image/webp']}
              multiple
              maxFiles={10}
            />
          </FormSection>
        )
      case 3:
        return (
          <FormSection
            title="Im\u00e1genes - Paso 2"
            description="Carga las im\u00e1genes intermedias"
          >
            <FileInput
              id="files-step-2"
              label="Im\u00e1genes"
              selectedFiles={files2}
              onFilesChange={setFiles2}
              acceptedFileTypes={['image/jpeg', 'image/png', 'image/webp']}
              multiple
              maxFiles={10}
            />
          </FormSection>
        )
      case 4:
        return (
          <FormSection
            title="Im\u00e1genes - Paso 3"
            description="Carga las im\u00e1genes de detalle"
          >
            <FileInput
              id="files-step-3"
              label="Im\u00e1genes"
              selectedFiles={files3}
              onFilesChange={setFiles3}
              acceptedFileTypes={['image/jpeg', 'image/png', 'image/webp']}
              multiple
              maxFiles={10}
            />
          </FormSection>
        )
      case 5:
        return (
          <FormSection
            title="Detalles"
            description="Caracter\u00edsticas y especificaciones"
          >
            <FormGrid columns={1}>
              <FormSelect
                control={control}
                name="type"
                label="Tipo de Proyecto"
                options={[
                  { value: 'house', label: 'Casa' },
                  { value: 'apartment', label: 'Departamento' },
                  { value: 'office', label: 'Oficina' },
                  { value: 'land', label: 'Terreno' }
                ]}
              />
              <FormField
                control={control}
                name="details"
                label="Detalles Adicionales"
                placeholder="Detalles..."
              />
            </FormGrid>
          </FormSection>
        )
      case 6:
        return (
          <FormSection
            title="Precios"
            description="Valores y condiciones de pago"
          >
            <FormGrid columns={2}>
              <FormField
                control={control}
                name="price"
                label="Precio"
                type="number"
                prefix="$"
                placeholder="0"
                required
              />
            </FormGrid>
          </FormSection>
        )
      default:
        return null
    }
  }

  return (
    <WizardLayout
      steps={WIZARD_STEPS}
      currentStep={currentStep}
      onStepClick={setCurrentStep}
    >
      <div className="space-y-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Info className="h-4 w-4" />
          Paso {currentStep + 1} de {WIZARD_STEPS.length}:{' '}
          {WIZARD_STEPS[currentStep].title}
        </div>

        {renderStepContent()}

        <div className="flex justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={goPrev}
            disabled={currentStep === 0}
          >
            Anterior
          </Button>
          {isLastStep ? (
            <Button onClick={handleSubmit}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Crear Proyecto
            </Button>
          ) : (
            <Button onClick={goNext}>Siguiente</Button>
          )}
        </div>
      </div>
    </WizardLayout>
  )
}

export default NewProjectPage
