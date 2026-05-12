'use client'

import { Icon } from '@/components/ui/Icon'
import { Chip } from '@/components/ui/Chip'
import { Sparkline } from '@/components/ui/Sparkline'
import { ProgressBar } from '@/components/ui/ProgressBar'

const KPIs = [
  { label: 'CSAT',  value: '4.78', delta: '+0.12', sub: '/5.0',  data: [4.2, 4.5, 4.4, 4.6, 4.7, 4.78], color: '#2f8d5c' },
  { label: 'AHT',   value: '4m 12s', delta: '-0:18', sub: 'avg handle time', data: [280, 265, 272, 258, 252], color: '#1d6fd6' },
  { label: 'FCR',   value: '87%',  delta: '+3%',  sub: 'first call resolution', data: [78, 80, 82, 84, 87], color: '#3f6b4e' },
  { label: 'QA',    value: '94',   delta: '+2',   sub: '/100',  data: [82, 85, 88, 90, 92, 94], color: '#c08a2a' },
]

const COACH_NOTES = [
  { date: 'May 8',  text: 'Strong empathy in the Northwind escalation. Keep leading with acknowledgment before solution.', type: 'praise' },
  { date: 'May 5',  text: 'Avg AHT slightly elevated Tue–Wed. Try time-boxing product lookup to <45s per ticket.', type: 'tip' },
  { date: 'Apr 29', text: 'Perfect QA week. Zero flagged calls.', type: 'praise' },
]

export default function PerformancePage() {
  return (
    <div style={{ padding: '28px 32px 48px', maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 4 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-family-serif)', fontSize: 34, fontWeight: 400, letterSpacing: '-0.02em', margin: 0 }}>Performance</h1>
          <div style={{ color: '#5a6072', fontSize: 14, marginTop: 4, marginBottom: 20 }}>Northwind Retail · rolling 30 days</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 14px', borderRadius: 6, border: '1px solid #e3e0d2', background: 'transparent', fontSize: 13, cursor: 'pointer', fontWeight: 500 }}>
            <Icon name="download" size={13} /> Export
          </button>
        </div>
      </div>

      {/* KPI grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {KPIs.map(k => (
          <div key={k.label} style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 12, padding: '18px 20px' }}>
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#5a6072', marginBottom: 6 }}>{k.label}</div>
            <div style={{ fontFamily: 'var(--font-family-serif)', fontSize: 32, letterSpacing: '-0.02em', lineHeight: 1 }}>{k.value}</div>
            <div style={{ fontSize: 12, color: '#2f8d5c', marginTop: 4, fontFamily: 'monospace' }}>{k.delta} <span style={{ color: '#5a6072', fontFamily: 'inherit' }}>{k.sub}</span></div>
            <div style={{ marginTop: 12 }}>
              <Sparkline data={k.data} color={k.color} width={140} height={28} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
        {/* Daily pacing */}
        <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, padding: 20 }}>
          <div style={{ fontFamily: 'var(--font-family-serif)', fontSize: 22, letterSpacing: '-0.02em', marginBottom: 16 }}>Daily pacing vs target</div>
          {[
            { day: 'Mon', csat: 4.8, target: 4.6, tickets: 92, quota: 80 },
            { day: 'Tue', csat: 4.7, target: 4.6, tickets: 86, quota: 80 },
            { day: 'Wed', csat: 4.9, target: 4.6, tickets: 95, quota: 80 },
            { day: 'Thu', csat: 4.6, target: 4.6, tickets: 78, quota: 80 },
            { day: 'Fri', csat: 4.8, target: 4.6, tickets: 88, quota: 80 },
          ].map((d, i, arr) => (
            <div key={d.day} style={{ display: 'grid', gridTemplateColumns: '40px 1fr 60px', gap: 14, alignItems: 'center', padding: '10px 0', borderBottom: i < arr.length - 1 ? '1px solid #e3e0d2' : 'none' }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#5a6072' }}>{d.day}</div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#5a6072', marginBottom: 4 }}>
                  <span>CSAT {d.csat}</span><span style={{ color: d.tickets >= d.quota ? '#2f8d5c' : '#b54838' }}>{d.tickets} / {d.quota} tickets</span>
                </div>
                <ProgressBar value={d.csat / 5 * 100} variant={d.csat >= d.target ? 'good' : 'amber'} />
              </div>
              <Chip variant={d.csat >= d.target ? 'good' : 'neutral'} style={{ fontSize: 10 }}>{d.csat >= d.target ? '✓ Target' : 'Below'}</Chip>
            </div>
          ))}
        </div>

        {/* Coaching notes */}
        <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, padding: 18 }}>
          <div style={{ fontFamily: 'var(--font-family-serif)', fontSize: 20, letterSpacing: '-0.02em', marginBottom: 14 }}>Coaching notes</div>
          {COACH_NOTES.map((n, i) => (
            <div key={i} style={{ padding: '12px 0', borderBottom: i < COACH_NOTES.length - 1 ? '1px solid #e3e0d2' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <Chip variant={n.type === 'praise' ? 'good' : 'default'} style={{ fontSize: 10 }}>
                  {n.type === 'praise' ? '🌟 Praise' : '💡 Tip'}
                </Chip>
                <span style={{ fontSize: 11, color: '#5a6072', fontFamily: 'monospace' }}>{n.date}</span>
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.55, color: '#2a2f3c' }}>{n.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
