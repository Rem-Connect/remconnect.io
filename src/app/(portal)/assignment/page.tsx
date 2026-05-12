'use client'

import { Icon } from '@/components/ui/Icon'
import { Chip } from '@/components/ui/Chip'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Avatar } from '@/components/ui/Avatar'

const TOOLS = [
  { name: 'Zendesk', role: 'Primary ticketing', icon: 'briefcase', url: '#' },
  { name: 'Confluence', role: 'Knowledge base', icon: 'document', url: '#' },
  { name: 'Slack #northwind-agents', role: 'Team chat', icon: 'globe', url: '#' },
  { name: 'Looker Dashboard', role: 'CSAT + volume', icon: 'spreadsheet', url: '#' },
]

const TEAM = [
  { name: 'Mekdes Haile',  role: 'Team lead',       tone: 2, status: 'online' },
  { name: 'Tigist Bekele', role: 'Senior agent',     tone: 3, status: 'online' },
  { name: 'Eyob Tesfaye',  role: 'Agent',            tone: 4, status: 'busy' },
  { name: 'Naol Gemechu',  role: 'Agent',            tone: 1, status: 'offline' },
  { name: 'Sara Alemu',    role: 'Agent',            tone: 5, status: 'online' },
]

const SHIFT_ENDS_HRS = 3
const SHIFT_ENDS_MINS = 22

