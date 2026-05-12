import React from 'react'

type ChipVariant = 'default' | 'dark' | 'good' | 'bad' | 'neutral' | 'warn'

interface ChipProps {
  children: React.ReactNode
  variant?: ChipVariant
  className?: string
  style?: React.CSSProperties
}

const VARIANT_STYLES: Record<ChipVariant, React.CSSProperties> = {
  default: {
    background: 'rgba(29,111,214,0.10)',
    color: '#0c3a7a',
    border: '1px solid rgba(29,111,214,0.22)',
  },
  dark: {
    background: 'rgba(124,179,245,0.12)',
    color: '#7cb3f5',
    border: '1px solid rgba(124,179,245,0.25)',
  },
  good: {
    background: 'rgba(47,141,92,0.12)',
    color: '#2f8d5c',
    border: '1px solid rgba(47,141,92,0.25)',
  },
  bad: {
    background: 'rgba(181,72,56,0.12)',
    color: '#b54838',
    border: '1px solid rgba(181,72,56,0.25)',
  },
  neutral: {
    background: 'rgba(90,96,114,0.08)',
    color: '#5a6072',
    border: '1px solid rgba(90,96,114,0.2)',
  },
  warn: {
    background: 'rgba(192,138,42,0.14)',
    color: '#0c3a7a',
    border: '1px solid rgba(192,138,42,0.3)',
  },
}

export function Chip({ children, variant = 'default', className, style }: ChipProps) {
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '3px 8px',
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: '0.01em',
        ...VARIANT_STYLES[variant],
        ...style,
      }}
    >
      {children}
    </span>
  )
}
