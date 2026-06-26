'use client'

import type { ReactNode } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { AdminLayout } from '@/components/layout/admin-layout'
import { ClientOnly } from '@/components/layout/client-only'
import AuthGuard from '@/components/layout/auth-guard'

const AdminRootLayout = ({ children }: { children: ReactNode }) => {
  const { isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <ClientOnly
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </div>
      }
    >
      <AuthGuard>
        <AdminLayout>{children}</AdminLayout>
      </AuthGuard>
    </ClientOnly>
  )
}

export default AdminRootLayout
