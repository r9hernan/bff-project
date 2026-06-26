'use client'

import { UploadCloud, X } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

interface FileInputProps {
  id: string
  label?: string
  selectedFiles: File[]
  acceptedFileTypes?: string[]
  multiple?: boolean
  disabled?: boolean
  minFiles?: number
  maxFiles?: number
  onFilesChange: (files: File[]) => void
  placeholder?: string
}

export function FileInput({
  id,
  label = 'Archivos',
  selectedFiles,
  acceptedFileTypes,
  multiple = true,
  disabled = false,
  minFiles,
  maxFiles,
  onFilesChange,
  placeholder = 'Selecciona uno o m\u00e1s archivos'
}: FileInputProps) {
  const handleFilesSelected = (fileList: FileList | null) => {
    if (!fileList) {
      onFilesChange([])
      return
    }

    const newFiles = Array.from(fileList)

    if (maxFiles && newFiles.length > maxFiles) {
      onFilesChange(newFiles.slice(0, maxFiles))
      return
    }

    onFilesChange(newFiles)
  }

  const handleRemoveFile = (indexToRemove: number) => {
    const updatedFiles = selectedFiles.filter(
      (_, index) => index !== indexToRemove
    )
    onFilesChange(updatedFiles)
  }

  const isMaxReached = maxFiles !== undefined
    && selectedFiles.length >= maxFiles

  const isMinReached = minFiles === undefined
    || selectedFiles.length >= minFiles

  const isValid = isMinReached
    && (!maxFiles || selectedFiles.length <= maxFiles)

  const getValidationMessage = () => {
    if (selectedFiles.length === 0 && minFiles && minFiles > 0) {
      return `M\u00ednimo ${minFiles} archivo${minFiles > 1 ? 's' : ''} requerido${minFiles > 1 ? 's' : ''}`
    }
    if (minFiles && selectedFiles.length < minFiles) {
      const remaining = minFiles - selectedFiles.length
      return `Faltan ${remaining} archivo${remaining > 1 ? 's' : ''} (m\u00ednimo ${minFiles})`
    }
    if (maxFiles && selectedFiles.length > maxFiles) {
      return `M\u00e1ximo ${maxFiles} archivo${maxFiles > 1 ? 's' : ''} permitido${maxFiles > 1 ? 's' : ''}`
    }
    if (minFiles && maxFiles && isValid) {
      return `${selectedFiles.length} de ${minFiles}-${maxFiles} archivos`
    }
    if (minFiles && isValid && selectedFiles.length >= minFiles) {
      return `\u2713 M\u00ednimo alcanzado (${minFiles}+ archivos)`
    }
    return null
  }

  const validationMessage = getValidationMessage()

  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={id}>{label}</Label>
        {validationMessage && (
          <span
            className={`text-xs ${
              isValid
                ? 'text-emerald-600'
                : selectedFiles.length === 0
                  ? 'text-muted-foreground'
                  : 'text-amber-600'
            }`}
          >
            {validationMessage}
          </span>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-3 rounded-md border border-dashed bg-muted/40 p-4">
        <label
          htmlFor={id}
          className={`flex cursor-pointer items-center gap-2 text-sm text-muted-foreground hover:text-foreground ${
            disabled || isMaxReached ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          <UploadCloud className="h-5 w-5" />
          <span>{isMaxReached ? 'M\u00e1ximo alcanzado' : placeholder}</span>
        </label>
        <input
          id={id}
          type="file"
          multiple={multiple}
          accept={acceptedFileTypes?.join(',')}
          className="hidden"
          disabled={disabled || isMaxReached}
          onChange={(event) => handleFilesSelected(event.target.files)}
        />
        {selectedFiles.length > 0 && (
          <span className="rounded-md border border-muted bg-white px-2 py-1 text-xs text-muted-foreground">
            {selectedFiles.length} archivo(s) seleccionado(s)
          </span>
        )}
      </div>
      {selectedFiles.length > 0 && (
        <ul className="space-y-2">
          {selectedFiles.map((file, index) => (
            <li key={`${file.name}-${index}`} className="flex items-center justify-between gap-2 rounded-md border bg-white p-2">
              <span className="text-xs text-muted-foreground flex-1 min-w-0">
                <span className="font-medium text-foreground truncate block">{file.name}</span>
                <span className="text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</span>
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive shrink-0"
                onClick={() => handleRemoveFile(index)}
                disabled={disabled}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Eliminar {file.name}</span>
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
