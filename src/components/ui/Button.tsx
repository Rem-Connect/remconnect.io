import React from 'react'

type ButtonVariant = 'primary' | 'blue' | 'ghost' | 'ghost-dark'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: 'sm' | 'md'
}

const BASE: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  borderRadius: 6,
  border: '1px solid transparent',
  fontWeight: 500,
  fontSize: 13,
  cursor: 'pointer',
  fontFamily: 'inherit',
  transition: 'transform 0.06s ease, background 0.15s ease',
}

const VARIANTS: Record<ButtonVariant, React.CSSProperties> = {
  primary:    { background: '#0b1220', color: '#faf9f6', borderColor: 'transparent' },
  blue:       { background: '#1d6fd6', color: '#fff',    borderColor: 'transparent' },
  ghost:      { background: 'transparent', color: '#0b1220', borderColor: '#e3e0d2' },
  'ghost-dark': { background: 'transparent', color: '#faf9f6', borderColor: '#243150' },
}

const SIZES: Record<'sm' | 'md', React.CSSProperties> = {
  sm: { padding: '5px 10px', fontSize: 12 },
  md: { padding: '9px 14px', fontSize: 13 },
}

export function Button({ variant = 'ghost', size = 'md', style, children, ...props }: ButtonProps) {
  return (
    <button style={{ ...BASE, ...VARIANTS[variant], ...SIZES[size], ...style }} {...props}>
      {children}
    </button>
  )
}
