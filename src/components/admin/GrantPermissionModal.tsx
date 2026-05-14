'use client'

import { useState } from 'react'
import { Icon } from '@/components/ui/Icon'
import { TierTag } from './TierTag'
import { PERMISSIONS, roleById } from '@/lib/admin-data'
import type { AdminUser } from '@/types/admin'

interface Props {
  admin: AdminUser
  onClose: () => void
  onGrant: (permId: string, reason: string, expiry: string | null) => void
}

const EXPIRY_MAP: Record<string, string> = {
  '1':     '1 day',
  '7':     '7 days',
  '30':    '30 days',
  'never': 'No expiry (permanent)',
}

export function GrantPermissionModal({ admin, onClose, onGrant }: Props) {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<string | null>(null)
  const [reason, setReason] = useState('')
  const [expiry, setExpiry] = useState('7')

  const role = roleById(admin.role)
  const candidates = PERMISSIONS
    .filter(p => !role?.perms.includes(p.id))
    .filter(p =>
      p.label.toLowerCase().includes(search.toLowerCase()) ||
      p.domain.toLowerCase().includes(search.toLowerCase())
    )

  const sel = selected ? PERMISSIONS.find(p => p.id === selected) : null
  const canGrant = sel && reason.trim().length >= 3

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(11,18,32,0.6)', zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff', borderRadius: 12, width: 640, maxWidth: '100%', maxHeight: '90vh',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
          boxShadow: '0 24px 60px rgba(11,18,32,0.4)',
        }}
      >
        {/* Header */}
        <div style={{ padding: '18px 22px', borderBottom: '1px solid #e3e0d2', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, color: '#c08a2a' }}>
              Super-admin action
            </div>
            <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, fontWeight: 400, marginTop: 2 }}>
              Grant manual permission to {admin.name}
            </div>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#5a6072' }}>
            <Icon name="x" size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: 22, overflowY: 'auto', flex: 1 }}>
          <div style={{ fontSize: 13, color: '#5a6072', marginBottom: 12 }}>
            Grants a single permission on top of the{' '}
            <strong style={{ color: role?.color }}>{role?.title}</strong> preset.
            Every manual grant is written to the audit log with your name attached.
          </div>

          <div style={{ marginBottom: 8, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, color: '#5a6072' }}>
            1 · Choose permission
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 12px', border: '1px solid #e3e0d2', borderRadius: 6, marginBottom: 10,
          }}>
            <Icon name="search" size={14} color="#8b93a7" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search permission or domain…"
              style={{ flex: 1, border: 'none', outline: 'none', fontSize: 13, background: 'transparent' }}
            />
          </div>
          <div style={{ maxHeight: 200, overflowY: 'auto', border: '1px solid #e3e0d2', borderRadius: 6 }}>
            {candidates.length === 0 ? (
              <div style={{ padding: 20, textAlign: 'center', fontSize: 12, color: '#5a6072' }}>
                No permissions match — this admin's role already covers everything.
              </div>
            ) : candidates.map((p) => {
              const isSel = selected === p.id
              return (
                <div
                  key={p.id}
                  onClick={() => setSelected(p.id)}
                  style={{
                    padding: '10px 12px', cursor: 'pointer', borderBottom: '1px solid #e3e0d2',
                    background: isSel ? 'rgba(29,111,214,0.08)' : '#fff',
                    display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 10, alignItems: 'center',
                  }}
                >
                  <div style={{
                    width: 16, height: 16, borderRadius: '50%',
                    border: '2px solid ' + (isSel ? '#c08a2a' : '#e3e0d2'),
                    background: isSel ? '#c08a2a' : '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    {isSel && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 500 }}>{p.label}</span>
                      <span style={{ fontSize: 11, color: '#5a6072', fontFamily: 'monospace' }}>{p.domain}</span>
                    </div>
                    <div style={{ fontSize: 11.5, color: '#5a6072', marginTop: 1 }}>{p.desc}</div>
                  </div>
                  <TierTag tier={p.tier} />
                </div>
              )
            })}
          </div>

          {sel && (
            <>
              <div style={{ marginTop: 16, marginBottom: 8, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, color: '#5a6072' }}>
                2 · Justification
              </div>
              <textarea
                value={reason}
                onChange={e => setReason(e.target.value)}
                placeholder="Why does this person need this permission? (required, logged to audit)"
                style={{
                  width: '100%', minHeight: 70, padding: '10px 12px',
                  border: '1px solid #e3e0d2', borderRadius: 6, fontSize: 13,
                  fontFamily: 'inherit', resize: 'vertical',
                }}
              />

              <div style={{ marginTop: 14, marginBottom: 8, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, color: '#5a6072' }}>
                3 · Duration
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                {Object.entries(EXPIRY_MAP).map(([k, l]) => (
                  <button key={k} onClick={() => setExpiry(k)} style={{
                    flex: 1, padding: '8px 10px', fontSize: 12,
                    border: '1px solid ' + (expiry === k ? '#0b1220' : '#e3e0d2'),
                    background: expiry === k ? '#0b1220' : '#fff',
                    color: expiry === k ? '#fff' : '#0b1220',
                    borderRadius: 6, cursor: 'pointer',
                  }}>
                    {l}
                  </button>
                ))}
              </div>

              {(sel.tier === 'critical' || sel.tier === 'high') && (
                <div style={{
                  marginTop: 14, padding: 12,
                  background: 'rgba(181,72,56,0.06)', border: '1px solid rgba(181,72,56,0.2)',
                  borderRadius: 6, fontSize: 12, color: '#b54838',
                }}>
                  <Icon name="info" size={12} />
                  {' '}
                  <strong>{sel.tier === 'critical' ? 'Critical' : 'High'}-tier permission.</strong>
                  {' '}This grant will be flagged in the audit log and an alert sent to all Super Admins.
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '14px 22px', borderTop: '1px solid #e3e0d2',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div style={{ fontSize: 11.5, color: '#5a6072' }}>
            Will be logged as granted by <strong>Meron Tadesse</strong>.
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={onClose} style={{
              padding: '7px 14px', borderRadius: 6, border: '1px solid #e3e0d2',
              background: 'transparent', fontSize: 13, cursor: 'pointer',
            }}>
              Cancel
            </button>
            <button
              disabled={!canGrant}
              onClick={() => {
                if (canGrant && sel) {
                  onGrant(sel.id, reason.trim(), expiry === 'never' ? null : `in ${EXPIRY_MAP[expiry]}`)
                }
              }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '7px 14px', borderRadius: 6, border: 'none',
                background: '#c08a2a', color: '#fff', fontSize: 13, cursor: canGrant ? 'pointer' : 'not-allowed',
                fontWeight: 500, opacity: canGrant ? 1 : 0.4,
              }}
            >
              <Icon name="check" size={14} color="#fff" /> Grant permission
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
