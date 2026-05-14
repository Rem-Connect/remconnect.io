'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Icon } from '@/components/ui/Icon'
import { Avatar } from '@/components/ui/Avatar'
import { StatusPill } from './StatusPill'
import { RoleChip } from './RoleChip'
import { TierTag } from './TierTag'
import { ROLES, PERMISSIONS, effectivePerms } from '@/lib/admin-data'
import type { AdminUser } from '@/types/admin'

interface Props {
  admins: AdminUser[]
}

export function AdminAccounts({ admins }: Props) {
  const router = useRouter()
  const [q, setQ] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')

  const rows = admins.filter(a =>
    (roleFilter === 'all' || a.role === roleFilter) &&
    (q === '' || a.name.toLowerCase().includes(q.toLowerCase()) || a.email.toLowerCase().includes(q.toLowerCase()))
  )

  return (
    <div style={{ padding: '28px 32px 48px', maxWidth: 1280, margin: '0 auto' }}>
      {/* Filter bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '8px 12px', background: '#fff', border: '1px solid #e3e0d2', borderRadius: 8, minWidth: 280,
        }}>
          <Icon name="search" size={14} color="#8b93a7" />
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Search name or email…"
            style={{ border: 'none', outline: 'none', flex: 1, fontSize: 13, background: 'transparent' }}
          />
        </div>

        <div style={{ display: 'flex', gap: 4, padding: 3, background: '#f3f1ea', borderRadius: 999, fontSize: 12 }}>
          <button onClick={() => setRoleFilter('all')} style={{
            padding: '5px 12px', borderRadius: 999, border: 'none',
            background: roleFilter === 'all' ? '#fff' : 'transparent',
            color: roleFilter === 'all' ? '#0b1220' : '#5a6072',
            fontWeight: 500, cursor: 'pointer',
            boxShadow: roleFilter === 'all' ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
          }}>
            All · {admins.length}
          </button>
          {ROLES.slice(0, 6).map(r => {
            const n = admins.filter(a => a.role === r.id).length
            const active = roleFilter === r.id
            return (
              <button key={r.id} onClick={() => setRoleFilter(r.id)} style={{
                padding: '5px 12px', borderRadius: 999, border: 'none',
                background: active ? '#fff' : 'transparent',
                color: active ? '#0b1220' : '#5a6072',
                fontWeight: 500, cursor: 'pointer',
                boxShadow: active ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
              }}>
                {r.title} · {n}
              </button>
            )
          })}
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <button style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 12px',
            borderRadius: 6, border: '1px solid #e3e0d2', background: 'transparent', fontSize: 13, cursor: 'pointer',
          }}>
            <Icon name="download" size={14} /> Export CSV
          </button>
          <button
            onClick={() => router.push('/admin/invite')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 14px',
              borderRadius: 6, border: 'none', background: '#1d6fd6', color: '#fff', fontSize: 13, cursor: 'pointer', fontWeight: 500,
            }}
          >
            <Icon name="plus" size={14} color="#fff" /> Invite admin
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(220px, 1.4fr) 1.2fr 0.7fr 0.9fr 0.6fr 120px',
          padding: '10px 14px', background: '#f3f1ea',
          fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em',
          fontWeight: 600, color: '#5a6072',
        }}>
          <div>Admin</div><div>Role</div><div>Permissions</div><div>Last active</div><div>Status</div><div></div>
        </div>

        {rows.map((a, i) => {
          const eff = effectivePerms(a)
          const overrideCount = Object.keys(a.overrides || {}).length
          return (
            <div
              key={a.id}
              onClick={() => router.push(`/admin/admins/${a.id}`)}
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(220px, 1.4fr) 1.2fr 0.7fr 0.9fr 0.6fr 120px',
                padding: '12px 14px', alignItems: 'center',
                borderTop: '1px solid #e3e0d2',
                cursor: 'pointer',
                background: i % 2 === 1 ? 'rgba(243,241,234,0.35)' : '#fff',
                transition: 'background 0.1s',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#f3f1ea'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = i % 2 === 1 ? 'rgba(243,241,234,0.35)' : '#fff'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Avatar name={a.name} tone={i} size={30} />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{a.name}</div>
                  <div style={{ fontSize: 11.5, color: '#5a6072' }}>{a.email}</div>
                </div>
                {!a.mfa && (
                  <span style={{
                    marginLeft: 4, fontSize: 10, color: '#b54838', fontWeight: 600,
                    padding: '1px 6px', border: '1px solid rgba(181,72,56,0.3)', borderRadius: 3,
                  }}>NO MFA</span>
                )}
              </div>
              <div><RoleChip roleId={a.role} size="sm" /></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 600 }}>{eff.size}</span>
                <span style={{ color: '#5a6072', fontSize: 11 }}>/ {PERMISSIONS.length}</span>
                {overrideCount > 0 && (
                  <span style={{
                    fontSize: 10, padding: '1px 6px', background: 'rgba(29,111,214,0.12)',
                    color: '#0c3a7a', borderRadius: 3, fontWeight: 600,
                  }}>
                    +{overrideCount} override{overrideCount > 1 ? 's' : ''}
                  </span>
                )}
              </div>
              <div style={{ fontSize: 12, color: '#5a6072' }}>{a.last}</div>
              <div><StatusPill status={a.status} /></div>
              <div style={{ textAlign: 'right' }}>
                <button
                  style={{
                    padding: '4px 10px', fontSize: 12, borderRadius: 6,
                    border: '1px solid #e3e0d2', background: 'transparent', cursor: 'pointer',
                  }}
                  onClick={e => { e.stopPropagation(); router.push(`/admin/admins/${a.id}`) }}
                >
                  Manage
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
