'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Icon } from '@/components/ui/Icon'
import { Avatar } from '@/components/ui/Avatar'
import { ScoreRing } from '@/components/ui/ScoreRing'
import { SAMPLE_AGENTS } from '@/lib/admin-data'
import type { SampleAgent } from '@/types/admin'

type View = 'table' | 'cards'
type Status = SampleAgent['status'] | 'all'

const STATUS_LABELS: Record<SampleAgent['status'], string> = {
  deployed: 'Deployed',
  bench: 'On bench',
  assess: 'In assessment',
  recruit: 'Recruiting',
}

const STATUS_COLORS: Record<SampleAgent['status'], { bg: string; fg: string }> = {
  deployed: { bg: 'rgba(47,141,92,0.12)', fg: '#2f8d5c' },
  bench:    { bg: 'rgba(29,111,214,0.1)', fg: '#1d6fd6' },
  assess:   { bg: 'rgba(192,138,42,0.12)', fg: '#c08a2a' },
  recruit:  { bg: 'rgba(90,96,114,0.1)', fg: '#5a6072' },
}

function StatusBadge({ status }: { status: SampleAgent['status'] }) {
  const c = STATUS_COLORS[status]
  return (
    <span style={{
      display: 'inline-block', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600,
      background: c.bg, color: c.fg,
    }}>
      {STATUS_LABELS[status]}
    </span>
  )
}

