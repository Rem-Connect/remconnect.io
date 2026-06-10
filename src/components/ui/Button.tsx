import React from 'react'
import { cn } from '@/lib/cn'

type ButtonVariant = 'primary' | 'blue' | 'ghost' | 'ghost-dark'
type ButtonSize = 'sm' | 'md'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const BASE =
  'inline-flex items-center gap-2 rounded-sm border border-transparent font-medium ' +
  'cursor-pointer transition-[transform,background] duration-150'

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-rc-ink text-rc-paper',
  blue: 'bg-rc-blue text-white',
  ghost: 'bg-transparent text-rc-ink border-rc-line',
  'ghost-dark': 'bg-transparent text-rc-paper border-rc-ink-4',
}

const SIZES: Record<ButtonSize, string> = {
  sm: 'px-2.5 py-[5px] text-xs',
  md: 'px-3.5 py-[9px] text-[13px]',
}

export function Button({
  variant = 'ghost',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(BASE, VARIANTS[variant], SIZES[size], className)} {...props}>
      {children}
    </button>
  )
}
