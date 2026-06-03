'use client'

import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface KPICardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon?: LucideIcon
  iconColor?: string
  trend?: 'up' | 'down' | 'neutral'
  className?: string
}

export function KPICard({
  title,
  value,
  change,
  changeLabel = 'vs last period',
  icon: Icon,
  iconColor = 'text-primary',
  trend,
  className,
}: KPICardProps) {
  const trendColor = trend === 'up' ? 'text-emerald-600' : trend === 'down' ? 'text-red-600' : 'text-muted-foreground'
  
  return (
    <div className={cn(
      'rounded-lg border border-border bg-card p-6 shadow-sm',
      className
    )}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        {Icon && (
          <div className={cn('rounded-md bg-muted p-2', iconColor)}>
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>
      <div className="mt-2">
        <p className="text-2xl font-bold text-card-foreground">{value}</p>
        {change !== undefined && (
          <p className={cn('mt-1 text-xs', trendColor)}>
            {change > 0 ? '+' : ''}{change}% {changeLabel}
          </p>
        )}
      </div>
    </div>
  )
}
