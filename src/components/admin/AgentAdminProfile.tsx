'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Icon } from '@/components/ui/Icon'
import { ScoreRing } from '@/components/ui/ScoreRing'
import { Chip } from '@/components/ui/Chip'
import { SAMPLE_AGENTS, AGENT_EXTRAS } from '@/lib/admin-data'
import { NET_AGENTS } from '@/lib/network-data'
import { getAgentPhoto, isExternalPhoto } from '@/lib/agent-photo'
import { useAdmin } from '@/context/AdminContext'
import '@/app/network.css'

interface Props { agentId: string }
type ProfileView = 'internal' | 'stealth'

const TABS = [
  { id: 'overview',     label: 'Overview' },
  { id: 'performance',  label: 'Performance' },
  { id: 'network',      label: 'Network' },
  { id: 'history',      label: 'Work History' },
  { id: 'certs',        label: 'Certifications' },
  { id: 'skills',       label: 'Skills & Tools' },
  { id: 'contract',     label: 'Contract & Finance' },
]

const STATUS_COLORS = {
  deployed: { bg: 'rgba(47,141,92,0.12)',  fg: '#2f8d5c' },
  bench:    { bg: 'rgba(29,111,214,0.1)',  fg: '#1d6fd6' },
  assess:   { bg: 'rgba(192,138,42,0.12)', fg: '#c08a2a' },
  recruit:  { bg: 'rgba(90,96,114,0.1)',   fg: '#5a6072' },
}

function StatBox({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: string }) {
  return (
    <div style={{ padding: '14px 16px', background: '#f9f8f5', borderRadius: 10, border: '1px solid #e3e0d2' }}>
      <div style={{ fontSize: 10, color: '#8b93a7', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{label}</div>
      <div style={{ fontFamily: 'monospace', fontSize: 24, fontWeight: 700, color: accent || '#0b1220' }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: '#8b93a7', marginTop: 2 }}>{sub}</div>}
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 19, fontWeight: 400, letterSpacing: '-0.01em', marginBottom: 14, color: '#0b1220' }}>
      {children}
    </div>
  )
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, padding: 20, ...style }}>
      {children}
    </div>
  )
}

