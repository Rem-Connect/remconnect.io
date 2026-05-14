'use client'

import { Icon } from '@/components/ui/Icon'

interface AdminTopbarProps {
  crumb: string
  title: string
  right?: React.ReactNode
}

export function AdminTopbar({ crumb, title, right }: AdminTopbarProps) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 28px', background: '#fff', borderBottom: '1px solid #e3e0d2',
      position: 'sticky', top: 0, zIndex: 5,
    }}>
      <div>
        <div style={{ fontSize: 11, color: '#5a6072', fontWeight: 600, letterSpacing: '0.04em' }}>
          {crumb}
        </div>
        <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, fontWeight: 400, letterSpacing: '-0.01em', marginTop: 2 }}>
          {title}
        </div>
      </div>

      {/* Search */}
      <div style={{
        flex: 1, maxWidth: 420, margin: '0 24px',
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '8px 12px', background: '#f3f1ea', borderRadius: 8,
        fontSize: 13, color: '#5a6072',
      }}>
        <Icon name="search" size={14} color="#5a6072" />
        Search admins, permissions, agents…
        <span style={{ marginLeft: 'auto', fontFamily: 'monospace', fontSize: 11, padding: '2px 6px', background: '#fff', borderRadius: 4, border: '1px solid #e3e0d2' }}>
          ⌘K
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {right}
        <button style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 10px',
          borderRadius: 6, border: '1px solid #e3e0d2', background: 'transparent', cursor: 'pointer',
        }}>
          <Icon name="bell" size={14} />
        </button>
      </div>
    </div>
  )
}
