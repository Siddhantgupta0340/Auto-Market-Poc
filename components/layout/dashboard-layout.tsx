'use client'

import { ReactNode, useEffect } from 'react'
import { useAppStore } from '@/lib/store'
import { AppSidebar } from './app-sidebar'
import { AppNavbar } from './app-navbar'
import { Workspace } from '@/lib/types'

interface DashboardLayoutProps {
  children: ReactNode
  workspace: Workspace
}

export function DashboardLayout({ children, workspace }: DashboardLayoutProps) {
  const { setWorkspace } = useAppStore()
  
  useEffect(() => {
    setWorkspace(workspace)
  }, [workspace, setWorkspace])
  
  return (
    <div className="flex h-screen bg-background">
      <AppSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AppNavbar />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
