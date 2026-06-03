'use client'

import { useEffect } from 'react'
import { Search, X, Command } from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface GlobalSearchProps {
  className?: string
}

export function GlobalSearch({ className }: GlobalSearchProps) {
  const { 
    globalSearchOpen, 
    setGlobalSearchOpen, 
    globalSearchQuery, 
    setGlobalSearchQuery 
  } = useAppStore()
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setGlobalSearchOpen(true)
      }
      if (e.key === 'Escape') {
        setGlobalSearchOpen(false)
      }
    }
    
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [setGlobalSearchOpen])
  
  if (!globalSearchOpen) {
    return (
      <Button
        variant="outline"
        onClick={() => setGlobalSearchOpen(true)}
        className={cn('relative w-64 justify-start text-muted-foreground', className)}
      >
        <Search className="mr-2 h-4 w-4" />
        <span>Search...</span>
        <div className="absolute right-2 flex items-center gap-1">
          <kbd className="pointer-events-none flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <Command className="h-3 w-3" />K
          </kbd>
        </div>
      </Button>
    )
  }
  
  return (
    <>
      <div 
        className="fixed inset-0 z-50 bg-black/50"
        onClick={() => setGlobalSearchOpen(false)}
      />
      <div className="fixed left-1/2 top-20 z-50 w-full max-w-xl -translate-x-1/2 rounded-lg border border-border bg-card shadow-lg">
        <div className="flex items-center gap-2 border-b border-border p-4">
          <Search className="h-5 w-5 text-muted-foreground" />
          <Input
            autoFocus
            placeholder="Search customers, campaigns, segments..."
            value={globalSearchQuery}
            onChange={(e) => setGlobalSearchQuery(e.target.value)}
            className="border-0 p-0 focus-visible:ring-0"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setGlobalSearchOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="max-h-[400px] overflow-y-auto p-4">
          {globalSearchQuery ? (
            <div className="space-y-4">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Quick Actions</p>
                <div className="space-y-1">
                  <button className="flex w-full items-center gap-2 rounded-md p-2 text-left hover:bg-muted">
                    <span className="text-sm">Search for &quot;{globalSearchQuery}&quot; in Customers</span>
                  </button>
                  <button className="flex w-full items-center gap-2 rounded-md p-2 text-left hover:bg-muted">
                    <span className="text-sm">Search for &quot;{globalSearchQuery}&quot; in Campaigns</span>
                  </button>
                  <button className="flex w-full items-center gap-2 rounded-md p-2 text-left hover:bg-muted">
                    <span className="text-sm">Search for &quot;{globalSearchQuery}&quot; in Segments</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Recent Searches</p>
                <p className="text-sm text-muted-foreground">No recent searches</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
