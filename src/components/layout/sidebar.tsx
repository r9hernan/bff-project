'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth-context'
import {
  LayoutDashboard,
  FolderOpen,
  LogOut,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Settings
} from 'lucide-react'

interface SidebarItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  roles?: string[]
  children?: SidebarItem[]
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard
  },
  {
    title: 'Proyectos',
    href: '/admin/projects',
    icon: FolderOpen
  },
  {
    title: 'Perfil',
    href: '/admin/profile',
    icon: Settings
  }
]

interface SidebarProps {
  className?: string
}

export const Sidebar = ({ className }: SidebarProps) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()
  const prevPathnameRef = useRef<string>(pathname)
  const { user, logout } = useAuth()

  useEffect(() => {
    prevPathnameRef.current = pathname
  }, [pathname])

  const toggleExpanded = (itemTitle: string) => {
    setExpandedItems((prev) => {
      const isExpanded = prev.includes(itemTitle)
      if (isExpanded) {
        return prev.filter((item) => item !== itemTitle)
      }
      return [...prev, itemTitle]
    })
  }

  const renderSidebarItem = (item: SidebarItem, level = 0) => {
    const isActive = pathname === item.href
      || pathname.startsWith(item.href + '/')

    const isExpanded = expandedItems.includes(item.title)
    const hasChildren = item.children && item.children.length > 0

    const handleItemClick = (e: React.MouseEvent) => {
      if (hasChildren) {
        e.preventDefault()
        e.stopPropagation()
        toggleExpanded(item.title)
      }
    }

    const itemContent = (
      <div
        className={cn(
          'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors w-full min-w-0',
          'hover:bg-blue-500 hover:text-white',
          isActive && 'bg-blue-500 text-white',
          level > 0 && !isCollapsed && 'ml-4',
          isCollapsed && 'justify-center',
          hasChildren && 'cursor-pointer'
        )}
        title={isCollapsed ? item.title : undefined}
        onClick={hasChildren ? handleItemClick : undefined}
      >
        <item.icon className="h-4 w-4 flex-shrink-0" />
        {!isCollapsed && (
          <span className="flex-1 truncate">{item.title}</span>
        )}
        {hasChildren && !isCollapsed && (
          <div className="ml-auto flex-shrink-0">
            {isExpanded ? (
              <ChevronDown className="h-3 w-3" />
            ) : (
              <ChevronRight className="h-3 w-3" />
            )}
          </div>
        )}
      </div>
    )

    return (
      <div key={item.title} className="min-w-0">
        <div className="flex items-center min-w-0">
          <Link href={item.href} className="w-full min-w-0">
            {itemContent}
          </Link>
        </div>
        {hasChildren && isExpanded && !isCollapsed && (
          <div className="mt-1 min-w-0">
            {item.children?.map((child) =>
              renderSidebarItem(child, level + 1)
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className={cn(
        'flex h-full flex-col bg-gray-100 transition-all duration-300 overflow-x-hidden',
        isCollapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <Link href="/admin" className="flex items-center justify-center">
              <span className="text-lg font-bold">Panel</span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setIsCollapsed((prev) => !prev)}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden py-4">
        <nav className="space-y-2 px-3 min-w-0">
          {SIDEBAR_ITEMS.map((item) => renderSidebarItem(item))}
        </nav>
      </div>

      <div className="border-t p-4">
        <div className="mb-4">
          <div
            className={cn(
              'flex items-center gap-3 px-3 py-2',
              isCollapsed && 'justify-center px-0'
            )}
          >
            <div className="rounded-full bg-primary flex items-center justify-center flex-shrink-0 h-8 w-8">
              <span className="text-sm font-medium text-primary-foreground">
                {user?.name?.charAt(0)?.toUpperCase()}
              </span>
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {user?.name} {user?.lastName}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email}
                </p>
              </div>
            )}
          </div>
        </div>
        <Button
          variant="ghost"
          className={cn(
            'gap-3',
            isCollapsed
              ? 'w-8 h-8 p-0 justify-center'
              : 'w-full justify-start'
          )}
          onClick={logout}
          title={isCollapsed ? 'Cerrar sesi\u00f3n' : undefined}
        >
          <LogOut className="h-4 w-4" />
          {!isCollapsed && 'Cerrar sesi\u00f3n'}
        </Button>
      </div>
    </div>
  )
}
