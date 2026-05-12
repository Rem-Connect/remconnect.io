'use client'

import { Icon } from '@/components/ui/Icon'
import { Chip } from '@/components/ui/Chip'
import { Avatar } from '@/components/ui/Avatar'
import { ScoreRing } from '@/components/ui/ScoreRing'
import { SkillRadar } from '@/components/ui/SkillRadar'
import { Sparkline } from '@/components/ui/Sparkline'

const RADAR_AXES = [
  { k: 'Empathy',    v: 88 },
  { k: 'Clarity',   v: 82 },
  { k: 'Speed',     v: 79 },
  { k: 'Tech',      v: 73 },
  { k: 'Retention', v: 85 },
  { k: 'FCR',       v: 87 },
]

const KPI_CARDS = [
  { label: 'CSAT', value: '4.78', sub: '/5.0', delta: '+0.12', data: [4.2, 4.5, 4.4, 4.6, 4.7, 4.78], color: '#2f8d5c' },
  { label: 'AHT',  value: '4m 12s', sub: 'avg', delta: '-0:18', data: [280, 265, 272, 258, 252], color: '#1d6fd6' },
  { label: 'FCR',  value: '87%', sub: 'first-call', delta: '+3%', data: [78, 80, 82, 84, 87], color: '#3f6b4e' },
]

