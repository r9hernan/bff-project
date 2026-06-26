'use client'

import { toast } from 'sonner'

let isRedirectingToLogin = false

const redirectToLogin = () => {
  if (typeof window === 'undefined') {
    return
  }

  if (isRedirectingToLogin) {
    return
  }

  isRedirectingToLogin = true
  localStorage.clear()
  window.location.href = '/login'
}

export const handleUnauthorizedError = () => {
  redirectToLogin()
}

export const handleForbiddenError = () => {
  if (typeof window === 'undefined') {
    return
  }

  toast.error('Acceso restringido', {
    description: 'No tienes permisos para esta acci\u00f3n. Tu sesi\u00f3n se cerrar\u00e1.'
  })

  redirectToLogin()
}
