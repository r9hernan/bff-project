'use client'

import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface WizardStep {
  id: string
  title: string
  description?: string
  icon?: React.ComponentType<{ className?: string }>
}

interface WizardStepperProps {
  steps: WizardStep[]
  currentStep: number
  onStepClick?: (stepIndex: number) => void
  className?: string
}

export function WizardStepper({
  steps,
  currentStep,
  onStepClick,
  className
}: WizardStepperProps) {
  return (
    <nav className={cn('space-y-1', className)}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep
        const isCurrent = index === currentStep
        const isUpcoming = index > currentStep

        const StepIcon = step.icon

        return (
          <button
            key={step.id}
            type="button"
            onClick={() => onStepClick?.(index)}
            disabled={!onStepClick}
            className={cn(
              'flex items-center gap-3 w-full px-4 py-3 rounded-md text-left transition-colors',
              isCurrent && 'bg-primary text-primary-foreground',
              isCompleted && 'bg-muted hover:bg-muted/80',
              isUpcoming && 'opacity-50 hover:opacity-70',
              onStepClick && 'cursor-pointer',
              !onStepClick && 'cursor-default'
            )}
          >
            <div
              className={cn(
                'flex items-center justify-center h-8 w-8 rounded-full text-sm font-medium flex-shrink-0',
                isCurrent && 'bg-primary-foreground text-primary',
                isCompleted && 'bg-green-500 text-white',
                isUpcoming && 'bg-muted-foreground/20 text-muted-foreground'
              )}
            >
              {isCompleted ? (
                <span>{'\u2713'}</span>
              ) : StepIcon ? (
                <StepIcon className="h-4 w-4" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{step.title}</p>
              {step.description && (
                <p className="text-xs truncate opacity-70">
                  {step.description}
                </p>
              )}
            </div>
          </button>
        )
      })}
    </nav>
  )
}

interface WizardLayoutProps {
  steps: WizardStep[]
  currentStep: number
  onStepClick?: (stepIndex: number) => void
  children: ReactNode
}

export function WizardLayout({
  steps,
  currentStep,
  onStepClick,
  children
}: WizardLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-72 border-r bg-background p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Nuevo Proyecto</h2>
          <p className="text-sm text-muted-foreground">
            Paso {currentStep + 1} de {steps.length}
          </p>
        </div>
        <WizardStepper
          steps={steps}
          currentStep={currentStep}
          onStepClick={onStepClick}
        />
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto">{children}</div>
      </main>
    </div>
  )
}
