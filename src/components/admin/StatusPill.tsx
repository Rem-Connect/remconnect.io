'use client'

import type { AdminStatus } from '@/types/admin'

const MAP: Record<AdminStatus, { bg: string; fg: string; dot: string; label: string }> = {
  active:    { bg: 'rgba(47,141,92,0.12)',  fg: '#2f8d5c', dot: '#2f8d5c', label: 'Active' },
  pending:   { bg: 'rgba(192,138,42,0.14)', fg: '#c08a2a', dot: '#c08a2a', label: 'Pending invite' },
  suspended: { bg: 'rgba(181,72,56,0.12)',  fg: '#b54838', dot: '#b54838', label: 'Suspended' },
}

export function StatusPill({ status }: { status: AdminStatus }) {
  const s = MAP[status]
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '3px 8px', borderRadius: 999, fontSize: 11, fontWeight: 500,
      background: s.bg, color: s.fg,
    }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: s.dot }} />
      {s.label}
    </span>
  )
}
