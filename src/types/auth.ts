export interface User {
  id: string
  email: string
  name: string
  lastName: string
  role: UserRole
  active?: boolean
  createdAt?: string
  updatedAt?: string
}

export enum UserRoles {
  ADMIN = 'admin',
  OPERATOR = 'operator'
}

export type UserRole = 'admin' | 'operator'

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  user: User
}

export interface AuthContextType {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<AuthResponse>
  logout: () => void
  isAuthenticated: boolean
  hasRole: (role: UserRole) => boolean
  isAdmin: boolean
}
