import { apiClient } from '@/lib/api/axios'
import type {
  User,
  LoginCredentials,
  AuthResponse
} from '@/types/auth'

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post('/api/auth/login', credentials)
    return response.data
  },

  forgotPassword: async (email: string): Promise<void> => {
    const response = await apiClient.post('/api/auth/forgot-password', { email })
    return response.data
  },

  resetPassword: async (
    email: string,
    newPassword: string,
    confirmationCode: string
  ) => {
    const response = await apiClient.post('/api/auth/reset-password', {
      email,
      newPassword,
      confirmationCode
    })
    return response.data
  },

  getProfile: async (): Promise<User> => {
    const response = await apiClient.get('/api/users/me')
    return response.data
  }
}
