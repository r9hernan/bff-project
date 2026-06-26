'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo
} from 'react'
import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import type {
  User,
  UserRole,
  LoginCredentials,
  AuthContextType
} from '@/types/auth'
import { authApi } from '@/services/auth'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

const PUBLIC_ROUTES = ['/', '/login', '/nosotros', '/servicios', '/contacto']

const isPublicRoute = (pathname: string): boolean => {
  return PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname === route + '/'
  )
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [refreshToken, setRefreshToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)
  const pathname = usePathname()

  const fetchUserProfile = async () => {
    try {
      const userData = await authApi.getProfile()
      setUser(userData)
    } catch (error: unknown) {
      const isNetworkError =
        (error as { message?: string })?.message === 'Network Error' ||
        (error as { code?: string })?.code === 'ERR_NETWORK' ||
        !(error as { response?: unknown })?.response

      if (isNetworkError) {
        return
      }

      const status = (error as { response?: { status?: number } })
        ?.response?.status

      if (status === 401) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth_token')
          localStorage.removeItem('refresh_token')
        }
        setAccessToken(null)
        setRefreshToken(null)
        setUser(null)
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setIsClient(true)

    if (typeof window === 'undefined') {
      setIsLoading(false)
      return
    }

    const storedToken = localStorage.getItem('auth_token')
    const storedRefreshToken = localStorage.getItem('refresh_token')

    if (storedToken) {
      setAccessToken(storedToken)
      setRefreshToken(storedRefreshToken)
    }

    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (!isClient || typeof window === 'undefined') {
      return
    }

    const storedToken = localStorage.getItem('auth_token')

    if (storedToken && !isPublicRoute(pathname) && !user && accessToken) {
      setIsLoading(true)
      fetchUserProfile()
    } else if (isPublicRoute(pathname)) {
      setIsLoading(false)
    }
  }, [pathname, isClient, user, accessToken])

  const login = async (credentials: LoginCredentials) => {
    const response = await authApi.login(credentials)
    setAccessToken(response.accessToken)
    setRefreshToken(response.refreshToken)
    setUser(response.user)

    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', response.accessToken)
      localStorage.setItem('refresh_token', response.refreshToken)
    }

    return response
  }

  const logout = () => {
    setUser(null)
    setAccessToken(null)
    setRefreshToken(null)

    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('refresh_token')
      window.location.href = '/login'
    }
  }

  const hasRole = (role: UserRole): boolean => {
    return user?.role === role
  }

  const isAdmin = useMemo(() => {
    return user?.role === 'admin'
  }, [user])

  const value: AuthContextType = {
    user,
    accessToken,
    refreshToken,
    isLoading: !isClient || isLoading,
    login,
    logout,
    isAuthenticated: !!user && !!accessToken,
    hasRole,
    isAdmin
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
