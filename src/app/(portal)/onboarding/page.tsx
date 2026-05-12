'use client'

import { Icon } from '@/components/ui/Icon'
import { ScoreRing } from '@/components/ui/ScoreRing'
import { Avatar } from '@/components/ui/Avatar'
import { ProgressBar } from '@/components/ui/ProgressBar'

const SECTIONS = [
  { title: 'Personal details', items: [
    { label: 'Profile photo',         done: true },
    { label: 'Contact & address',     done: true },
    { label: 'Emergency contact',     done: true },
  ]},
  { title: 'Identity & compliance', items: [
    { label: 'Ethiopian national ID',     done: true },
    { label: 'Bank account verification', done: true },
    { label: 'NDA signed',               done: false, cta: 'Sign' },
    { label: 'Background check consent', done: false, cta: 'Consent' },
  ]},
  { title: 'Equipment & environment', items: [
    { label: 'Laptop specs check',                               done: true },
    { label: 'Internet speed test (min 10 Mbps)',                done: true, meta: 'Result: 42 Mbps ✓' },
    { label: 'Remote setup photos (8 items)',                    done: false, cta: 'Open', meta: '6 of 8 uploaded · 2 awaiting review' },
  ]},
  { title: 'Policies & training prerequisites', items: [
    { label: 'RemConnect Code of Conduct', done: true },
    { label: 'Data handling basics',       done: true },
    { label: 'PCI compliance quiz',        done: false, cta: 'Take quiz' },
  ]},
]

const EVENTS = [
  { day: 'Wed', title: 'Cohort standup',       when: '9:00 AM EAT' },
  { day: 'Thu', title: 'Mock interview session',when: '2:00 PM EAT' },
  { day: 'Fri', title: 'Bench-ready review',    when: '4:00 PM EAT' },
]

export default function OnboardingPage() {
  const allItems = SECTIONS.flatMap(s => s.items)
  const doneCount = allItems.filter(i => i.done).length
  const pct = Math.round(doneCount / allItems.length * 100)

  return (
    <div style={{ padding: '28px 32px 48px', maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-family-serif)', fontSize: 34, fontWeight: 400, letterSpacing: '-0.02em', margin: 0 }}>
            Recruit onboarding
          </h1>
          <div style={{ color: '#5a6072', fontSize: 14, marginTop: 4 }}>
            Complete every step to unlock assignments. Takes most recruits 3–4 days.
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <ScoreRing value={pct} size={62} thickness={6} color="var(--rc-blue)" />
          <div>
            <div style={{ fontSize: 11, color: '#5a6072', fontWeight: 600 }}>Progress</div>
            <div style={{ fontFamily: 'var(--font-family-serif)', fontSize: 24, letterSpacing: '-0.02em' }}>
              {doneCount} of {allItems.length}
            </div>
            <div style={{ fontSize: 11, color: '#2f8d5c' }}>2 steps left today</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {SECTIONS.map((s, si) => {
            const d = s.items.filter(it => it.done).length
            return (
              <div key={si} style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, overflow: 'hidden' }}>
                <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid #e3e0d2' }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: d === s.items.length ? 'rgba(47,141,92,0.15)' : '#f3f1ea',
                    color: d === s.items.length ? '#2f8d5c' : '#5a6072',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'monospace', fontSize: 12, fontWeight: 600,
                  }}>
                    {d === s.items.length ? <Icon name="check" size={14} color="#2f8d5c" /> : si + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>{s.title}</div>
                    <div style={{ fontSize: 12, color: '#5a6072' }}>{d} of {s.items.length} complete</div>
                  </div>
                  <div style={{ width: 80 }}>
                    <ProgressBar value={d / s.items.length * 100} variant={d === s.items.length ? 'good' : 'amber'} />
                  </div>
                </div>
                {s.items.map((it, j) => (
                  <div key={j} style={{
                    padding: '12px 20px 12px 60px',
                    display: 'flex', alignItems: 'center', gap: 12,
                    borderBottom: j < s.items.length - 1 ? '1px solid #e3e0d2' : 'none',
                  }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                      border: it.done ? 'none' : '1.5px solid #e3e0d2',
                      background: it.done ? '#2f8d5c' : '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {it.done && <Icon name="check" size={11} color="#fff" />}
                    </div>
                    <div style={{ flex: 1, fontSize: 13, color: it.done ? '#5a6072' : '#0b1220', textDecoration: it.done ? 'line-through' : 'none' }}>
                      {it.label}
                      {'meta' in it && it.meta && (
                        <span style={{ color: '#2f8d5c', fontSize: 11, marginLeft: 8, fontFamily: 'monospace' }}>{it.meta}</span>
                      )}
                    </div>
                    {'cta' in it && it.cta && !it.done && (
                      <button style={{ padding: '5px 10px', fontSize: 11, borderRadius: 6, background: '#0b1220', color: '#faf9f6', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
                        {it.cta}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )
          })}
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, padding: 18 }}>
            <div style={{ fontSize: 11, color: '#5a6072', fontWeight: 600 }}>Your buddy</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}>
              <Avatar name="Betel Yared" tone={2} size={40} />
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>Betel Yared</div>
                <div style={{ fontSize: 11, color: '#5a6072', fontWeight: 600 }}>Cohort lead · Feb 2026</div>
              </div>
            </div>
            <button style={{ marginTop: 12, width: '100%', justifyContent: 'center', padding: '8px 12px', fontSize: 13, borderRadius: 6, border: '1px solid #e3e0d2', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icon name="chat" size={13} /> Message Betel
            </button>
          </div>
          <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, padding: 18 }}>
            <div style={{ fontSize: 11, color: '#5a6072', fontWeight: 600 }}>Upcoming</div>
            {EVENTS.map((e, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < EVENTS.length - 1 ? '1px solid #e3e0d2' : 'none' }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: '#f3f1ea', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ fontSize: 10, color: '#5a6072', fontWeight: 600 }}>{e.day}</div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{e.title}</div>
                  <div style={{ fontSize: 11, color: '#5a6072', fontWeight: 600 }}>{e.when}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
