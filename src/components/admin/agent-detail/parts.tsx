import React from 'react'
import { cn } from '@/lib/cn'

interface StatBoxProps {
  label: string
  value: string
  sub?: string
  /** Optional accent color for the value (a dynamic token var or computed color). */
  accent?: string
}

export function StatBox({ label, value, sub, accent }: StatBoxProps) {
  return (
    <div className="rounded-md border border-rc-line bg-rc-paper-4 px-4 py-3.5">
      <div className="mb-1 text-[10px] uppercase tracking-[0.08em] text-rc-muted-d">{label}</div>
      <div
        className="font-mono text-2xl font-bold text-rc-ink"
        style={accent ? { color: accent } : undefined}
      >
        {value}
      </div>
      {sub && <div className="mt-0.5 text-[11px] text-rc-muted-d">{sub}</div>}
    </div>
  )
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3.5 font-serif text-[19px] font-normal tracking-[-0.01em] text-rc-ink">
      {children}
    </div>
  )
}

interface DetailCardProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

/** Surface card used across the agent-detail tabs. */
export function DetailCard({ children, className, style }: DetailCardProps) {
  return (
    <div className={cn('rounded-md border border-rc-line bg-white p-5', className)} style={style}>
      {children}
    </div>
  )
}

/** Uppercase label used above grouped fields. */
export function FieldGroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-rc-muted-d">
      {children}
    </div>
  )
}