export default function ClientViewPage() {
  return (
    <div style={{ padding: '28px 32px 48px', maxWidth: 1100, margin: '0 auto' }}>
      {/* Banner */}
      <div style={{ background: 'rgba(29,111,214,0.06)', border: '1px solid rgba(29,111,214,0.18)', borderRadius: 8, padding: '10px 16px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
        <Icon name="info" size={14} color="#1d6fd6" />
        <span>This is a <b>read-only preview</b> of your public profile as clients see it after you are assigned to their account.</span>
      </div>

      {/* Profile hero */}
      <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, padding: '28px 32px', marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
          <Avatar name="Liya Demeke" size={80} tone={0} />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <h2 style={{ fontFamily: 'var(--font-family-serif)', fontSize: 28, fontWeight: 400, letterSpacing: '-0.02em', margin: 0 }}>Liya Demeke</h2>
              <Chip variant="good" style={{ fontSize: 10 }}>
                <span className="rc-pulse" style={{ width: 5, height: 5, borderRadius: '50%', background: '#2f8d5c', display: 'inline-block', marginRight: 4 }} />
                Active
              </Chip>
            </div>
            <div style={{ fontSize: 14, color: '#5a6072', marginBottom: 10 }}>Customer Support Specialist · RemConnect Agent</div>
            <div style={{ display: 'flex', flex: 'wrap', gap: 6, marginBottom: 12 }}>
              {['Active listening', 'Ticket routing', 'Escalation', 'Amharic', 'English', 'CRM tools', 'CSAT optimization'].map(s => (
                <Chip key={s} style={{ fontSize: 11 }}>{s}</Chip>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 20, fontSize: 13, color: '#5a6072' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Icon name="globe" size={12} />Addis Ababa, Ethiopia</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Icon name="clock" size={12} />EAT (UTC+3)</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Icon name="briefcase" size={12} />2 yrs experience</span>
            </div>
          </div>
          <ScoreRing value={94} size={72} thickness={6} color="var(--rc-blue)" label="Fit" />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 20 }}>
        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* KPIs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {KPI_CARDS.map(k => (
              <div key={k.label} style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 12, padding: '16px 18px' }}>
                <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#5a6072', marginBottom: 4 }}>{k.label}</div>
                <div style={{ fontFamily: 'var(--font-family-serif)', fontSize: 28, letterSpacing: '-0.02em', lineHeight: 1 }}>{k.value}</div>
                <div style={{ fontSize: 11, color: '#2f8d5c', marginTop: 4, fontFamily: 'monospace' }}>{k.delta} <span style={{ color: '#5a6072' }}>{k.sub}</span></div>
                <Sparkline data={k.data} color={k.color} width={120} height={22} style={{ marginTop: 10 }} />
              </div>
            ))}
          </div>

          {/* Experience */}
          <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, padding: 20 }}>
            <div style={{ fontFamily: 'var(--font-family-serif)', fontSize: 20, letterSpacing: '-0.02em', marginBottom: 14 }}>Experience</div>
            {[
              { role: 'Customer Support Specialist', org: 'RemConnect — Northwind Retail', dates: 'Apr 2026 – Present', bullets: ['Tier 1 support, 40h/wk, 80+ tickets/day', 'CSAT 4.78 · AHT 4m 12s · FCR 87%'] },
              { role: 'Call Centre Agent', org: 'Ethio Telecom', dates: 'Jan 2024 – Mar 2026', bullets: ['Handled billing, technical, and service queries', 'Maintained 4.6 avg CSAT across 18 months'] },
            ].map((e, i, arr) => (
              <div key={i} style={{ paddingBottom: i < arr.length - 1 ? 16 : 0, marginBottom: i < arr.length - 1 ? 16 : 0, borderBottom: i < arr.length - 1 ? '1px solid #e3e0d2' : 'none' }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{e.role}</div>
                <div style={{ fontSize: 12, color: '#5a6072', marginTop: 2 }}>{e.org} · {e.dates}</div>
                <ul style={{ margin: '8px 0 0 16px', padding: 0, fontSize: 12, color: '#5a6072', lineHeight: 1.7 }}>
                  {e.bullets.map(b => <li key={b}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>

          {/* Certifications visible to client */}
          <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, padding: 20 }}>
            <div style={{ fontFamily: 'var(--font-family-serif)', fontSize: 20, letterSpacing: '-0.02em', marginBottom: 14 }}>Credentials</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { name: 'Verified Support Fundamentals', issuer: 'RemConnect', id: 'RC-VSF-2847', icon: 'check' },
                { name: 'CX Excellence Level 1', issuer: 'RemConnect', id: 'RC-CXE1-1193', icon: 'check' },
                { name: 'TOEFL iBT — Score 110', issuer: 'ETS', id: '0000-2847-XB', icon: 'check' },
                { name: 'Google CX Professional', issuer: 'Google', id: 'GGL-CX-88421', icon: 'check' },
              ].map(c => (
                <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', background: '#f3f1ea', borderRadius: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 6, background: '#2f8d5c', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon name={c.icon} size={14} color="#fff" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: '#5a6072' }}>{c.issuer} · {c.id}</div>
                  </div>
                  <Chip variant="good" style={{ fontSize: 10 }}>Verified</Chip>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, padding: 18 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#5a6072', marginBottom: 10 }}>Skill profile</div>
            <SkillRadar axes={RADAR_AXES} size={200} />
          </div>

          <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, padding: 18 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#5a6072', marginBottom: 10 }}>Languages</div>
            {[
              { lang: 'Amharic', level: 'Native', pct: 100 },
              { lang: 'English', level: 'Fluent (C1)', pct: 88 },
            ].map(l => (
              <div key={l.lang} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                  <span style={{ fontWeight: 500 }}>{l.lang}</span>
                  <span style={{ color: '#5a6072' }}>{l.level}</span>
                </div>
                <div style={{ height: 4, background: '#e3e0d2', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${l.pct}%`, background: '#1d6fd6', borderRadius: 2 }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, padding: 18 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#5a6072', marginBottom: 10 }}>Availability</div>
            <div style={{ fontSize: 13, lineHeight: 1.6 }}>
              <div style={{ marginBottom: 4 }}><b>Timezone:</b> EAT (UTC+3)</div>
              <div style={{ marginBottom: 4 }}><b>Hours:</b> Mon–Fri, 9 AM – 6 PM</div>
              <div><b>Overlap:</b> 3h with EST · 6h with CET</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
