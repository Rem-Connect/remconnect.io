import React from 'react'

interface CardProps {
  children: React.ReactNode
  dark?: boolean
  padding?: number | string
  className?: string
  style?: React.CSSProperties
}

export function Card({ children, dark = false, padding, className, style }: CardProps) {
  const base: React.CSSProperties = dark
    ? { background: '#121a2b', border: '1px solid #243150', borderRadius: 10 }
    : { background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, boxShadow: '0 1px 2px rgba(11,18,32,0.06)' }

  return (
    <div className={className} style={{ ...base, ...(padding !== undefined ? { padding } : {}), ...style }}>
      {children}
    </div>
  )
}
