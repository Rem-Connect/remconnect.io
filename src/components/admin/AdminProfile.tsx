'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Icon } from '@/components/ui/Icon'
import { Avatar } from '@/components/ui/Avatar'
import { StatusPill } from './StatusPill'
import { RoleChip } from './RoleChip'
import { TierTag } from './TierTag'
import { GrantPermissionModal } from './GrantPermissionModal'
import { PERMISSIONS, DOMAINS, AUDIT, roleById, effectivePerms } from '@/lib/admin-data'
import { useAdmin } from '@/context/AdminContext'
import type { AdminUser } from '@/types/admin'

const CURRENT_USER_ROLE = 'super'

export function AdminProfile({ adminId }: { adminId: string }) {
  const router = useRouter()
  const { admins, updateAdmin } = useAdmin()
  const admin = admins.find(a => a.id === adminId)
  const [showGrant, setShowGrant] = useState(false)

  if (!admin) return (
    <div style={{ padding: 60, textAlign: 'center', color: '#5a6072' }}>Admin not found.</div>
  )

  const role = roleById(admin.role)!
  const eff = effectivePerms(admin)
  const isSuper = CURRENT_USER_ROLE === 'super'
  const overrideCount = Object.keys(admin.overrides).length
  const manualGrants = Object.entries(admin.overrides).filter(([pid, v]) => v === true && !role.perms.includes(pid))
  const adminActions = AUDIT.filter(e => e.who === admin.name).slice(0, 5)

  const toggleOverride = (permId: string) => {
    const curr = admin.overrides[permId]
    const next = { ...admin.overrides }
    if (curr === undefined) {
      next[permId] = !role.perms.includes(permId)
    } else {
      delete next[permId]
    }
    updateAdmin({ ...admin, overrides: next })
  }

  const addManualGrant = (permId: string, reason: string, expiry: string | null) => {
    const next = { ...admin.overrides, [permId]: true }
    const meta = {
      ...(admin.overrideMeta || {}),
      [permId]: { reason, expiry, by: 'Meron Tadesse', at: 'just now' },
    }
    updateAdmin({ ...admin, overrides: next, overrideMeta: meta })
  }

  return (
    <div style={{ padding: '24px 32px 48px', maxWidth: 1280, margin: '0 auto' }}>
      <button
        onClick={() => router.push('/admin/admins')}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none',
          border: 'none', color: '#5a6072', fontSize: 12, cursor: 'pointer', padding: 0, marginBottom: 14,
        }}
      >
        <Icon name="arrow-right" size={12} style={{ transform: 'rotate(180deg)' }} />
        Back to admins
      </button>

      {/* Header card */}
      <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, padding: 24, marginBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
          <Avatar name={admin.name} tone={3} size={72} />
          <div style={{ flex: 1, minWidth: 240 }}>
            <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 30, fontWeight: 400, letterSpacing: '-0.02em' }}>
              {admin.name}
            </div>
            <div style={{ color: '#5a6072', fontSize: 13, marginTop: 2 }}>
              {admin.email} · joined {admin.joined}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
              <RoleChip roleId={admin.role} />
              <StatusPill status={admin.status} />
              {admin.mfa
                ? <span style={{ fontSize: 11, color: '#2f8d5c', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <Icon name="check" size={12} color="#2f8d5c" /> MFA on
                  </span>
                : <span style={{ fontSize: 11, color: '#b54838', fontWeight: 600 }}>⚠ MFA off</span>}
              <span style={{ fontSize: 12, color: '#5a6072' }}>Last active {admin.last}</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {isSuper && (
              <button
                onClick={() => setShowGrant(true)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px',
                  borderRadius: 6, border: 'none', background: '#c08a2a', color: '#fff',
                  fontSize: 13, cursor: 'pointer', fontWeight: 500,
                }}
              >
                <Icon name="plus" size={14} color="#fff" /> Grant manual permission
              </button>
            )}
            <button style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 6, border: '1px solid #e3e0d2', background: 'transparent', fontSize: 13, cursor: 'pointer' }}>
              <Icon name="mail" size={14} /> Message
            </button>
            <button style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 6, border: '1px solid rgba(181,72,56,0.3)', background: 'transparent', fontSize: 13, cursor: 'pointer', color: '#b54838' }}>
              Suspend
            </button>
            <button style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 6, border: 'none', background: '#0b1220', color: '#fff', fontSize: 13, cursor: 'pointer', fontWeight: 500 }}>
              Save changes
            </button>
          </div>
        </div>
      </div>

      {/* Manual grants callout */}
      {isSuper && manualGrants.length > 0 && (
        <div style={{
          border: '1px solid #e3e0d2', borderRadius: 10, padding: 16,
          marginBottom: 18, borderLeft: '3px solid #c08a2a', background: 'rgba(192,138,42,0.04)',
        }}>
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, color: '#c08a2a', marginBottom: 2 }}>
              Manual grants · super-admin only
            </div>
            <div style={{ fontSize: 13 }}>
              <strong>{manualGrants.length}</strong> permission{manualGrants.length > 1 ? 's' : ''} granted outside this admin's role preset.
            </div>
          </div>
          <div style={{ display: 'grid', gap: 6 }}>
            {manualGrants.map(([pid]) => {
              const p = PERMISSIONS.find(x => x.id === pid)
              const meta = (admin.overrideMeta || {})[pid]
              if (!p) return null
              return (
                <div key={pid} style={{
                  display: 'grid', gridTemplateColumns: '1fr auto', gap: 10, alignItems: 'center',
                  padding: '8px 10px', background: '#fff', borderRadius: 6, border: '1px solid #e3e0d2',
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <TierTag tier={p.tier} />
                      <span style={{ fontSize: 13, fontWeight: 500 }}>{p.label}</span>
                      <span style={{ fontSize: 11, color: '#5a6072', fontFamily: 'monospace' }}>{p.domain}</span>
                    </div>
                    {meta && (
                      <div style={{ fontSize: 11.5, color: '#5a6072', marginTop: 3 }}>
                        "{meta.reason}" · granted by {meta.by} · {meta.at}
                        {meta.expiry && <> · expires {meta.expiry}</>}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => toggleOverride(pid)}
                    style={{ padding: '4px 10px', fontSize: 12, borderRadius: 6, border: '1px solid #e3e0d2', background: 'transparent', cursor: 'pointer' }}
                  >
                    Revoke
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: 18 }}>
        {/* Permissions */}
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
            <div>
              <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22 }}>Effective permissions</div>
              <div style={{ fontSize: 12, color: '#5a6072', marginTop: 2 }}>
                <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{eff.size}</span> of {PERMISSIONS.length} · inherits from{' '}
                <span style={{ color: role.color, fontWeight: 600 }}>{role.title}</span>
                {overrideCount > 0 && <> · <span style={{ color: '#c08a2a', fontWeight: 600 }}>{overrideCount} override{overrideCount > 1 ? 's' : ''}</span></>}
              </div>
            </div>
            <button
              onClick={() => updateAdmin({ ...admin, overrides: {}, overrideMeta: {} })}
              style={{ padding: '4px 10px', fontSize: 12, borderRadius: 6, border: '1px solid #e3e0d2', background: 'transparent', cursor: 'pointer' }}
            >
              Reset to role default
            </button>
          </div>
          <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10 }}>
            {DOMAINS.map((d) => {
              const group = PERMISSIONS.filter(p => p.domain === d)
              if (!group.length) return null
              return (
                <div key={d} style={{ borderTop: '1px solid #e3e0d2' }}>
                  <div style={{ padding: '10px 16px', background: '#f3f1ea', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, color: '#5a6072' }}>
                    {d}
                  </div>
                  {group.map((p) => {
                    const roleHas = role.perms.includes(p.id)
                    const override = admin.overrides[p.id]
                    const has = eff.has(p.id)
                    const overridden = override !== undefined
                    return (
                      <div key={p.id} style={{
                        display: 'grid', gridTemplateColumns: '1fr 120px 150px',
                        alignItems: 'center', padding: '10px 16px',
                        borderTop: '1px solid #e3e0d2',
                        background: overridden ? 'rgba(192,138,42,0.04)' : '#fff',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <TierTag tier={p.tier} />
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 500 }}>{p.label}</div>
                            <div style={{ fontSize: 11.5, color: '#5a6072', marginTop: 1 }}>{p.desc}</div>
                          </div>
                        </div>
                        <div style={{ fontSize: 11, color: '#5a6072' }}>
                          {roleHas ? 'Role: granted' : 'Role: —'}
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <button
                            disabled={!isSuper}
                            onClick={() => isSuper && toggleOverride(p.id)}
                            style={{
                              display: 'inline-flex', alignItems: 'center', gap: 6,
                              padding: '5px 10px', borderRadius: 6, fontSize: 12, fontWeight: 500,
                              cursor: isSuper ? 'pointer' : 'not-allowed', opacity: isSuper ? 1 : 0.6,
                              border: '1px solid ' + (has ? (overridden ? '#c08a2a' : role.color + '55') : '#e3e0d2'),
                              background: has
                                ? (overridden ? 'rgba(192,138,42,0.12)' : role.color + '12')
                                : (overridden ? 'rgba(181,72,56,0.08)' : '#fff'),
                              color: has ? (overridden ? '#c08a2a' : role.color) : '#5a6072',
                            }}
                          >
                            {has
                              ? <><Icon name="check" size={12} /> {overridden ? 'Granted (manual)' : 'Granted'}</>
                              : (overridden ? 'Revoked (manual)' : 'Not granted')}
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'grid', gap: 18, alignContent: 'start' }}>
          <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, padding: 20 }}>
            <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 18, marginBottom: 6 }}>Recent actions</div>
            <div style={{ fontSize: 12, color: '#5a6072', marginBottom: 12 }}>What this admin has done recently.</div>
            {adminActions.length ? adminActions.map((e, i) => (
              <div key={e.id} style={{ padding: '10px 0', borderTop: i ? '1px solid #e3e0d2' : 'none' }}>
                <div style={{ fontSize: 12.5, fontWeight: 500 }}>{e.action}</div>
                <div style={{ fontSize: 11.5, color: '#5a6072', marginTop: 2 }}>{e.target}</div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 5 }}>
                  <span style={{ fontSize: 10, fontFamily: 'monospace', color: '#5a6072' }}>{e.at}</span>
                  <TierTag tier={e.tier} />
                </div>
              </div>
            )) : (
              <div style={{ fontSize: 12, color: '#5a6072', padding: '14px 0', textAlign: 'center' }}>
                No recent activity for this admin.
              </div>
            )}
          </div>

          <div style={{ background: '#fff', border: '1px solid rgba(181,72,56,0.2)', borderRadius: 10, padding: 20 }}>
            <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, color: '#b54838', marginBottom: 10 }}>
              Danger zone
            </div>
            <div style={{ display: 'grid', gap: 8 }}>
              <button style={{ textAlign: 'left', padding: '8px 12px', borderRadius: 6, border: '1px solid #e3e0d2', background: 'transparent', fontSize: 13, cursor: 'pointer' }}>
                Force MFA re-enrollment
              </button>
              <button style={{ textAlign: 'left', padding: '8px 12px', borderRadius: 6, border: '1px solid #e3e0d2', background: 'transparent', fontSize: 13, cursor: 'pointer' }}>
                Revoke all sessions
              </button>
              <button style={{ textAlign: 'left', padding: '8px 12px', borderRadius: 6, border: '1px solid rgba(181,72,56,0.3)', background: 'transparent', fontSize: 13, cursor: 'pointer', color: '#b54838' }}>
                Remove admin access…
              </button>
            </div>
          </div>
        </div>
      </div>

      {showGrant && (
        <GrantPermissionModal
          admin={admin}
          onClose={() => setShowGrant(false)}
          onGrant={(pid, reason, expiry) => { addManualGrant(pid, reason, expiry); setShowGrant(false) }}
        />
      )}
    </div>
  )
}