export default function AssignmentPage() {
  const shiftPct = Math.round(((8 - SHIFT_ENDS_HRS) / 8) * 100)

  return (
    <div style={{ padding: '28px 32px 48px', maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-family-serif)', fontSize: 34, fontWeight: 400, letterSpacing: '-0.02em', margin: 0 }}>My Assignment</h1>
          <div style={{ color: '#5a6072', fontSize: 14, marginTop: 4 }}>Northwind Retail · Customer Support · Wave 3</div>
        </div>
        <Chip variant="good" style={{ fontSize: 12, padding: '6px 12px' }}>
          <span className="rc-pulse" style={{ width: 6, height: 6, borderRadius: '50%', background: '#2f8d5c', display: 'inline-block', marginRight: 6 }} />
          Active deployment
        </Chip>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Client brief */}
          <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, padding: 20 }}>
            <div style={{ fontFamily: 'var(--font-family-serif)', fontSize: 20, letterSpacing: '-0.02em', marginBottom: 14 }}>Client brief</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 16 }}>
              {[
                ['Client', 'Northwind Retail'],
                ['Industry', 'E-commerce / Retail'],
                ['Contract type', 'Full-time · 40 hrs/wk'],
                ['Engagement start', 'April 14, 2026'],
                ['Primary language', 'English'],
                ['Secondary', 'Amharic (as-needed)'],
              ].map(([k, v]) => (
                <div key={k}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: '#5a6072', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>{k}</div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid #e3e0d2', paddingTop: 14 }}>
              <div style={{ fontSize: 12, color: '#5a6072', lineHeight: 1.6 }}>
                Northwind Retail operates a high-volume Tier 1 support queue handling order status, returns, and product questions.
                Agents are expected to maintain CSAT ≥ 4.6 and AHT ≤ 5 minutes. Escalation paths are documented in Confluence.
              </div>
            </div>
          </div>

          {/* Shift timer */}
          <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
              <div style={{ fontFamily: 'var(--font-family-serif)', fontSize: 20, letterSpacing: '-0.02em' }}>Today&apos;s shift</div>
              <Chip variant="good" style={{ fontSize: 10 }}>
                <span className="rc-pulse" style={{ width: 5, height: 5, borderRadius: '50%', background: '#2f8d5c', display: 'inline-block', marginRight: 4 }} />
                In progress
              </Chip>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 11, color: '#5a6072', fontWeight: 600, marginBottom: 4 }}>SHIFT ENDS IN</div>
                <div style={{ fontFamily: 'var(--font-family-serif)', fontSize: 32, letterSpacing: '-0.02em' }}>
                  {SHIFT_ENDS_HRS}h {SHIFT_ENDS_MINS}m
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: '#5a6072', fontWeight: 600, marginBottom: 4 }}>TICKETS TODAY</div>
                <div style={{ fontFamily: 'var(--font-family-serif)', fontSize: 32, letterSpacing: '-0.02em' }}>47 <span style={{ fontSize: 14, color: '#5a6072' }}>/ 80</span></div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: '#5a6072', fontWeight: 600, marginBottom: 4 }}>CSAT TODAY</div>
                <div style={{ fontFamily: 'var(--font-family-serif)', fontSize: 32, letterSpacing: '-0.02em', color: '#2f8d5c' }}>4.8</div>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#5a6072', marginBottom: 4 }}>
                <span>Shift progress</span>
                <span>{shiftPct}% complete</span>
              </div>
              <ProgressBar value={shiftPct} variant="good" />
            </div>
          </div>

          {/* Tools */}
          <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, padding: 20 }}>
            <div style={{ fontFamily: 'var(--font-family-serif)', fontSize: 20, letterSpacing: '-0.02em', marginBottom: 14 }}>Tools & access</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
              {TOOLS.map(t => (
                <a key={t.name} href={t.url} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: '#f3f1ea', borderRadius: 8, textDecoration: 'none', color: '#0b1220', transition: 'background 0.15s' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: '#fff', border: '1px solid #e3e0d2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon name={t.icon} size={16} color="#5a6072" />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: '#5a6072' }}>{t.role}</div>
                  </div>
                  <Icon name="arrow-right" size={12} color="#8b93a7" style={{ marginLeft: 'auto' }} />
                </a>
              ))}
            </div>
          </div>

          {/* Targets */}
          <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, padding: 20 }}>
            <div style={{ fontFamily: 'var(--font-family-serif)', fontSize: 20, letterSpacing: '-0.02em', marginBottom: 14 }}>Performance targets</div>
            {[
              { label: 'CSAT target', target: '≥ 4.6', current: '4.78', good: true },
              { label: 'AHT target',  target: '≤ 5:00', current: '4:12', good: true },
              { label: 'FCR target',  target: '≥ 85%', current: '87%', good: true },
              { label: 'QA score',    target: '≥ 90', current: '94', good: true },
            ].map((t, i, arr) => (
              <div key={t.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < arr.length - 1 ? '1px solid #e3e0d2' : 'none' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{t.label}</div>
                  <div style={{ fontSize: 11, color: '#5a6072' }}>Target: {t.target}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ fontFamily: 'monospace', fontWeight: 600, fontSize: 16, color: t.good ? '#2f8d5c' : '#b54838' }}>{t.current}</div>
                  <Chip variant={t.good ? 'good' : 'bad'} style={{ fontSize: 10 }}>{t.good ? '✓ On target' : 'Below'}</Chip>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Team */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #e3e0d2', fontFamily: 'var(--font-family-serif)', fontSize: 20, letterSpacing: '-0.02em' }}>
              Team
            </div>
            {TEAM.map((m, i) => (
              <div key={m.name} style={{ padding: '12px 20px', borderBottom: i < TEAM.length - 1 ? '1px solid #e3e0d2' : 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <Avatar name={m.name} size={34} tone={m.tone} />
                  <div style={{
                    position: 'absolute', bottom: 0, right: 0, width: 9, height: 9, borderRadius: '50%',
                    background: m.status === 'online' ? '#2f8d5c' : m.status === 'busy' ? '#c08a2a' : '#8b93a7',
                    border: '2px solid #fff',
                  }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{m.name}</div>
                  <div style={{ fontSize: 11, color: '#5a6072' }}>{m.role}</div>
                </div>
                <div style={{ fontSize: 10, color: m.status === 'online' ? '#2f8d5c' : m.status === 'busy' ? '#c08a2a' : '#8b93a7', fontWeight: 600 }}>
                  {m.status}
                </div>
              </div>
            ))}
          </div>

          {/* Schedule */}
          <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, padding: 18 }}>
            <div style={{ fontFamily: 'var(--font-family-serif)', fontSize: 20, letterSpacing: '-0.02em', marginBottom: 14 }}>This week</div>
            {[
              { day: 'Mon', shift: '9:00 AM – 6:00 PM', done: true },
              { day: 'Tue', shift: '9:00 AM – 6:00 PM', done: true },
              { day: 'Wed', shift: '9:00 AM – 6:00 PM', done: false, today: true },
              { day: 'Thu', shift: '9:00 AM – 6:00 PM', done: false },
              { day: 'Fri', shift: '9:00 AM – 6:00 PM', done: false },
            ].map((d, i, arr) => (
              <div key={d.day} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '9px 0',
                borderBottom: i < arr.length - 1 ? '1px solid #e3e0d2' : 'none',
              }}>
                <div style={{ width: 32, fontSize: 11, fontWeight: 600, color: d.today ? '#1d6fd6' : '#5a6072' }}>{d.day}</div>
                <div style={{ flex: 1, fontSize: 12, fontFamily: 'monospace', color: d.done ? '#8b93a7' : '#0b1220' }}>{d.shift}</div>
                {d.done
                  ? <Icon name="check" size={12} color="#2f8d5c" />
                  : d.today
                    ? <Chip variant="warn" style={{ fontSize: 9 }}>Today</Chip>
                    : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
