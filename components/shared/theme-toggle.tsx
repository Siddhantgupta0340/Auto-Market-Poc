'use client'

import { Moon, Sun } from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useEffect } from 'react'

interface ThemeToggleProps {
  className?: string
  variant?: 'button' | 'switch'
}

export function ThemeToggle({ className, variant = 'button' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useAppStore()
  
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])
  
  if (variant === 'switch') {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        <button
          onClick={() => useAppStore.getState().setTheme('light')}
          className={cn(
            'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
            theme === 'light' 
              ? 'bg-primary text-primary-foreground' 
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          Light
        </button>
        <button
          onClick={() => useAppStore.getState().setTheme('dark')}
          className={cn(
            'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
            theme === 'dark' 
              ? 'bg-primary text-primary-foreground' 
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          Dark
        </button>
      </div>
    )
  }
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={className}
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  )
}
