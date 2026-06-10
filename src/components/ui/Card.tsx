import React from 'react'
import { cn } from '@/lib/cn'

interface CardProps {
  children: React.ReactNode
  dark?: boolean
  padding?: number | string
  className?: string
  style?: React.CSSProperties
}

const BASE = 'rounded-md border'
const LIGHT = 'bg-white border-rc-line shadow-sm'
const DARK = 'bg-rc-ink-2 border-rc-ink-4'

export function Card({ children, dark = false, padding, className, style }: CardProps) {
  return (
    <div
      className={cn(BASE, dark ? DARK : LIGHT, className)}
      style={padding !== undefined ? { padding, ...style } : style}
    >
      {children}
    </div>
  )
}
