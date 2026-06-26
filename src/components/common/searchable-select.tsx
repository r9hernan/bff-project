'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Plus, Search } from 'lucide-react'

export interface SearchableSelectOption {
  value: string
  label: string
  searchLabel?: string
}

interface SearchableSelectProps {
  options: SearchableSelectOption[]
  value?: string
  onValueChange: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  className?: string
  disabled?: boolean
  onCreateClick?: (searchQuery: string) => void
  createText?: string
}

export function SearchableSelect({
  options,
  value,
  onValueChange,
  placeholder = 'Seleccionar...',
  searchPlaceholder = 'Buscar...',
  emptyText = 'No se encontraron resultados',
  className,
  disabled = false,
  onCreateClick,
  createText
}: SearchableSelectProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open && inputRef.current) {
      const timer = setTimeout(() => {
        inputRef.current?.focus()
      }, 0)
      return () => clearTimeout(timer)
    }
  }, [open, searchQuery])

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
    if (!isOpen) {setSearchQuery('')}
  }

  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) {return options}

    const query = searchQuery.toLowerCase().trim()
    return options.filter((option) => {
      const searchText = (option.searchLabel || option.label).toLowerCase()
      return searchText.includes(query)
    })
  }, [options, searchQuery])

  return (
    <Select
      value={value}
      onValueChange={onValueChange}
      open={open}
      onOpenChange={handleOpenChange}
      disabled={disabled}
    >
      <SelectTrigger className={className} disabled={disabled}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <div className="flex items-center gap-2 px-2 pb-2 sticky top-0 z-10 bg-popover border-b">
          <Search className="h-4 w-4 text-muted-foreground flex-none" />
          <Input
            ref={inputRef}
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          />
        </div>
        {filteredOptions.length > 0 ? (
          filteredOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))
        ) : (
          <div className="px-2 py-6 text-center text-sm">
            <p className="text-muted-foreground mb-2">{emptyText}</p>
            {searchQuery.trim() && onCreateClick && createText && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onCreateClick(searchQuery.trim())
                }}
                className="text-primary hover:underline font-medium flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                {createText}
              </button>
            )}
          </div>
        )}
      </SelectContent>
    </Select>
  )
}
