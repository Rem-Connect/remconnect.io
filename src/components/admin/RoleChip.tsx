'use client'

import { roleById } from '@/lib/admin-data'

export function RoleChip({ roleId, size = 'md' }: { roleId: string; size?: 'sm' | 'md' }) {
  const r = roleById(roleId)
  if (!r) return null
  const small = size === 'sm'
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: small ? '2px 8px' : '4px 10px', borderRadius: 4,
      fontSize: small ? 11 : 12, fontWeight: 500,
      background: r.color + '18', color: r.color, border: `1px solid ${r.color}33`,
      flexShrink: 0,
    }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: r.color }} />
      {r.title}
    </span>
  )
}
