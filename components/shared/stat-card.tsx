'use client'

import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: LucideIcon
  color?: 'green' | 'blue' | 'orange' | 'purple' | 'red' | 'gray'
  className?: string
}

const colorClasses = {
  green: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400',
  blue: 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400',
  orange: 'bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400',
  purple: 'bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400',
  red: 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400',
  gray: 'bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color = 'blue',
  className,
}: StatCardProps) {
  return (
    <div className={cn(
      'flex items-center gap-4 rounded-lg border border-border bg-card p-4 shadow-sm',
      className
    )}>
      {Icon && (
        <div className={cn('rounded-lg p-3', colorClasses[color])}>
          <Icon className="h-5 w-5" />
        </div>
      )}
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="text-xl font-bold text-card-foreground">{value}</p>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </div>
  )
}
