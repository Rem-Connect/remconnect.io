'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Icon } from '@/components/ui/Icon'
import { TierTag } from './TierTag'
import { RoleChip } from './RoleChip'
import { ROLES, PERMISSIONS, DOMAINS, roleById } from '@/lib/admin-data'

type Step = 1 | 2 | 3 | 4

export function InviteAdmin() {
  const router = useRouter()
  const [step, setStep] = useState<Step>(1)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [roleId, setRoleId] = useState('')
  const [overrides, setOverrides] = useState<Record<string, boolean>>({})
  const [note, setNote] = useState('')
  const [sent, setSent] = useState(false)

  const role = roleId ? roleById(roleId) : null

  const toggleOverride = (permId: string) => {
    const hasFromRole = role?.perms.includes(permId) ?? false
    setOverrides(prev => {
      const next = { ...prev }
      if (next[permId] === undefined) {
        next[permId] = !hasFromRole
      } else {
        delete next[permId]
      }
      return next
    })
  }

  const effectiveHas = (permId: string): boolean => {
    const hasFromRole = role?.perms.includes(permId) ?? false
    if (overrides[permId] === true) return true
    if (overrides[permId] === false) return false
    return hasFromRole
  }

  const overrideCount = Object.keys(overrides).length

  if (sent) {
    return (
      <div style={{ padding: '60px 32px', maxWidth: 540, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(47,141,92,0.1)', border: '1px solid rgba(47,141,92,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
          <Icon name="check" size={24} color="#2f8d5c" />
        </div>
        <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 26, marginBottom: 8 }}>Invite sent</div>
        <div style={{ fontSize: 14, color: '#5a6072', marginBottom: 24 }}>
          An invitation was sent to <strong>{email}</strong> with the{' '}
          <strong>{role?.title}</strong> role{overrideCount > 0 ? ` and ${overrideCount} override${overrideCount > 1 ? 's' : ''}` : ''}.
        </div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          <button
            onClick={() => router.push('/admin/admins')}
            style={{ padding: '8px 18px', borderRadius: 6, border: '1px solid #e3e0d2', background: 'transparent', fontSize: 13, cursor: 'pointer' }}
          >
            View admin list
          </button>
          <button
            onClick={() => { setName(''); setEmail(''); setRoleId(''); setOverrides({}); setNote(''); setStep(1); setSent(false) }}
            style={{ padding: '8px 18px', borderRadius: 6, border: 'none', background: '#0b1220', color: '#fff', fontSize: 13, cursor: 'pointer', fontWeight: 500 }}
          >
            Send another
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '28px 32px 48px', maxWidth: 760, margin: '0 auto' }}>
      <button
        onClick={() => router.push('/admin/admins')}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#5a6072', fontSize: 12, cursor: 'pointer', padding: 0, marginBottom: 18 }}
      >
        <Icon name="arrow-right" size={12} style={{ transform: 'rotate(180deg)' }} />
        Back to admins
      </button>

      {/* Step indicators */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 28, background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, overflow: 'hidden' }}>
        {([
          { n: 1, label: 'Identity' },
          { n: 2, label: 'Role' },
          { n: 3, label: 'Overrides' },
          { n: 4, label: 'Review' },
        ] as { n: Step; label: string }[]).map(({ n, label }, i) => {
          const done = step > n
          const active = step === n
          return (
            <div
              key={n}
              style={{
                flex: 1, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10,
                borderRight: i < 3 ? '1px solid #e3e0d2' : 'none',
                background: active ? 'rgba(29,111,214,0.06)' : '#fff',
                cursor: done ? 'pointer' : 'default',
              }}
              onClick={() => done && setStep(n)}
            >
              <div style={{
                width: 22, height: 22, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700,
                background: done ? '#2f8d5c' : (active ? '#1d6fd6' : '#e3e0d2'),
                color: done || active ? '#fff' : '#5a6072',
              }}>
                {done ? '✓' : n}
              </div>
              <div>
                <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600, color: active ? '#1d6fd6' : (done ? '#2f8d5c' : '#5a6072') }}>
                  Step {n}
                </div>
                <div style={{ fontSize: 13, fontWeight: 500, color: active ? '#0b1220' : '#5a6072' }}>{label}</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Step 1: Identity */}
      {step === 1 && (
        <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, padding: 28 }}>
          <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, marginBottom: 6 }}>Who are you inviting?</div>
          <div style={{ fontSize: 13, color: '#5a6072', marginBottom: 22 }}>They'll receive an email to set up their account.</div>

          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#5a6072', display: 'block', marginBottom: 6 }}>Full name</label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Hanna Wolde"
                style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #e3e0d2', fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#5a6072', display: 'block', marginBottom: 6 }}>Work email</label>
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@remconnect.io"
                type="email"
                style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #e3e0d2', fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#5a6072', display: 'block', marginBottom: 6 }}>Note (optional)</label>
              <textarea
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="Context for the audit log…"
                style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #e3e0d2', fontSize: 13, resize: 'vertical', minHeight: 70, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Role */}
      {step === 2 && (
        <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, padding: 28 }}>
          <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, marginBottom: 6 }}>Choose a role</div>
          <div style={{ fontSize: 13, color: '#5a6072', marginBottom: 22 }}>
            The role sets their default permission set. You can fine-tune in the next step.
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            {ROLES.map(r => {
              const active = roleId === r.id
              return (
                <div
                  key={r.id}
                  onClick={() => setRoleId(r.id)}
                  style={{
                    display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 14, alignItems: 'center',
                    padding: '12px 16px', borderRadius: 8, cursor: 'pointer',
                    border: `1px solid ${active ? r.color + '66' : '#e3e0d2'}`,
                    background: active ? `${r.color}0a` : '#fff',
                    transition: 'all 0.1s',
                  }}
                >
                  <div style={{
                    width: 16, height: 16, borderRadius: '50%', border: `2px solid ${active ? r.color : '#e3e0d2'}`,
                    background: active ? r.color : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    {active && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{r.title}</div>
                    <div style={{ fontSize: 12, color: '#5a6072', marginTop: 2 }}>{r.short}</div>
                  </div>
                  <div style={{ fontSize: 12, color: '#5a6072', fontFamily: 'monospace', textAlign: 'right' }}>
                    {r.perms.length} perms
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Step 3: Overrides */}
      {step === 3 && role && (
        <div>
          <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, padding: 24, marginBottom: 14 }}>
            <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, marginBottom: 4 }}>Adjust permissions</div>
            <div style={{ fontSize: 13, color: '#5a6072', marginBottom: 4 }}>
              Starting from <RoleChip roleId={role.id} />. Toggle to override individual permissions.
              {overrideCount > 0 && <span style={{ color: '#c08a2a', fontWeight: 600 }}> · {overrideCount} override{overrideCount > 1 ? 's' : ''}</span>}
            </div>
          </div>
          <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, overflow: 'hidden' }}>
            {DOMAINS.map(d => {
              const group = PERMISSIONS.filter(p => p.domain === d)
              if (!group.length) return null
              return (
                <div key={d} style={{ borderTop: '1px solid #e3e0d2' }}>
                  <div style={{ padding: '8px 16px', background: '#f3f1ea', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, color: '#5a6072' }}>
                    {d}
                  </div>
                  {group.map(p => {
                    const has = effectiveHas(p.id)
                    const overridden = overrides[p.id] !== undefined
                    return (
                      <div
                        key={p.id}
                        style={{
                          display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'center',
                          padding: '10px 16px', borderTop: '1px solid #e3e0d2',
                          background: overridden ? 'rgba(192,138,42,0.04)' : '#fff',
                          cursor: 'pointer',
                        }}
                        onClick={() => toggleOverride(p.id)}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <TierTag tier={p.tier} />
                          <div>
                            <div style={{ fontSize: 12.5, fontWeight: 500 }}>{p.label}</div>
                            <div style={{ fontSize: 11, color: '#5a6072', marginTop: 1 }}>{p.desc}</div>
                          </div>
                        </div>
                        <div style={{
                          display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px',
                          borderRadius: 6, fontSize: 11.5, fontWeight: 500,
                          border: `1px solid ${has ? (overridden ? '#c08a2a' : role.color + '55') : '#e3e0d2'}`,
                          background: has ? (overridden ? 'rgba(192,138,42,0.12)' : `${role.color}12`) : (overridden ? 'rgba(181,72,56,0.08)' : '#fff'),
                          color: has ? (overridden ? '#c08a2a' : role.color) : '#5a6072',
                        }}>
                          {has ? <><Icon name="check" size={11} /> {overridden ? 'Granted' : 'Inherited'}</> : (overridden ? 'Revoked' : 'Not granted')}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Step 4: Review */}
      {step === 4 && role && (
        <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, padding: 28 }}>
          <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, marginBottom: 18 }}>Review & send invite</div>

          <div style={{ display: 'grid', gap: 14 }}>
            <div style={{ padding: '14px 16px', background: '#f9f8f5', borderRadius: 8, border: '1px solid #e3e0d2' }}>
              <div style={{ fontSize: 11, color: '#5a6072', textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 600, marginBottom: 6 }}>Identity</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{name}</div>
              <div style={{ fontSize: 13, color: '#5a6072' }}>{email}</div>
              {note && <div style={{ fontSize: 12, color: '#5a6072', marginTop: 6, fontStyle: 'italic' }}>"{note}"</div>}
            </div>

            <div style={{ padding: '14px 16px', background: '#f9f8f5', borderRadius: 8, border: '1px solid #e3e0d2' }}>
              <div style={{ fontSize: 11, color: '#5a6072', textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 600, marginBottom: 8 }}>Role</div>
              <RoleChip roleId={role.id} />
              <div style={{ fontSize: 12, color: '#5a6072', marginTop: 6 }}>{role.short}</div>
              <div style={{ fontSize: 12, color: '#5a6072', marginTop: 2 }}>{role.perms.length} base permissions</div>
            </div>

            {overrideCount > 0 && (
              <div style={{ padding: '14px 16px', background: 'rgba(192,138,42,0.05)', borderRadius: 8, border: '1px solid rgba(192,138,42,0.3)' }}>
                <div style={{ fontSize: 11, color: '#c08a2a', textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 600, marginBottom: 8 }}>
                  {overrideCount} override{overrideCount > 1 ? 's' : ''}
                </div>
                {Object.entries(overrides).map(([pid, val]) => {
                  const p = PERMISSIONS.find(x => x.id === pid)
                  if (!p) return null
                  return (
                    <div key={pid} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0' }}>
                      <TierTag tier={p.tier} />
                      <span style={{ fontSize: 12, flex: 1 }}>{p.label}</span>
                      <span style={{ fontSize: 11, fontWeight: 600, color: val ? '#2f8d5c' : '#b54838' }}>
                        {val ? 'Granted' : 'Revoked'}
                      </span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Nav buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
        <button
          onClick={() => step > 1 ? setStep((step - 1) as Step) : router.push('/admin/admins')}
          style={{ padding: '9px 16px', borderRadius: 6, border: '1px solid #e3e0d2', background: 'transparent', fontSize: 13, cursor: 'pointer' }}
        >
          {step === 1 ? 'Cancel' : 'Back'}
        </button>

        {step < 4 ? (
          <button
            disabled={
              (step === 1 && (!name.trim() || !email.trim())) ||
              (step === 2 && !roleId)
            }
            onClick={() => setStep((step + 1) as Step)}
            style={{
              padding: '9px 18px', borderRadius: 6, border: 'none', background: '#0b1220',
              color: '#fff', fontSize: 13, cursor: 'pointer', fontWeight: 500,
              opacity: (step === 1 && (!name.trim() || !email.trim())) || (step === 2 && !roleId) ? 0.4 : 1,
            }}
          >
            Continue →
          </button>
        ) : (
          <button
            onClick={() => setSent(true)}
            style={{ padding: '9px 18px', borderRadius: 6, border: 'none', background: '#1d6fd6', color: '#fff', fontSize: 13, cursor: 'pointer', fontWeight: 500 }}
          >
            <Icon name="mail" size={14} color="#fff" style={{ marginRight: 6 }} /> Send invite
          </button>
        )}
      </div>
    </div>
  )
}
