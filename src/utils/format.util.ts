export const formatNumber = (number: number | undefined) => {
  if (!number) {
    return ''
  }
  return number.toLocaleString('es-CL', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  })
}

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0
  }).format(amount)
}

export const formatPercent = (value: number) => {
  return `${value.toFixed(1)}%`
}