export function AgentAdminProfile({ agentId }: Props) {
  const router = useRouter()
  const { stealth, setStealth } = useAdmin()
  const [tab, setTab] = useState('overview')

  const agent = SAMPLE_AGENTS.find(a => a.id === agentId)
  if (!agent) return (
    <div style={{ padding: 60, textAlign: 'center', color: '#5a6072' }}>Agent not found.</div>
  )

  const extras = AGENT_EXTRAS[agentId] || (AGENT_EXTRAS as Record<string, typeof AGENT_EXTRAS[string]>)['__default']
  const sc = STATUS_COLORS[agent.status]
  const photo = extras.photo || agent.photo || getAgentPhoto(agent.id, 200)

  const visibleTabs = TABS.filter(t => !(stealth && t.id === 'contract'))

  const handleStealthToggle = (v: ProfileView) => {
    setStealth(v === 'stealth')
    if (v === 'stealth' && tab === 'contract') setTab('overview')
  }

  const scoreColor = agent.score >= 90 ? '#2f8d5c' : agent.score >= 75 ? '#c08a2a' : '#b54838'
  const hasPerf = extras.qa > 0 || extras.csat !== null || extras.aht !== null
  const netAgent = NET_AGENTS.find(n => n.id === agent.id)
  const isMonitored = !!netAgent

  // Shared coloring so the profile's Network tab matches /network/agents thresholds.
  const NET_STATUS_UI = {
    healthy:  { label: 'Connection healthy',  color: '#2f8d5c', chip: 'good' as const, chipLabel: 'Online' },
    warning:  { label: 'Connection degraded', color: '#c08a2a', chip: 'warn' as const, chipLabel: 'Degraded' },
    critical: { label: 'Connection unstable', color: '#b54838', chip: 'bad' as const,  chipLabel: 'At risk' },
  }
  const metricColor = (v: number, good: number, warn: number, higherIsBetter = true) =>
    higherIsBetter
      ? (v >= good ? '#2f8d5c' : v >= warn ? '#c08a2a' : '#b54838')
      : (v <= good ? '#2f8d5c' : v <= warn ? '#c08a2a' : '#b54838')

  return (
    <div className="net-scope" style={{ padding: '24px 32px 56px', maxWidth: 1180, margin: '0 auto' }}>

      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <button onClick={() => router.push('/admin/agents')} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#5a6072', fontSize: 12, cursor: 'pointer', padding: 0 }}>
          <Icon name="arrow-right" size={12} style={{ transform: 'rotate(180deg)' }} />
          Back to directory
        </button>
        <div style={{ display: 'flex', background: '#f3f1ea', borderRadius: 7, padding: 3, gap: 2 }}>
          {(['internal', 'stealth'] as ProfileView[]).map(v => {
            const active = v === (stealth ? 'stealth' : 'internal')
            return (
            <button key={v} onClick={() => handleStealthToggle(v)} style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '5px 12px', borderRadius: 5, border: 'none', fontSize: 12, cursor: 'pointer',
              background: active ? (v === 'stealth' ? '#c08a2a' : '#0b1220') : 'transparent',
              color: active ? '#fff' : '#5a6072', fontWeight: 500,
            }}>
              <Icon name={v === 'stealth' ? 'eye-off' : 'eye'} size={11} color={active ? '#fff' : '#5a6072'} />
              {v === 'internal' ? 'Internal' : 'Stealth'}
            </button>
            )
          })}
        </div>
      </div>

      {stealth && (
        <div style={{ marginBottom: 14, padding: '10px 14px', borderRadius: 8, background: 'rgba(192,138,42,0.07)', border: '1px solid rgba(192,138,42,0.3)', fontSize: 12, color: '#c08a2a', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon name="eye-off" size={13} color="#c08a2a" />
          Stealth preview — this is what clients see. PII, financials, and internal notes are hidden.
        </div>
      )}

      {/* Hero */}
      <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: '10px 10px 0 0', borderBottom: 'none', padding: '24px 24px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 22, flexWrap: 'wrap' }}>
          <div style={{ width: 80, height: 80, borderRadius: 12, overflow: 'hidden', flexShrink: 0, border: '2px solid #e3e0d2' }}>
            {isExternalPhoto(photo)
              // eslint-disable-next-line @next/next/no-img-element
              ? <img src={photo} alt={agent.name} width={80} height={80} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
              : <Image src={photo} alt={agent.name} width={80} height={80} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
            }
          </div>

          <div style={{ flex: 1, minWidth: 240 }}>
            <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 30, fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
              {stealth ? agent.name.split(' ')[0] + ' ' + agent.name.split(' ').slice(1).map(w => w[0] + '.').join(' ') : agent.name}
            </div>
            <div style={{ fontSize: 14, color: '#5a6072', marginTop: 3 }}>{extras.headline}</div>
            <div style={{ fontSize: 12, color: '#8b93a7', marginTop: 4, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              <span>{stealth ? '•••••' : agent.id}</span>
              <span style={{ color: '#d0ccbd' }}>·</span>
              <span>{extras.location}</span>
              <span style={{ color: '#d0ccbd' }}>·</span>
              <span>{extras.timezone}</span>
            </div>
            <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ padding: '3px 9px', borderRadius: 4, fontSize: 11, fontWeight: 600, background: sc.bg, color: sc.fg }}>
                {agent.status === 'deployed' ? `Deployed → ${stealth ? '••••' : agent.client}` : agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
              </span>
              <span style={{ padding: '3px 9px', background: '#f3f1ea', borderRadius: 4, fontSize: 11, color: '#5a6072' }}>{agent.role}</span>
              {agent.langs.map(l => (
                <span key={l} style={{ padding: '3px 7px', background: '#f3f1ea', borderRadius: 3, fontSize: 11, fontFamily: 'monospace', color: '#5a6072' }}>{l}</span>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-end' }}>
            {agent.score > 0 && (
              <div style={{ textAlign: 'center' }}>
                <ScoreRing value={agent.score} size={72} />
                <div style={{ fontSize: 10, color: '#5a6072', textTransform: 'uppercase', letterSpacing: '0.07em', marginTop: 4 }}>Score</div>
              </div>
            )}
            {!stealth && (
              <div style={{ fontSize: 11, color: '#8b93a7', textAlign: 'right' }}>
                <div>Started {extras.started}</div>
                {extras.deployedSince !== '—' && <div style={{ marginTop: 1 }}>Deployed {extras.deployedSince}</div>}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tab strip */}
      <div style={{ background: '#fff', borderLeft: '1px solid #e3e0d2', borderRight: '1px solid #e3e0d2', borderBottom: '1px solid #e3e0d2' }}>
        <div className="tab-strip" style={{ padding: '0 20px' }}>
          {visibleTabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`tab-btn${tab === t.id ? ' active' : ''}`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div style={{ background: '#faf9f6', border: '1px solid #e3e0d2', borderTop: 'none', borderRadius: '0 0 10px 10px', padding: 24 }}>

        {/* ─── OVERVIEW ─── */}
        {tab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: stealth ? '1fr' : '1.4fr 1fr', gap: 20 }}>
            <div style={{ display: 'grid', gap: 16, alignContent: 'start' }}>
              {/* Bio */}
              <Card>
                <SectionTitle>About</SectionTitle>
                <p style={{ fontSize: 13.5, color: '#3a3f52', lineHeight: 1.65, margin: 0 }}>{extras.pitch}</p>
                {extras.education && extras.education !== '—' && (
                  <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid #e3e0d2', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <Icon name="grad-cap" size={14} color="#5a6072" style={{ marginTop: 1, flexShrink: 0 }} />
                    <span style={{ fontSize: 12.5, color: '#5a6072' }}>{extras.education}</span>
                  </div>
                )}
              </Card>

              {/* Intro recording — video, else Vocaroo audio, else external link */}
              {(extras.video || extras.vocaroo || extras.introUrl) && (
                <Card>
                  <SectionTitle>{extras.video ? 'Intro video' : 'Intro recording'}</SectionTitle>
                  {extras.video ? (
                    <video
                      src={extras.video}
                      controls
                      preload="metadata"
                      style={{ width: '100%', borderRadius: 8, display: 'block', background: '#000', maxHeight: 360 }}
                    />
                  ) : extras.vocaroo ? (
                    <>
                      <iframe
                        title={`${agent.name} — intro recording`}
                        width="100%"
                        height={60}
                        src={`https://vocaroo.com/embed/${extras.vocaroo}?autoplay=0`}
                        allow="autoplay"
                        style={{ border: 0, borderRadius: 8, display: 'block' }}
                      />
                      <a
                        href={`https://voca.ro/${extras.vocaroo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 10, fontSize: 12, color: '#1d6fd6', fontWeight: 600 }}
                      >
                        View on Vocaroo <Icon name="arrow-up-right" size={12} color="#1d6fd6" />
                      </a>
                    </>
                  ) : (
                    <a
                      href={extras.introUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 13px', borderRadius: 7, border: '1px solid #e3e0d2', fontSize: 12.5, color: '#1d6fd6', fontWeight: 600 }}
                    >
                      <Icon name="play-circle" size={14} color="#1d6fd6" /> Listen to intro recording
                    </a>
                  )}
                </Card>
              )}

              {/* Quick stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                <StatBox label="Experience" value={`${agent.years}y`} sub="total" />
                <StatBox label="Certifications" value={String(agent.certs)} sub="earned" />
                <StatBox label="Score" value={agent.score > 0 ? String(agent.score) : '—'} sub="overall" accent={agent.score > 0 ? scoreColor : undefined} />
              </div>

              {/* Languages */}
              <Card>
                <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8b93a7', marginBottom: 10 }}>Languages</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {agent.langs.map((l, idx) => (
                    <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', background: idx === 0 ? 'rgba(29,111,214,0.08)' : '#f3f1ea', borderRadius: 6, border: `1px solid ${idx === 0 ? 'rgba(29,111,214,0.2)' : '#e3e0d2'}` }}>
                      <span style={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 700, color: idx === 0 ? '#1d6fd6' : '#5a6072' }}>{l}</span>
                      {idx === 0 && <span style={{ fontSize: 10, color: '#1d6fd6' }}>Primary</span>}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Top skills preview */}
              <Card>
                <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8b93a7', marginBottom: 10 }}>Top skills</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {agent.skills.slice(0, 6).map(s => (
                    <span key={s} style={{ padding: '4px 10px', background: '#f3f1ea', borderRadius: 5, fontSize: 12, color: '#0b1220' }}>{s}</span>
                  ))}
                  {agent.skills.length > 6 && <span style={{ padding: '4px 10px', background: 'transparent', borderRadius: 5, fontSize: 12, color: '#8b93a7' }}>+{agent.skills.length - 6} more</span>}
                </div>
              </Card>
            </div>

            {/* Right column — internal only */}
            {!stealth && (
              <div style={{ display: 'grid', gap: 16, alignContent: 'start' }}>
                <Card>
                  <SectionTitle>Contact</SectionTitle>
                  <div style={{ display: 'grid', gap: 12 }}>
                    {[
                      { icon: 'mail', val: extras.email },
                      { icon: 'phone', val: extras.phone },
                      { icon: 'clock', val: extras.hours },
                      { icon: 'globe', val: `${extras.location} · ${extras.timezone}` },
                    ].map(({ icon, val }) => (
                      <div key={icon} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                        <div style={{ width: 28, height: 28, borderRadius: 6, background: '#f3f1ea', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Icon name={icon} size={13} color="#5a6072" />
                        </div>
                        <span style={{ fontSize: 12.5, color: '#3a3f52', paddingTop: 5, lineHeight: 1.4 }}>{val}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                {extras.intake && (
                  <Card>
                    <SectionTitle>Candidate intake</SectionTitle>
                    <div style={{ display: 'grid', gap: 11 }}>
                      {([
                        { label: 'Desired salary', value: extras.intake.desiredSalary },
                        { label: 'Availability', value: extras.intake.availability },
                        { label: 'Prior experience', value: extras.intake.experience },
                        { label: 'Currently employed', value: extras.intake.employed },
                        { label: 'Late-hours OK', value: extras.intake.lateHours },
                        { label: 'Computer', value: extras.intake.device },
                        { label: 'Phone', value: extras.intake.phoneModel },
                        { label: 'Internet', value: extras.intake.internet },
                        { label: 'Freelance', value: extras.intake.freelance },
                      ].filter(r => r.value)).map(r => (
                        <div key={r.label} style={{ display: 'flex', gap: 10, fontSize: 12.5, alignItems: 'flex-start' }}>
                          <span style={{ width: 108, flexShrink: 0, color: '#8b93a7' }}>{r.label}</span>
                          <span style={{ color: '#3a3f52', lineHeight: 1.4 }}>{r.value}</span>
                        </div>
                      ))}
                    </div>
                    {extras.intake.cvUrl && (
                      <a
                        href={extras.intake.cvUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 14, padding: '8px 12px', borderRadius: 7, border: '1px solid #e3e0d2', fontSize: 12, color: '#0b1220', fontWeight: 600 }}
                      >
                        <Icon name="document" size={13} color="#5a6072" /> View CV / résumé
                      </a>
                    )}
                  </Card>
                )}

                {extras.notes.length > 0 && (
                  <Card>
                    <SectionTitle>Internal notes</SectionTitle>
                    {extras.notes.map((n, i) => (
                      <div key={i} style={{ padding: '12px 0', borderTop: i ? '1px solid #e3e0d2' : 'none' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#0b1220', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <span style={{ fontSize: 9, fontWeight: 700, color: '#fff' }}>{n.who.charAt(0)}</span>
                            </div>
                            <span style={{ fontSize: 12, fontWeight: 600 }}>{n.who}</span>
                          </div>
                          <span style={{ fontSize: 11, color: '#8b93a7', fontFamily: 'monospace' }}>{n.when}</span>
                        </div>
                        <div style={{ fontSize: 12.5, color: '#3a3f52', lineHeight: 1.55, paddingLeft: 28 }}>{n.body}</div>
                      </div>
                    ))}
                  </Card>
                )}
              </div>
            )}
          </div>
        )}

        {/* ─── PERFORMANCE ─── */}
        {tab === 'performance' && (
          <div style={{ display: 'grid', gap: 20 }}>
            {/* Header with tier */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <SectionTitle>Performance overview</SectionTitle>
              {agent.score >= 90
                ? <Chip variant="good"><Icon name="award" size={11} /> Top performer</Chip>
                : agent.score >= 75
                  ? <Chip variant="neutral">Strong performer</Chip>
                  : agent.score > 0
                    ? <Chip variant="neutral">Developing</Chip>
                    : <Chip variant="neutral">Not yet assessed</Chip>
              }
            </div>

            {/* Score hero */}
            {agent.score > 0 && (
              <Card style={{ display: 'flex', gap: 28, alignItems: 'center', background: 'linear-gradient(135deg, #f4f7fc, #fff)' }}>
                <div style={{ textAlign: 'center', flexShrink: 0 }}>
                  <ScoreRing value={agent.score} size={90} />
                  <div style={{ fontSize: 10, color: '#5a6072', textTransform: 'uppercase', letterSpacing: '0.07em', marginTop: 6 }}>Overall score</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: '#5a6072', marginBottom: 12 }}>Score reflects QA, CSAT, adherence, and certifications weighted by role.</div>
                  {/* Mini bar breakdown */}
                  {[
                    { label: 'Quality (QA)', pct: extras.qa || 0 },
                    { label: 'Customer satisfaction', pct: extras.csat ? Math.round((extras.csat / 5) * 100) : 0 },
                    { label: 'Certifications', pct: Math.min(100, agent.certs * 20) },
                    { label: 'Experience', pct: Math.min(100, agent.years * 20) },
                  ].map(({ label, pct }) => (
                    <div key={label} style={{ marginBottom: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#5a6072', marginBottom: 3 }}>
                        <span>{label}</span><span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{pct > 0 ? `${pct}%` : '—'}</span>
                      </div>
                      <div style={{ height: 5, background: '#e3e0d2', borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${pct}%`, borderRadius: 3, background: pct >= 85 ? '#2f8d5c' : pct >= 70 ? '#c08a2a' : '#b54838', transition: 'width 0.4s' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Metric grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
              <StatBox label="QA score" value={extras.qa ? `${extras.qa}%` : '—'} sub={extras.qa >= 90 ? 'Excellent' : extras.qa >= 75 ? 'Good' : extras.qa > 0 ? 'Needs work' : 'No data'} accent={extras.qa >= 90 ? '#2f8d5c' : extras.qa >= 75 ? '#c08a2a' : undefined} />
              <StatBox label="CSAT" value={extras.csat ? `${extras.csat} / 5` : '—'} sub={extras.csat ? 'avg customer rating' : 'No data yet'} accent={extras.csat && extras.csat >= 4.5 ? '#2f8d5c' : undefined} />
              <StatBox label="Avg handle time" value={extras.aht || '—'} sub="per contact" />
              <StatBox label="Experience" value={`${agent.years}y`} sub={`${agent.years >= 4 ? 'Senior' : agent.years >= 2 ? 'Mid-level' : 'Junior'}`} />
            </div>

            {!hasPerf && (
              <Card style={{ textAlign: 'center', padding: '32px 24px', background: '#f9f8f5' }}>
                <Icon name="activity" size={28} color="#d0ccbd" />
                <div style={{ fontSize: 14, fontWeight: 500, color: '#5a6072', marginTop: 12 }}>No performance data yet</div>
                <div style={{ fontSize: 12, color: '#8b93a7', marginTop: 4 }}>Metrics will appear once the agent is deployed and has completed their first QA review.</div>
              </Card>
            )}

            {/* Additional context */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Card>
                <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8b93a7', marginBottom: 12 }}>Role & deployment</div>
                <div style={{ display: 'grid', gap: 8 }}>
                  {[
                    { label: 'Current role', value: agent.role },
                    { label: 'Status', value: agent.status.charAt(0).toUpperCase() + agent.status.slice(1) },
                    { label: 'Client', value: agent.status === 'deployed' ? agent.client : 'Unassigned' },
                    { label: 'Certifications', value: `${agent.certs} earned` },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, padding: '4px 0', borderBottom: '1px solid #f3f1ea' }}>
                      <span style={{ color: '#5a6072' }}>{label}</span>
                      <span style={{ fontWeight: 500 }}>{value}</span>
                    </div>
                  ))}
                </div>
              </Card>
              <Card>
                <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8b93a7', marginBottom: 12 }}>Core strengths</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {agent.skills.slice(0, 4).map(s => (
                    <span key={s} style={{ padding: '5px 10px', background: 'rgba(47,141,92,0.08)', border: '1px solid rgba(47,141,92,0.2)', borderRadius: 5, fontSize: 12, color: '#2f5c3a' }}>{s}</span>
                  ))}
                  {agent.langs.map(l => (
                    <span key={l} style={{ padding: '5px 10px', background: 'rgba(29,111,214,0.07)', border: '1px solid rgba(29,111,214,0.18)', borderRadius: 5, fontSize: 12, color: '#0c3a7a', fontFamily: 'monospace' }}>{l}</span>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* ─── NETWORK ─── */}
        {tab === 'network' && (
          <div style={{ display: 'grid', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              <div style={{ marginBottom: -14 }}><SectionTitle>Network &amp; remote setup</SectionTitle></div>
              {isMonitored ? (
                <button
                  onClick={() => router.push(`/admin/network/agents/${agent.id}`)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 7,
                    padding: '7px 12px', borderRadius: 7, cursor: 'pointer',
                    border: '1px solid rgba(29,111,214,0.3)', background: 'rgba(29,111,214,0.06)',
                    color: '#1d6fd6', fontSize: 12, fontWeight: 600,
                  }}
                >
                  <Icon name="activity" size={13} color="#1d6fd6" />
                  View full network history
                  <Icon name="arrow-right" size={13} color="#1d6fd6" />
                </button>
              ) : (
                <span style={{ fontSize: 11.5, color: '#8b93a7', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <Icon name="info" size={12} color="#8b93a7" />
                  Network monitoring begins after onboarding
                </span>
              )}
            </div>

            {/* Connection status banner — driven by the same NET_AGENTS record as /network/agents */}
            {(() => {
              const ui = netAgent ? NET_STATUS_UI[netAgent.status] : null
              const color = ui?.color ?? '#5a6072'
              const lastSeen = netAgent ? (netAgent.lastSeen === 0 ? 'just now' : `${netAgent.lastSeen} min ago`) : '—'
              return (
                <Card style={{ background: `linear-gradient(135deg, ${color}14, #fff)`, borderColor: `${color}4d`, display: 'flex', gap: 16, alignItems: 'center' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: `${color}1f`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon name="globe" size={22} color={color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color, marginBottom: 2 }}>
                      {ui ? ui.label : 'Not monitored yet'}
                    </div>
                    <div style={{ fontSize: 12, color: '#5a6072' }}>
                      {netAgent
                        ? `${extras.location} · ${netAgent.isp} · Last test ${lastSeen}`
                        : `${extras.location} · ${extras.timezone} · Monitoring begins after onboarding`}
                    </div>
                  </div>
                  {netAgent
                    ? <Chip variant={ui!.chip}><Icon name={netAgent.online ? 'check' : 'info'} size={11} /> {netAgent.online ? ui!.chipLabel : 'Offline'}</Chip>
                    : <Chip variant="neutral">Not set up</Chip>}
                </Card>
              )
            })()}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {/* Connection details */}
              <Card>
                <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8b93a7', marginBottom: 14 }}>Connection details</div>
                <div style={{ display: 'grid', gap: 10 }}>
                  {[
                    { icon: 'globe', label: 'Location', value: extras.location },
                    { icon: 'clock', label: 'Timezone', value: extras.timezone },
                    { icon: 'activity', label: 'Working hours', value: extras.hours },
                    { icon: 'globe', label: 'ISP', value: netAgent?.isp ?? '—' },
                    { icon: 'shield', label: 'VPN', value: netAgent ? (netAgent.vpn ? 'Detected' : 'Not active') : '—' },
                  ].map(({ icon, label, value }) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 6, background: '#f3f1ea', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon name={icon} size={13} color="#5a6072" />
                      </div>
                      <div>
                        <div style={{ fontSize: 10, color: '#8b93a7', lineHeight: 1 }}>{label}</div>
                        <div style={{ fontSize: 13, fontWeight: 500, marginTop: 1 }}>{value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Speed test */}
              <Card>
                <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8b93a7', marginBottom: 14 }}>Last speed test</div>
                <div style={{ display: 'grid', gap: 12 }}>
                  {(netAgent
                    ? [
                        { label: 'Download',    value: netAgent.download.toFixed(1), unit: 'Mbps', color: metricColor(netAgent.download, 25, 15, true) },
                        { label: 'Upload',      value: netAgent.upload.toFixed(1),   unit: 'Mbps', color: metricColor(netAgent.upload, 15, 10, true) },
                        { label: 'Latency',     value: String(netAgent.latency),     unit: 'ms',   color: metricColor(netAgent.latency, 100, 200, false) },
                        { label: 'Packet loss', value: netAgent.loss.toFixed(1),     unit: '%',    color: metricColor(netAgent.loss, 0.5, 2, false) },
                      ]
                    : [
                        { label: 'Download',    value: '—', unit: 'Mbps', color: '#8b93a7' },
                        { label: 'Upload',      value: '—', unit: 'Mbps', color: '#8b93a7' },
                        { label: 'Latency',     value: '—', unit: 'ms',   color: '#8b93a7' },
                        { label: 'Packet loss', value: '—', unit: '%',    color: '#8b93a7' },
                      ]
                  ).map(({ label, value, unit, color }) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 12.5, color: '#5a6072' }}>{label}</span>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                        <span style={{ fontFamily: 'monospace', fontSize: 18, fontWeight: 700, color }}>{value}</span>
                        <span style={{ fontSize: 10, color: '#8b93a7' }}>{unit}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 14, paddingTop: 10, borderTop: '1px solid #f3f1ea', fontSize: 11, color: '#8b93a7' }}>
                  Tested via RemConnect speed tool · Requirements: ≥10 Mbps down, &lt;200ms latency
                </div>
              </Card>
            </div>

            {/* Remote setup summary */}
            <Card>
              <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8b93a7', marginBottom: 14 }}>Remote setup verification</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                {[
                  { label: '2nd monitor',  ok: true  },
                  { label: 'PC / Laptop',  ok: true  },
                  { label: 'Router',       ok: true  },
                  { label: 'Power bank',   ok: true  },
                  { label: 'Proper desk',  ok: true  },
                  { label: 'Headset',      ok: true  },
                  { label: 'Charger',      ok: true  },
                  { label: 'Extinguisher', ok: false },
                ].map(({ label, ok }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 10px', background: ok ? 'rgba(47,141,92,0.06)' : 'rgba(181,72,56,0.05)', borderRadius: 7, border: `1px solid ${ok ? 'rgba(47,141,92,0.2)' : 'rgba(181,72,56,0.15)'}` }}>
                    <Icon name={ok ? 'check' : 'info'} size={12} color={ok ? '#2f8d5c' : '#b54838'} />
                    <span style={{ fontSize: 11, color: ok ? '#2f5c3a' : '#8a362a', fontWeight: 500 }}>{label}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* ─── WORK HISTORY ─── */}
        {tab === 'history' && (
          <div style={{ display: 'grid', gap: 20 }}>
            {/* Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              <StatBox label="Total experience" value={`${agent.years}y`} sub="across all roles" />
              <StatBox label="Positions" value={String(extras.history.length)} sub="listed" />
              <StatBox label="Current" value={extras.history.filter(h => h.current).length > 0 ? 'Active' : 'Available'} sub={agent.status === 'deployed' ? `at ${agent.client}` : 'on bench'} accent={agent.status === 'deployed' ? '#2f8d5c' : '#1d6fd6'} />
            </div>

            {/* Timeline */}
            <Card>
              <SectionTitle>Experience timeline</SectionTitle>
              <div style={{ position: 'relative' }}>
                {extras.history.map((h, i) => (
                  <div key={i} style={{ display: 'flex', gap: 18, paddingBottom: i < extras.history.length - 1 ? 24 : 0, position: 'relative' }}>
                    {/* Timeline line */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                      <div style={{ width: 12, height: 12, borderRadius: '50%', background: h.current ? '#1d6fd6' : '#d0ccbd', border: `2px solid ${h.current ? '#1d6fd6' : '#d0ccbd'}`, marginTop: 4, zIndex: 1 }} />
                      {i < extras.history.length - 1 && <div style={{ width: 2, flex: 1, background: '#e3e0d2', marginTop: 4 }} />}
                    </div>
                    <div style={{ flex: 1, paddingBottom: i < extras.history.length - 1 ? 0 : 0 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 }}>
                        <div>
                          <div style={{ fontSize: 14.5, fontWeight: 600, color: '#0b1220' }}>{h.role}</div>
                          <div style={{ fontSize: 13, color: '#5a6072', marginTop: 2 }}>{h.co}</div>
                        </div>
                        <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexShrink: 0 }}>
                          {h.current && <span style={{ padding: '2px 8px', background: 'rgba(29,111,214,0.1)', borderRadius: 4, fontSize: 10, fontWeight: 600, color: '#1d6fd6' }}>Current</span>}
                          <span style={{ fontSize: 11, color: '#8b93a7', fontFamily: 'monospace', background: '#f3f1ea', padding: '3px 8px', borderRadius: 4 }}>{h.when}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* ─── CERTIFICATIONS ─── */}
        {tab === 'certs' && (
          <div style={{ display: 'grid', gap: 20 }}>
            {/* Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              <StatBox label="Total certs" value={String(agent.certs)} sub="RemConnect verified" accent={agent.certs >= 4 ? '#2f8d5c' : undefined} />
              <StatBox label="Status" value={agent.certs >= 4 ? 'Fully certified' : agent.certs >= 2 ? 'In progress' : 'Getting started'} sub="" />
              <StatBox label="Education" value={extras.education !== '—' ? '✓' : '—'} sub={extras.education !== '—' ? 'degree on file' : 'none on file'} />
            </div>

            {agent.certs === 0 ? (
              <Card style={{ textAlign: 'center', padding: '40px 24px', background: '#f9f8f5' }}>
                <Icon name="award" size={32} color="#d0ccbd" />
                <div style={{ fontSize: 15, fontWeight: 500, color: '#5a6072', marginTop: 14 }}>No certifications yet</div>
                <div style={{ fontSize: 12.5, color: '#8b93a7', marginTop: 6, maxWidth: 340, margin: '8px auto 0' }}>
                  Certifications are earned by completing RemConnect training modules and passing assessments.
                </div>
              </Card>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                {extras.certifications.map((c, i) => (
                  <div key={i} style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, padding: 16, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(47,141,92,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid rgba(47,141,92,0.2)' }}>
                      <Icon name="award" size={18} color="#2f8d5c" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: '#0b1220' }}>{c.t}</div>
                      <div style={{ display: 'flex', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
                        <span style={{ padding: '2px 7px', background: 'rgba(47,141,92,0.08)', borderRadius: 3, fontSize: 10, color: '#2f8d5c', fontWeight: 600 }}>RemConnect verified</span>
                        <span style={{ fontSize: 11, color: '#8b93a7', fontFamily: 'monospace' }}>{c.d}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {extras.education && extras.education !== '—' && (
              <Card>
                <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8b93a7', marginBottom: 10 }}>Education</div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: '#f3f1ea', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon name="grad-cap" size={18} color="#5a6072" />
                  </div>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 500, color: '#0b1220' }}>{extras.education}</div>
                    <div style={{ fontSize: 11.5, color: '#8b93a7', marginTop: 3 }}>On file · unverified</div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}

        {/* ─── SKILLS & TOOLS ─── */}
        {tab === 'skills' && (
          <div style={{ display: 'grid', gap: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 16 }}>
              {/* Skills */}
              <Card>
                <SectionTitle>Skills</SectionTitle>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {agent.skills.map((s, idx) => (
                    <span key={s} style={{
                      padding: '7px 13px', background: idx < 3 ? '#0b1220' : '#f3f1ea',
                      borderRadius: 6, fontSize: 13, color: idx < 3 ? '#fff' : '#0b1220',
                      fontWeight: idx < 3 ? 500 : 400,
                    }}>{s}</span>
                  ))}
                </div>
                {agent.skills.length > 3 && (
                  <div style={{ fontSize: 11, color: '#8b93a7', marginTop: 10 }}>
                    Top 3 highlighted · {agent.skills.length} total skills
                  </div>
                )}
              </Card>

              {/* Languages */}
              <Card>
                <SectionTitle>Languages</SectionTitle>
                <div style={{ display: 'grid', gap: 10 }}>
                  {agent.langs.map((l, idx) => (
                    <div key={l} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: '#f9f8f5', borderRadius: 8, border: '1px solid #e3e0d2' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 700 }}>{l}</span>
                        <span style={{ fontSize: 12, color: '#5a6072' }}>
                          {l === 'EN' ? 'English' : l === 'AM' ? 'Amharic' : l === 'OM' ? 'Oromo' : l === 'TI' ? 'Tigrinya' : l === 'FR' ? 'French' : l}
                        </span>
                      </div>
                      <span style={{ fontSize: 11, color: idx === 0 ? '#1d6fd6' : '#8b93a7', fontWeight: 600 }}>
                        {idx === 0 ? 'Primary' : 'Fluent'}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Tools */}
            {extras.tools.length > 0 && (
              <Card>
                <SectionTitle>Tools & platforms</SectionTitle>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {extras.tools.map(t => (
                    <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '7px 12px', background: 'rgba(29,111,214,0.06)', border: '1px solid rgba(29,111,214,0.18)', borderRadius: 7 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#1d6fd6' }} />
                      <span style={{ fontSize: 13, color: '#0c3a7a', fontWeight: 500 }}>{t}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Education */}
            {extras.education && extras.education !== '—' && (
              <Card>
                <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8b93a7', marginBottom: 12 }}>Education background</div>
                <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: '#f3f1ea', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon name="grad-cap" size={20} color="#5a6072" />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{extras.education}</div>
                    <div style={{ fontSize: 11.5, color: '#8b93a7', marginTop: 2 }}>Academic background · on file</div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}

        {/* ─── CONTRACT & FINANCE (internal only) ─── */}
        {tab === 'contract' && !stealth && (
          <div style={{ display: 'grid', gap: 20 }}>
            {/* Margin highlight */}
            <Card style={{ background: 'linear-gradient(135deg, #0b1220, #1a2848)', borderColor: '#1a2848' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'monospace', fontSize: 42, fontWeight: 700, color: '#fff', lineHeight: 1 }}>{extras.margin}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 4 }}>Gross margin</div>
                </div>
                <div style={{ width: 1, height: 60, background: 'rgba(255,255,255,0.12)' }} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 28px' }}>
                  <div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginBottom: 2 }}>Pay rate</div>
                    <div style={{ fontFamily: 'monospace', fontSize: 18, fontWeight: 700, color: '#fff' }}>{extras.payRate}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginBottom: 2 }}>Bill rate</div>
                    <div style={{ fontFamily: 'monospace', fontSize: 18, fontWeight: 700, color: '#fff' }}>{extras.billRate}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginBottom: 2 }}>Contract</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>{extras.contractType}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginBottom: 2 }}>Employer</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>{extras.employer}</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Pay vs Bill bar */}
            <Card>
              <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8b93a7', marginBottom: 14 }}>Rate breakdown</div>
              <div style={{ marginBottom: 16 }}>
                {[
                  { label: 'Agent pay', rate: extras.payRate, color: '#5a6072', pct: 40 },
                  { label: 'RemConnect margin', rate: extras.margin, color: '#1d6fd6', pct: 60 },
                ].map(({ label, rate, color, pct }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <div style={{ width: 120, fontSize: 12, color: '#5a6072', flexShrink: 0 }}>{label}</div>
                    <div style={{ flex: 1, height: 8, background: '#f3f1ea', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 4 }} />
                    </div>
                    <div style={{ fontSize: 12, fontFamily: 'monospace', fontWeight: 600, color, width: 80, textAlign: 'right', flexShrink: 0 }}>{rate}</div>
                  </div>
                ))}
              </div>
              <div style={{ padding: 12, background: '#f9f8f5', borderRadius: 8, fontSize: 12, color: '#5a6072' }}>
                Bill rate of {extras.billRate} charged to client. Agent receives {extras.payRate}. Difference covers platform, benefits, and ops costs.
              </div>
            </Card>

            {/* Key dates & contract details */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Card>
                <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8b93a7', marginBottom: 12 }}>Key dates</div>
                {[
                  { label: 'Started at RemConnect', value: extras.started },
                  { label: 'Deployed since', value: extras.deployedSince !== '—' ? extras.deployedSince : 'Not yet deployed' },
                  { label: 'Current assignment', value: agent.status === 'deployed' ? agent.client : 'Unassigned' },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid #f3f1ea', fontSize: 12.5 }}>
                    <span style={{ color: '#5a6072' }}>{label}</span>
                    <span style={{ fontWeight: 500 }}>{value}</span>
                  </div>
                ))}
              </Card>
              <Card>
                <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8b93a7', marginBottom: 12 }}>Contact & compliance</div>
                {[
                  { icon: 'mail', val: extras.email },
                  { icon: 'phone', val: extras.phone },
                  { icon: 'clock', val: extras.hours },
                ].map(({ icon, val }) => (
                  <div key={icon} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: '1px solid #f3f1ea' }}>
                    <Icon name={icon} size={13} color="#5a6072" />
                    <span style={{ fontSize: 12.5 }}>{val}</span>
                  </div>
                ))}
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
