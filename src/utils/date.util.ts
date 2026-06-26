export const getMonthAndYear = (date: string) => {
  const formatted = new Date(date).toLocaleDateString('es-CL', {
    month: 'short',
    year: 'numeric'
  })
  return formatted.charAt(0).toUpperCase() + formatted.slice(1)
}

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

export const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
