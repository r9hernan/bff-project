'use client'

import { useAuth } from '@/contexts/auth-context'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (
      !isAuthenticated
      && !isLoading
      && pathname !== '/login'
    ) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, pathname, router])

  if (!isAuthenticated && !isLoading && pathname !== '/login') {
    return null
  }

  return <>{children}</>
}

export default AuthGuard
