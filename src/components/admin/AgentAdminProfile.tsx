'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Icon } from '@/components/ui/Icon'
import { Avatar } from '@/components/ui/Avatar'
import { ScoreRing } from '@/components/ui/ScoreRing'
import { SAMPLE_AGENTS, AGENT_EXTRAS } from '@/lib/admin-data'

interface Props { agentId: string }

type ProfileView = 'internal' | 'stealth'

export function AgentAdminProfile({ agentId }: Props) {
  const router = useRouter()
  const [profileView, setProfileView] = useState<ProfileView>('internal')

  const agent = SAMPLE_AGENTS.find(a => a.id === agentId)
  if (!agent) return (
    <div style={{ padding: 60, textAlign: 'center', color: '#5a6072' }}>Agent not found.</div>
  )

  const extras = AGENT_EXTRAS[agentId] || (AGENT_EXTRAS as Record<string, typeof AGENT_EXTRAS[string]>)['__default']
  const stealth = profileView === 'stealth'

  const statusColors: Record<typeof agent.status, { bg: string; fg: string }> = {
    deployed: { bg: 'rgba(47,141,92,0.12)', fg: '#2f8d5c' },
    bench:    { bg: 'rgba(29,111,214,0.1)',  fg: '#1d6fd6' },
    assess:   { bg: 'rgba(192,138,42,0.12)', fg: '#c08a2a' },
    recruit:  { bg: 'rgba(90,96,114,0.1)',   fg: '#5a6072' },
  }
  const sc = statusColors[agent.status]

  return (
    <div style={{ padding: '24px 32px 48px', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <button
          onClick={() => router.push('/admin/agents')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#5a6072', fontSize: 12, cursor: 'pointer', padding: 0 }}
        >
          <Icon name="arrow-right" size={12} style={{ transform: 'rotate(180deg)' }} />
          Back to directory
        </button>

        {/* View toggle */}
        <div style={{ display: 'flex', background: '#f3f1ea', borderRadius: 7, padding: 3, gap: 2 }}>
          {(['internal', 'stealth'] as ProfileView[]).map(v => (
            <button key={v} onClick={() => setProfileView(v)} style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '5px 12px', borderRadius: 5, border: 'none', fontSize: 12, cursor: 'pointer',
              background: profileView === v ? (v === 'stealth' ? '#c08a2a' : '#0b1220') : 'transparent',
              color: profileView === v ? '#fff' : '#5a6072',
              fontWeight: 500,
            }}>
              <Icon name={v === 'stealth' ? 'eye-off' : 'eye'} size={11} color={profileView === v ? '#fff' : '#5a6072'} />
              {v === 'internal' ? 'Internal' : 'Stealth'}
            </button>
          ))}
        </div>
      </div>

      {stealth && (
        <div style={{
          marginBottom: 14, padding: '10px 14px', borderRadius: 8,
          background: 'rgba(192,138,42,0.07)', border: '1px solid rgba(192,138,42,0.3)',
          fontSize: 12, color: '#c08a2a', fontWeight: 500,
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <Icon name="eye-off" size={13} color="#c08a2a" />
          Stealth preview — this is what clients see. PII, financials, and internal notes are hidden.
        </div>
      )}

      {/* Hero card */}
      <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, padding: 24, marginBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap' }}>
          <Avatar name={agent.name} tone={3} size={72} />
          <div style={{ flex: 1, minWidth: 240 }}>
            <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, fontWeight: 400 }}>
              {stealth ? agent.name.split(' ')[0] + ' ' + agent.name.split(' ').slice(1).map(w => w[0] + '.').join(' ') : agent.name}
            </div>
            <div style={{ fontSize: 13.5, color: '#5a6072', marginTop: 2 }}>{extras.headline}</div>
            <div style={{ fontSize: 12, color: '#8b93a7', marginTop: 4 }}>
              {stealth ? '•••••' : agent.id} · {extras.location} · {extras.timezone}
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
              <span style={{ padding: '3px 9px', borderRadius: 4, fontSize: 11, fontWeight: 600, background: sc.bg, color: sc.fg }}>
                {agent.status === 'deployed' ? `Deployed → ${stealth ? '••••' : agent.client}` : agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
              </span>
              <span style={{ padding: '3px 9px', background: '#f3f1ea', borderRadius: 4, fontSize: 11, color: '#5a6072' }}>{agent.role}</span>
              {agent.langs.map(l => (
                <span key={l} style={{ padding: '3px 7px', background: '#f3f1ea', borderRadius: 3, fontSize: 11, fontFamily: 'monospace', color: '#5a6072' }}>{l}</span>
              ))}
            </div>
          </div>
          {agent.score > 0 && (
            <div style={{ textAlign: 'center' }}>
              <ScoreRing value={agent.score} size={68} />
              <div style={{ fontSize: 10, color: '#5a6072', textTransform: 'uppercase', letterSpacing: '0.07em', marginTop: 4 }}>Score</div>
            </div>
          )}
        </div>

        <div style={{ marginTop: 16, padding: 14, background: '#f9f8f5', borderRadius: 8, fontSize: 13, color: '#3a3f52', lineHeight: 1.55, borderLeft: '3px solid #e3e0d2' }}>
          {extras.pitch}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 18 }}>
        {/* Left column */}
        <div style={{ display: 'grid', gap: 18, alignContent: 'start' }}>
          {/* Skills */}
          <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, padding: 20 }}>
            <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 18, marginBottom: 12 }}>Skills & tools</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
              {agent.skills.map(s => (
                <span key={s} style={{ padding: '4px 10px', background: '#f3f1ea', borderRadius: 5, fontSize: 12, color: '#0b1220' }}>{s}</span>
              ))}
            </div>
            {extras.tools.length > 0 && (
              <>
                <div style={{ fontSize: 11, color: '#5a6072', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>Tools</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {extras.tools.map(t => (
                    <span key={t} style={{ padding: '3px 8px', background: 'rgba(29,111,214,0.08)', borderRadius: 4, fontSize: 12, color: '#0c3a7a', fontWeight: 500 }}>{t}</span>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Certifications */}
          <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 18 }}>Certifications</div>
              <span style={{ fontFamily: 'monospace', fontSize: 22, fontWeight: 700, color: '#0b1220' }}>{agent.certs}</span>
            </div>
            {extras.certifications.map((c, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderTop: i ? '1px solid #e3e0d2' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#2f8d5c', flexShrink: 0 }} />
                  <span style={{ fontSize: 13 }}>{c.t}</span>
                </div>
                <span style={{ fontSize: 11, color: '#5a6072', fontFamily: 'monospace' }}>{c.d}</span>
              </div>
            ))}
          </div>

          {/* Work history */}
          <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, padding: 20 }}>
            <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 18, marginBottom: 12 }}>Work history</div>
            {extras.history.map((h, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, padding: '8px 0', borderTop: i ? '1px solid #e3e0d2' : 'none' }}>
                <div style={{ width: 3, background: h.current ? '#1d6fd6' : '#e3e0d2', borderRadius: 2, flexShrink: 0, alignSelf: 'stretch', minHeight: 36 }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{h.co}</div>
                  <div style={{ fontSize: 12, color: '#5a6072' }}>{h.role}</div>
                  <div style={{ fontSize: 11, color: '#8b93a7', fontFamily: 'monospace', marginTop: 2 }}>{h.when}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'grid', gap: 18, alignContent: 'start' }}>
          {/* KPIs */}
          <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, padding: 20 }}>
            <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 18, marginBottom: 14 }}>Performance</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { label: 'QA score', value: extras.qa ? `${extras.qa}%` : '—' },
                { label: 'CSAT', value: extras.csat ? `${extras.csat}` : '—' },
                { label: 'AHT', value: extras.aht || '—' },
                { label: 'Experience', value: `${agent.years}y` },
              ].map(({ label, value }) => (
                <div key={label} style={{ padding: 12, background: '#f9f8f5', borderRadius: 7 }}>
                  <div style={{ fontSize: 10, color: '#5a6072', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>{label}</div>
                  <div style={{ fontFamily: 'monospace', fontSize: 20, fontWeight: 700 }}>{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Contract / finance — hidden in stealth */}
          {!stealth && (
            <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, padding: 20 }}>
              <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 18, marginBottom: 14 }}>Contract & finance</div>
              {[
                { label: 'Employer', value: extras.employer },
                { label: 'Contract', value: extras.contractType },
                { label: 'Pay rate', value: extras.payRate },
                { label: 'Bill rate', value: extras.billRate },
                { label: 'Margin', value: extras.margin },
                { label: 'Started', value: extras.started },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f3f1ea', fontSize: 12 }}>
                  <span style={{ color: '#5a6072' }}>{label}</span>
                  <span style={{ fontWeight: 500 }}>{value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Contact — hidden in stealth */}
          {!stealth && (
            <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, padding: 20 }}>
              <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 18, marginBottom: 12 }}>Contact</div>
              <div style={{ display: 'grid', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Icon name="mail" size={13} color="#5a6072" />
                  <span style={{ fontSize: 12 }}>{extras.email}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Icon name="phone" size={13} color="#5a6072" />
                  <span style={{ fontSize: 12 }}>{extras.phone}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Icon name="clock" size={13} color="#5a6072" />
                  <span style={{ fontSize: 12 }}>{extras.hours}</span>
                </div>
              </div>
            </div>
          )}

          {/* Internal notes — hidden in stealth */}
          {!stealth && extras.notes.length > 0 && (
            <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, padding: 20 }}>
              <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 18, marginBottom: 12 }}>Internal notes</div>
              {extras.notes.map((n, i) => (
                <div key={i} style={{ padding: '10px 0', borderTop: i ? '1px solid #e3e0d2' : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 11.5, fontWeight: 600 }}>{n.who}</span>
                    <span style={{ fontSize: 11, color: '#5a6072', fontFamily: 'monospace' }}>{n.when}</span>
                  </div>
                  <div style={{ fontSize: 12.5, color: '#3a3f52', lineHeight: 1.5 }}>{n.body}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
