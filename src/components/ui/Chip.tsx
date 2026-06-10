import React from 'react'
import { cn } from '@/lib/cn'

type ChipVariant = 'default' | 'dark' | 'good' | 'bad' | 'neutral' | 'warn'

interface ChipProps {
  children: React.ReactNode
  variant?: ChipVariant
  className?: string
  style?: React.CSSProperties
}

const BASE =
  'inline-flex items-center gap-1.5 rounded-full border px-2 py-[3px] text-[11px] font-medium tracking-[0.01em]'

const VARIANTS: Record<ChipVariant, string> = {
  default: 'bg-rc-blue/10 text-rc-blue-ink border-rc-blue/20',
  dark: 'bg-rc-blue-soft/10 text-rc-blue-soft border-rc-blue-soft/25',
  good: 'bg-rc-good/10 text-rc-good border-rc-good/25',
  bad: 'bg-rc-bad/10 text-rc-bad border-rc-bad/25',
  neutral: 'bg-rc-muted/10 text-rc-muted border-rc-muted/20',
  warn: 'bg-rc-warn/15 text-rc-blue-ink border-rc-warn/30',
}

export function Chip({ children, variant = 'default', className, style }: ChipProps) {
  return (
    <span className={cn(BASE, VARIANTS[variant], className)} style={style}>
      {children}
    </span>
  )
}
