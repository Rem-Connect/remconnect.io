'use client'

import { useRouter } from 'next/navigation'
import { Icon } from '@/components/ui/Icon'
import { Avatar } from '@/components/ui/Avatar'
import { TierTag } from './TierTag'
import { ADMINS, ROLES, PERMISSIONS, AUDIT } from '@/lib/admin-data'

export function AdminDashboard() {
  const router = useRouter()

  const kpis = [
    { label: 'Admin accounts',     value: ADMINS.length,       delta: '+3 this quarter', icon: 'shield', bad: false },
    { label: 'Active permissions', value: PERMISSIONS.length,  delta: `Across ${15} domains`, icon: 'lock', bad: false },
    { label: 'Audit events · 24h', value: 128,                 delta: '+18% vs. yesterday', icon: 'activity', bad: false },
    { label: 'Pending invites',    value: 1,                   delta: 'Expires in 5 days', icon: 'mail', bad: true },
  ]

  const byRole = ROLES.map(r => ({
    r, count: ADMINS.filter(a => a.role === r.id).length,
  }))
  const maxCount = Math.max(...byRole.map(b => b.count), 1)

  return (
    <div style={{ padding: '28px 32px 48px', maxWidth: 1280, margin: '0 auto' }}>
      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 22 }}>
        {kpis.map((k) => (
          <div key={k.label} style={{
            background: '#fff', border: '1px solid #e3e0d2', borderRadius: 12, padding: '18px 20px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#5a6072' }}>{k.label}</div>
              <Icon name={k.icon} size={14} color="#8b93a7" />
            </div>
            <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 32, letterSpacing: '-0.02em', lineHeight: 1 }}>{k.value}</div>
            <div style={{ fontSize: 12, color: k.bad ? '#b54838' : '#2f8d5c', marginTop: 4, fontFamily: 'monospace' }}>{k.delta}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 18 }}>
        {/* Seats by role */}
        <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, padding: 22 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
            <div>
              <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22 }}>Seats by role</div>
              <div style={{ color: '#5a6072', fontSize: 13 }}>27 admins across 10 titles.</div>
            </div>
            <button
              onClick={() => router.push('/admin/roles')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px',
                borderRadius: 6, border: '1px solid #e3e0d2', background: 'transparent',
                fontSize: 13, cursor: 'pointer', color: '#0b1220',
              }}
            >
              <Icon name="arrow-right" size={14} /> Open matrix
            </button>
          </div>
          <div style={{ marginTop: 18, display: 'grid', gap: 10 }}>
            {byRole.map(({ r, count }) => {
              const pct = (count / maxCount) * 100
              return (
                <div key={r.id} style={{ display: 'grid', gridTemplateColumns: '200px 1fr 36px', gap: 14, alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 8, height: 8, borderRadius: 2, background: r.color }} />
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{r.title}</span>
                  </div>
                  <div style={{ position: 'relative', height: 22, background: '#f3f1ea', borderRadius: 3 }}>
                    <div style={{ position: 'absolute', inset: '0 auto 0 0', width: pct + '%', background: r.color + 'cc', borderRadius: 3 }} />
                    <span style={{ position: 'absolute', left: 10, top: 4, fontSize: 11, color: '#fff', fontWeight: 600, fontFamily: 'monospace' }}>
                      {r.perms.length} permissions
                    </span>
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 600, textAlign: 'right' }}>{count}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Recent activity */}
        <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, padding: 22 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22 }}>Recent activity</div>
            <button
              onClick={() => router.push('/admin/audit')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 8px',
                borderRadius: 6, border: '1px solid #e3e0d2', background: 'transparent',
                fontSize: 12, cursor: 'pointer', color: '#0b1220',
              }}
            >
              View all
            </button>
          </div>
          <div>
            {AUDIT.slice(0, 6).map((e, i) => (
              <div key={e.id} style={{
                padding: '11px 0', borderTop: i ? '1px solid #e3e0d2' : 'none',
                display: 'grid', gridTemplateColumns: '28px 1fr', gap: 10,
              }}>
                <div style={{ paddingTop: 2 }}>
                  <Avatar name={e.who} tone={i} size={26} />
                </div>
                <div>
                  <div style={{ fontSize: 12.5, lineHeight: 1.45 }}>
                    <span style={{ fontWeight: 600 }}>{e.who}</span>
                    <span style={{ color: '#5a6072' }}> · {e.action.toLowerCase()}</span>
                  </div>
                  <div style={{ fontSize: 11.5, color: '#5a6072', marginTop: 1 }}>{e.target}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 5 }}>
                    <span style={{ fontSize: 10, color: '#5a6072', fontFamily: 'monospace' }}>{e.at}</span>
                    <TierTag tier={e.tier} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Risk callouts */}
      <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, padding: 18, borderLeft: '3px solid #b54838' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <Icon name="shield" size={14} color="#b54838" />
            <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, color: '#b54838' }}>MFA enforcement</span>
          </div>
          <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>3 admins without MFA</div>
          <div style={{ fontSize: 12, color: '#5a6072' }}>Yoni, Dawit, Mahlet — force-enable at next login.</div>
        </div>
        <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, padding: 18, borderLeft: '3px solid #c08a2a' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <Icon name="clock" size={14} color="#c08a2a" />
            <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, color: '#c08a2a' }}>Stale accounts</span>
          </div>
          <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>2 admins inactive 30+ days</div>
          <div style={{ fontSize: 12, color: '#5a6072' }}>Consider revoking access or pausing.</div>
        </div>
        <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, padding: 18, borderLeft: '3px solid #1d6fd6' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <Icon name="info" size={14} color="#1d6fd6" />
            <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, color: '#1d6fd6' }}>Overrides</span>
          </div>
          <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>5 per-person overrides active</div>
          <div style={{ fontSize: 12, color: '#5a6072' }}>Review drift from role defaults quarterly.</div>
        </div>
      </div>
    </div>
  )
}