export function AgentDirectory() {
  const router = useRouter()
  const [view, setView] = useState<View>('table')
  const [stealth, setStealth] = useState(false)
  const [statusFilter, setStatusFilter] = useState<Status>('all')
  const [search, setSearch] = useState('')

  const rows = SAMPLE_AGENTS.filter(a => {
    if (statusFilter !== 'all' && a.status !== statusFilter) return false
    if (search) {
      const q = search.toLowerCase()
      return (
        a.name.toLowerCase().includes(q) ||
        a.role.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q) ||
        a.client.toLowerCase().includes(q)
      )
    }
    return true
  })

  const statuses: Status[] = ['all', 'deployed', 'bench', 'assess', 'recruit']

  return (
    <div style={{ padding: '28px 32px 48px', maxWidth: 1280, margin: '0 auto' }}>
      {/* Filter bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, flexWrap: 'wrap' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '8px 12px', background: '#fff', border: '1px solid #e3e0d2', borderRadius: 8, minWidth: 260,
        }}>
          <Icon name="search" size={14} color="#8b93a7" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search name, role, client, ID…"
            style={{ border: 'none', outline: 'none', flex: 1, fontSize: 13, background: 'transparent' }}
          />
        </div>

        <div style={{ display: 'flex', gap: 4, padding: 3, background: '#f3f1ea', borderRadius: 999, fontSize: 12 }}>
          {statuses.map(s => {
            const n = s === 'all' ? SAMPLE_AGENTS.length : SAMPLE_AGENTS.filter(a => a.status === s).length
            const active = statusFilter === s
            return (
              <button key={s} onClick={() => setStatusFilter(s)} style={{
                padding: '5px 12px', borderRadius: 999, border: 'none',
                background: active ? '#fff' : 'transparent',
                color: active ? '#0b1220' : '#5a6072',
                fontWeight: 500, cursor: 'pointer',
                boxShadow: active ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
              }}>
                {s === 'all' ? 'All' : STATUS_LABELS[s as SampleAgent['status']]} · {n}
              </button>
            )
          })}
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
          {/* Stealth toggle */}
          <button
            onClick={() => setStealth(s => !s)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7, padding: '7px 12px',
              borderRadius: 6, border: `1px solid ${stealth ? '#c08a2a66' : '#e3e0d2'}`,
              background: stealth ? 'rgba(192,138,42,0.08)' : 'transparent',
              fontSize: 12, cursor: 'pointer', color: stealth ? '#c08a2a' : '#5a6072', fontWeight: 500,
            }}
          >
            <Icon name={stealth ? 'eye-off' : 'eye'} size={13} color={stealth ? '#c08a2a' : '#5a6072'} />
            {stealth ? 'Stealth ON' : 'Stealth OFF'}
          </button>

          {/* View toggle */}
          <div style={{ display: 'flex', background: '#f3f1ea', borderRadius: 7, padding: 3, gap: 2 }}>
            {(['table', 'cards'] as View[]).map(v => (
              <button key={v} onClick={() => setView(v)} style={{
                padding: '5px 10px', borderRadius: 5, border: 'none', fontSize: 12, cursor: 'pointer',
                background: view === v ? '#fff' : 'transparent',
                color: view === v ? '#0b1220' : '#5a6072',
                boxShadow: view === v ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
              }}>
                <Icon name={v === 'table' ? 'list' : 'grid'} size={12} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {stealth && (
        <div style={{
          marginBottom: 16, padding: '10px 14px', borderRadius: 8,
          background: 'rgba(192,138,42,0.07)', border: '1px solid rgba(192,138,42,0.3)',
          fontSize: 12, color: '#c08a2a', fontWeight: 500,
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <Icon name="eye-off" size={13} color="#c08a2a" />
          Stealth mode — client-safe view active. PII and internal data hidden.
        </div>
      )}

      {/* Table view */}
      {view === 'table' && (
        <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, overflow: 'hidden' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(200px, 1.4fr) 1fr 0.8fr 0.8fr 80px 80px 100px',
            padding: '10px 14px', background: '#f3f1ea',
            fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em',
            fontWeight: 600, color: '#5a6072',
          }}>
            <div>Agent</div>
            <div>Role</div>
            <div>Client</div>
            <div>Score</div>
            <div>Certs</div>
            <div>Status</div>
            <div></div>
          </div>

          {rows.map((a, i) => (
            <div
              key={a.id}
              onClick={() => router.push(`/admin/agents/${a.id}`)}
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(200px, 1.4fr) 1fr 0.8fr 0.8fr 80px 80px 100px',
                padding: '12px 14px', alignItems: 'center',
                borderTop: '1px solid #e3e0d2', cursor: 'pointer',
                background: i % 2 === 1 ? 'rgba(243,241,234,0.3)' : '#fff',
                transition: 'background 0.1s',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#f3f1ea'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = i % 2 === 1 ? 'rgba(243,241,234,0.3)' : '#fff'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Avatar name={a.name} tone={i} size={30} />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{stealth ? a.name.split(' ')[0] + ' ' + a.name.split(' ').slice(1).map(w => w[0] + '.').join(' ') : a.name}</div>
                  <div style={{ fontSize: 11, color: '#5a6072', fontFamily: 'monospace' }}>{a.id}</div>
                </div>
              </div>
              <div style={{ fontSize: 12, color: '#5a6072' }}>{a.role}</div>
              <div style={{ fontSize: 12 }}>{stealth && a.client !== '—' ? '••••' : a.client}</div>
              <div>
                {a.score > 0 ? (
                  <span style={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 700, color: a.score >= 90 ? '#2f8d5c' : a.score >= 80 ? '#c08a2a' : '#5a6072' }}>
                    {a.score}
                  </span>
                ) : <span style={{ fontSize: 11, color: '#8b93a7' }}>—</span>}
              </div>
              <div style={{ fontSize: 12, fontFamily: 'monospace', fontWeight: 600 }}>{a.certs}</div>
              <div><StatusBadge status={a.status} /></div>
              <div style={{ textAlign: 'right' }}>
                <button
                  style={{ padding: '4px 10px', fontSize: 12, borderRadius: 6, border: '1px solid #e3e0d2', background: 'transparent', cursor: 'pointer' }}
                  onClick={e => { e.stopPropagation(); router.push(`/admin/agents/${a.id}`) }}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cards view */}
      {view === 'cards' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
          {rows.map((a, i) => (
            <div
              key={a.id}
              onClick={() => router.push(`/admin/agents/${a.id}`)}
              style={{
                background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10,
                padding: 18, cursor: 'pointer', transition: 'border-color 0.1s',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = '#1d6fd6'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = '#e3e0d2'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <Avatar name={a.name} tone={i} size={40} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600 }}>
                    {stealth ? a.name.split(' ')[0] + ' ' + a.name.split(' ').slice(1).map(w => w[0] + '.').join(' ') : a.name}
                  </div>
                  <div style={{ fontSize: 12, color: '#5a6072' }}>{a.role}</div>
                  <div style={{ fontSize: 11, color: '#8b93a7', fontFamily: 'monospace' }}>{a.id}</div>
                </div>
                {a.score > 0 && (
                  <ScoreRing value={a.score} size={40} />
                )}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
                {a.langs.map(l => (
                  <span key={l} style={{ padding: '2px 6px', background: '#f3f1ea', borderRadius: 3, fontSize: 11, fontFamily: 'monospace', color: '#5a6072' }}>{l}</span>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <StatusBadge status={a.status} />
                <div style={{ fontSize: 11.5, color: '#5a6072' }}>
                  {stealth && a.client !== '—' ? '••••' : a.client !== '—' ? a.client : 'Unassigned'}
                  {!stealth && <span style={{ color: '#8b93a7' }}> · ${a.rate}/hr</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
