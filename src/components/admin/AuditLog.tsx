'use client'

import { useState } from 'react'
import { Icon } from '@/components/ui/Icon'
import { Avatar } from '@/components/ui/Avatar'
import { TierTag } from './TierTag'
import { AUDIT } from '@/lib/admin-data'
import type { RiskTier } from '@/types/admin'

const TIERS: RiskTier[] = ['low', 'med', 'high', 'critical']

export function AuditLog() {
  const [tierFilter, setTierFilter] = useState<RiskTier | 'all'>('all')
  const [search, setSearch] = useState('')

  const rows = AUDIT.filter(e => {
    if (tierFilter !== 'all' && e.tier !== tierFilter) return false
    if (search) {
      const q = search.toLowerCase()
      return (
        e.who.toLowerCase().includes(q) ||
        e.action.toLowerCase().includes(q) ||
        e.target.toLowerCase().includes(q) ||
        e.role.toLowerCase().includes(q)
      )
    }
    return true
  })

  const tierColors: Record<RiskTier, string> = {
    low:      '#5a6072',
    med:      '#0c3a7a',
    high:     '#c08a2a',
    critical: '#b54838',
  }

  return (
    <div style={{ padding: '28px 32px 48px', maxWidth: 1200, margin: '0 auto' }}>
      {/* Filter bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, flexWrap: 'wrap' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '8px 12px', background: '#fff', border: '1px solid #e3e0d2', borderRadius: 8, minWidth: 280,
        }}>
          <Icon name="search" size={14} color="#8b93a7" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search actions, targets, admin…"
            style={{ border: 'none', outline: 'none', flex: 1, fontSize: 13, background: 'transparent' }}
          />
        </div>

        {/* Tier filter pills */}
        <div style={{ display: 'flex', gap: 4, padding: 3, background: '#f3f1ea', borderRadius: 999, fontSize: 12 }}>
          <button onClick={() => setTierFilter('all')} style={{
            padding: '5px 12px', borderRadius: 999, border: 'none',
            background: tierFilter === 'all' ? '#fff' : 'transparent',
            color: tierFilter === 'all' ? '#0b1220' : '#5a6072',
            fontWeight: 500, cursor: 'pointer',
            boxShadow: tierFilter === 'all' ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
          }}>
            All · {AUDIT.length}
          </button>
          {TIERS.map(t => {
            const n = AUDIT.filter(e => e.tier === t).length
            const active = tierFilter === t
            return (
              <button key={t} onClick={() => setTierFilter(t)} style={{
                padding: '5px 12px', borderRadius: 999, border: 'none',
                background: active ? '#fff' : 'transparent',
                color: active ? tierColors[t] : '#5a6072',
                fontWeight: 500, cursor: 'pointer',
                boxShadow: active ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
              }}>
                {t.charAt(0).toUpperCase() + t.slice(1)} · {n}
              </button>
            )
          })}
        </div>

        <div style={{ marginLeft: 'auto' }}>
          <button style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 12px',
            borderRadius: 6, border: '1px solid #e3e0d2', background: 'transparent', fontSize: 13, cursor: 'pointer',
          }}>
            <Icon name="download" size={14} /> Export SIEM
          </button>
        </div>
      </div>

      {/* Log table */}
      <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '120px minmax(180px, 1fr) 1.6fr 2fr 90px',
          padding: '10px 16px', background: '#f3f1ea',
          fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em',
          fontWeight: 600, color: '#5a6072',
        }}>
          <div>When</div>
          <div>Admin</div>
          <div>Action</div>
          <div>Target</div>
          <div>Tier</div>
        </div>

        {rows.length === 0 ? (
          <div style={{ padding: '40px 16px', textAlign: 'center', fontSize: 13, color: '#5a6072' }}>
            No audit events match your filters.
          </div>
        ) : rows.map((e, i) => (
          <div
            key={e.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '120px minmax(180px, 1fr) 1.6fr 2fr 90px',
              padding: '12px 16px', alignItems: 'center',
              borderTop: '1px solid #e3e0d2',
              background: i % 2 === 1 ? 'rgba(243,241,234,0.3)' : '#fff',
            }}
          >
            <div style={{ fontSize: 11.5, color: '#5a6072', fontFamily: 'monospace' }}>{e.at}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Avatar name={e.who} tone={i} size={26} />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{e.who}</div>
                <div style={{ fontSize: 11, color: '#5a6072', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{e.role}</div>
              </div>
            </div>
            <div style={{ fontSize: 13 }}>{e.action}</div>
            <div style={{ fontSize: 12, color: '#5a6072' }}>{e.target}</div>
            <div><TierTag tier={e.tier} /></div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ marginTop: 14, fontSize: 12, color: '#5a6072', textAlign: 'center' }}>
        Showing {rows.length} of {AUDIT.length} events · Log retention: 365 days
      </div>
    </div>
  )
}
