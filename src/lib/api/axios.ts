import axios from 'axios'
import { handleForbiddenError, handleUnauthorizedError } from '@/lib/auth/session'

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 'Content-Type': 'application/json' }
})

apiClient.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined'
      ? localStorage.getItem('auth_token')
      : null
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    const requestUrl = error.config?.url || ''

    if (status === 401 && !requestUrl.includes('/api/auth/login')) {
      handleUnauthorizedError()
    } else if (status === 403) {
      handleForbiddenError()
    }

    return Promise.reject(error)
  }
)
