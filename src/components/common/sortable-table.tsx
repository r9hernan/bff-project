'use client'

import { useState, useMemo, useCallback } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'

type SortDirection = 'asc' | 'desc' | 'none'

export interface TableColumn<T = Record<string, unknown>> {
  label: string
  key: string
  render?: (value: unknown, row: T) => React.ReactNode
  sortable?: boolean
}

export interface TableFilter {
  label: string
  key: string
  options: Array<{ label: string; value: string }>
  defaultValue?: string
}

interface SortableTableProps<T> {
  title: string
  description?: string
  data: T[]
  columns: TableColumn<T>[]
  filters?: TableFilter[]
  maxHeight?: string
  emptyMessage?: string
  className?: string
}

export function SortableTable<T extends Record<string, unknown>>({
  title,
  description,
  data,
  columns,
  filters = [],
  maxHeight = '600px',
  emptyMessage = 'No hay datos disponibles',
  className
}: SortableTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: string
    direction: SortDirection
  }>({ key: '', direction: 'none' })

  const [filterValues, setFilterValues] = useState<Record<string, string>>(
    () => {
      const initial: Record<string, string> = {}
      filters.forEach((filter) => {
        initial[filter.key] = filter.defaultValue
          || filter.options[0]?.value
          || 'all'
      })
      return initial
    }
  )

  const [columnFilters, setColumnFilters] = useState<
    Record<string, { min?: string; max?: string; text?: string }>
  >({})

  const handleSort = (key: string) => {
    setSortConfig((current) => {
      if (current.key !== key) {return { key, direction: 'asc' }}
      if (current.direction === 'asc') {return { key, direction: 'desc' }}
      if (current.direction === 'desc') {return { key: '', direction: 'none' }}
      return { key, direction: 'asc' }
    })
  }

  const getSortIcon = (columnKey: string) => {
    if (sortConfig.key !== columnKey) {
      return <ChevronsUpDown className="ml-1 h-4 w-4 text-gray-400" />
    }
    if (sortConfig.direction === 'asc') {
      return <ChevronUp className="ml-1 h-4 w-4 text-blue-600" />
    }
    if (sortConfig.direction === 'desc') {
      return <ChevronDown className="ml-1 h-4 w-4 text-blue-600" />
    }
    return <ChevronsUpDown className="ml-1 h-4 w-4 text-gray-400" />
  }

  const isNumericColumn = useCallback(
    (columnKey: string): boolean => {
      if (data.length === 0) {return false}
      const sampleValues = data
        .map((item) => item[columnKey])
        .filter((val) => val !== null && val !== undefined)
        .slice(0, 10)

      if (sampleValues.length === 0) {return false}

      return sampleValues.every(
        (val) =>
          typeof val === 'number'
          || (!isNaN(Number(val)) && val !== '')
      )
    },
    [data]
  )

  const getUniqueValues = useCallback(
    (column: TableColumn<T>): Array<{ label: string; value: string }> => {
      const valueMap = new Map<
        string,
        { label: string; rawValue: unknown }
      >()
      data.forEach((item) => {
        const rawValue = item[column.key]
        if (rawValue !== null && rawValue !== undefined) {
          let valueStr: string
          if (
            typeof rawValue === 'object'
            && rawValue !== null
            && !Array.isArray(rawValue)
          ) {
            valueStr = JSON.stringify(rawValue)
          } else {
            valueStr = String(rawValue)
          }

          if (!valueMap.has(valueStr)) {
            valueMap.set(valueStr, { label: valueStr, rawValue })
          }
        }
      })
      return Array.from(valueMap.entries())
        .map(([value, { label }]) => ({ label, value }))
        .sort((a, b) => a.label.localeCompare(b.label))
    },
    [data]
  )

  const filteredAndSortedData = useMemo(() => {
    let result = [...data]

    filters.forEach((filter) => {
      const filterValue = filterValues[filter.key]
      if (filterValue && filterValue !== 'all') {
        result = result.filter((item) => {
          const itemValue = item[filter.key]
          return (
            itemValue === filterValue
            || String(itemValue) === filterValue
          )
        })
      }
    })

    columns.forEach((column) => {
      const columnFilter = columnFilters[column.key]
      if (columnFilter) {
        if (isNumericColumn(column.key)) {
          result = result.filter((item) => {
            const itemValue = item[column.key]
            if (itemValue === null || itemValue === undefined) {return false}
            const numValue = typeof itemValue === 'number'
              ? itemValue
              : Number(itemValue)
            if (isNaN(numValue)) {return false}
            if (columnFilter.min && numValue < Number(columnFilter.min)) {
              return false
            }
            if (columnFilter.max && numValue > Number(columnFilter.max)) {
              return false
            }
            return true
          })
        } else if (columnFilter.text) {
          result = result.filter((item) => {
            const itemValue = item[column.key]
            if (itemValue === null || itemValue === undefined) {return false}
            let itemValueStr: string
            if (
              typeof itemValue === 'object'
              && itemValue !== null
              && !Array.isArray(itemValue)
            ) {
              itemValueStr = JSON.stringify(itemValue)
            } else {
              itemValueStr = String(itemValue)
            }
            return itemValueStr === columnFilter.text
          })
        }
      }
    })

    if (sortConfig.direction !== 'none' && sortConfig.key) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key]
        const bValue = b[sortConfig.key]

        if (aValue === null || aValue === undefined) {
          if (bValue === null || bValue === undefined) {return 0}
          return 1
        }
        if (bValue === null || bValue === undefined) {return -1}

        let comparison = 0
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          comparison = aValue - bValue
        } else {
          comparison = String(aValue).localeCompare(String(bValue))
        }

        return sortConfig.direction === 'asc' ? comparison : -comparison
      })
    }

    return result
  }, [
    data,
    sortConfig,
    filterValues,
    filters,
    columnFilters,
    columns,
    isNumericColumn
  ])

  const handleFilterChange = (filterKey: string, value: string) => {
    setFilterValues((prev) => ({ ...prev, [filterKey]: value }))
  }

  const handleColumnFilterChange = (
    columnKey: string,
    type: 'min' | 'max' | 'text',
    value: string
  ) => {
    setColumnFilters((prev) => ({
      ...prev,
      [columnKey]: {
        ...prev[columnKey],
        [type]: value || undefined
      }
    }))
  }

  return (
    <Card className={cn('text-sm', className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {filters.length > 0 && (
            <div className="flex gap-2">
              {filters.map((filter) => (
                <Select
                  key={filter.key}
                  value={filterValues[filter.key]}
                  onValueChange={(value) =>
                    handleFilterChange(filter.key, value)
                  }
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder={filter.label} />
                  </SelectTrigger>
                  <SelectContent>
                    {filter.options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ))}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto" style={{ maxHeight }}>
          <table
            className="w-full border-collapse"
            style={{ tableLayout: 'auto' }}
          >
            <thead>
              <tr className="border-b">
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`sticky top-0 text-left px-3 py-2 font-semibold whitespace-nowrap bg-white z-20 ${
                      column.sortable !== false
                        ? 'cursor-pointer hover:bg-gray-50 select-none'
                        : ''
                    }`}
                    onClick={() =>
                      column.sortable !== false && handleSort(column.key)
                    }
                  >
                    <div className="flex items-center gap-1">
                      {column.label}
                      {column.sortable !== false && getSortIcon(column.key)}
                    </div>
                  </th>
                ))}
              </tr>
              <tr className="border-b">
                {columns.map((column) => {
                  const isNumeric = isNumericColumn(column.key)
                  const uniqueValues = getUniqueValues(column)
                  const filter = columnFilters[column.key] || {}

                  return (
                    <td
                      key={column.key}
                      className="sticky top-[41px] px-3 py-2 bg-gray-50 z-10"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {isNumeric ? (
                        <div className="flex gap-1">
                          <Input
                            type="number"
                            placeholder="Min"
                            value={filter.min || ''}
                            onChange={(e) =>
                              handleColumnFilterChange(
                                column.key,
                                'min',
                                e.target.value
                              )
                            }
                            className="h-8 text-xs w-20"
                          />
                          <Input
                            type="number"
                            placeholder="Max"
                            value={filter.max || ''}
                            onChange={(e) =>
                              handleColumnFilterChange(
                                column.key,
                                'max',
                                e.target.value
                              )
                            }
                            className="h-8 text-xs w-20"
                          />
                        </div>
                      ) : (
                        <Select
                          value={filter.text || 'all'}
                          onValueChange={(value) =>
                            handleColumnFilterChange(
                              column.key,
                              'text',
                              value === 'all' ? '' : value
                            )
                          }
                        >
                          <SelectTrigger className="h-8 text-xs w-full">
                            <SelectValue placeholder="Todos" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Todos</SelectItem>
                            {uniqueValues.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </td>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedData.length > 0 ? (
                filteredAndSortedData.map((row, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className="px-3 py-2 whitespace-nowrap"
                      >
                        {column.render
                          ? column.render(
                            row[column.key],
                            row
                          )
                          : (row[column.key] as React.ReactNode)
                          || '\u2014'}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center py-8 text-gray-500"
                  >
                    <p>{emptyMessage}</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
