'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Shield, Megaphone, Mail, BarChart3, ChevronDown, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ThemeToggle } from '@/components/shared/theme-toggle'
import { cn } from '@/lib/utils'

const workspaces = [
  { value: 'admin', label: 'Admin Workspace', href: '/admin/dashboard' },
  { value: 'marketer', label: 'Marketer Workspace', href: '/marketer/dashboard' },
  { value: 'campaign', label: 'Campaign Manager', href: '/campaign/dashboard' },
  // { value: 'analytics', label: 'Analytics Manager', href: '/analytics/dashboard' },
]

const workspaceCards = [
  {
    title: 'Admin Workspace',
    description: 'Manage customers, users, permissions, reports, analytics, and platform settings.',
    icon: Shield,
    color: 'green',
    href: '/admin/dashboard',
  },
  {
    title: 'Marketer Workspace',
    description: 'Manage campaigns, templates, journeys, automation, and outreach.',
    icon: Megaphone,
    color: 'blue',
    href: '/marketer/dashboard',
  },
  {
    title: 'Campaign Manager',
    description: 'Manage Email, SMS, WhatsApp, Push, and Multi-Channel campaigns.',
    icon: Mail,
    color: 'orange',
    href: '/campaign/dashboard',
  },
  // {
  //   title: 'Analytics Manager',
  //   description: 'Monitor conversions, revenue, campaign performance, and customer growth.',
  //   icon: BarChart3,
  //   color: 'purple',
  //   href: '/analytics/dashboard',
  // },
]

const colorClasses = {
  green: 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800',
  blue: 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800',
  orange: 'bg-orange-50 text-orange-600 border-orange-200 dark:bg-orange-950 dark:text-orange-400 dark:border-orange-800',
  purple: 'bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-950 dark:text-purple-400 dark:border-purple-800',
}

const iconColorClasses = {
  green: 'text-emerald-600 dark:text-emerald-400',
  blue: 'text-blue-600 dark:text-blue-400',
  orange: 'text-orange-600 dark:text-orange-400',
  purple: 'text-purple-600 dark:text-purple-400',
}

export default function AccessPortal() {
  const router = useRouter()
  const [selectedWorkspace, setSelectedWorkspace] = useState(workspaces[0])
  const [dropdownOpen, setDropdownOpen] = useState(false)
  
  const handleGoToWorkspace = () => {
    router.push(selectedWorkspace.href)
  }
  
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-12">
        <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-2">
          {/* Left Card - Workspace Selection */}
          <Card className="border-border shadow-lg">
            <CardHeader className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                  AutoMarket Access
                </span>
                <ThemeToggle variant="switch" />
              </div>
              <div>
                <CardTitle className="text-3xl font-bold tracking-tight">AUTOMARKET</CardTitle>
                <CardDescription className="mt-2 text-base">
                  Choose a workspace and enter the marketing platform.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Workspace Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex w-full items-center justify-between rounded-lg border border-input bg-background px-4 py-3 text-left transition-colors hover:bg-accent"
                >
                  <span className="font-medium">{selectedWorkspace.label}</span>
                  <ChevronDown className={cn(
                    'h-5 w-5 text-muted-foreground transition-transform',
                    dropdownOpen && 'rotate-180'
                  )} />
                </button>
                
                {dropdownOpen && (
                  <div className="absolute left-0 right-0 top-full z-10 mt-1 rounded-lg border border-border bg-card shadow-lg">
                    {workspaces.map((workspace) => (
                      <button
                        key={workspace.value}
                        onClick={() => {
                          setSelectedWorkspace(workspace)
                          setDropdownOpen(false)
                        }}
                        className={cn(
                          'flex w-full items-center px-4 py-3 text-left transition-colors hover:bg-accent',
                          workspace.value === selectedWorkspace.value && 'bg-accent'
                        )}
                      >
                        <span className="font-medium">{workspace.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Go To Workspace Button */}
              <Button 
                size="lg" 
                className="w-full text-base"
                onClick={handleGoToWorkspace}
              >
                Go To Workspace
              </Button>
              
              {/* Footer Text */}
              <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-4">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">Secure Enterprise Access Module</p>
                  <p className="text-xs text-muted-foreground">
                    Only authorized users can access platform workspaces.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Right Side - Capability Cards Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {workspaceCards.map((card) => (
              <Card 
                key={card.title}
                className={cn(
                  'cursor-pointer border-2 transition-all hover:shadow-md',
                  colorClasses[card.color as keyof typeof colorClasses]
                )}
                onClick={() => router.push(card.href)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <card.icon className={cn('h-6 w-6', iconColorClasses[card.color as keyof typeof iconColorClasses])} />
                    <CardTitle className="text-base">{card.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm opacity-80">{card.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
