'use client'

import { useState } from 'react'
import { Icon } from '@/components/ui/Icon'
import { Chip } from '@/components/ui/Chip'
import { ScoreRing } from '@/components/ui/ScoreRing'

const TABS = [
  { id: 'Challenges',  sub: 'Scenario-based tasks' },
  { id: 'Interviews',  sub: 'Live AI interviews' },
  { id: 'Questions',   sub: 'Rapid-fire knowledge' },
  { id: 'Free-form',   sub: 'Creative & communication' },
  { id: 'Personality', sub: 'Culture & fit screening' },
]

const CHALLENGES = [
  { cat: 'Voice',    title: 'Angry customer — refund denied',               mins: 8,  tags: ['de-escalation', 'English'], level: 'Hard',   score: 76 },
  { cat: 'Voice',    title: 'Product recommendation under pressure',         mins: 6,  tags: ['upsell', 'clarity'],        level: 'Medium', score: 82 },
  { cat: 'Voice',    title: 'Hold, transfer, and callback discipline',       mins: 5,  tags: ['procedure'],               level: 'Easy',   score: 88 },
  { cat: 'Written',  title: 'Multi-thread chat simulation (3 parallel)',     mins: 10, tags: ['written', 'tone'],         level: 'Hard',   score: null },
  { cat: 'Written',  title: 'Email tone rewrite (passive → assertive)',      mins: 7,  tags: ['writing'],                 level: 'Medium', score: null },
  { cat: 'Systems',  title: 'Zendesk ticket triage under SLA',              mins: 12, tags: ['CRM'],                     level: 'Medium', score: null },
  { cat: 'Knowledge',title: 'Northwind product deep-dive quiz',             mins: 15, tags: ['product'],                 level: 'Medium', score: null },
  { cat: 'Personality',title:'Emotional agility & composure',               mins: 10, tags: ['soft skills'],             level: 'Standard',score: null },
]

const TAB_COUNTS: Record<string, number> = { Challenges: 8, Interviews: 2, Questions: 24, 'Free-form': 3, Personality: 1 }

export default function AssessmentsPage() {
  const [tab, setTab] = useState('Challenges')
  const selected = CHALLENGES.slice(0, 4)

  return (
    <div style={{ padding: '28px 32px 48px', maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <div style={{ fontSize: 11, color: '#5a6072', fontWeight: 600 }}>
          Configured by Ops · last updated Apr 18
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 14px', borderRadius: 6, border: '1px solid #e3e0d2', background: 'transparent', fontSize: 13, cursor: 'pointer', fontWeight: 500 }}>
            <Icon name="share" size={13} /> Share preview
          </button>
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 14px', borderRadius: 6, border: 'none', background: '#0b1220', color: '#faf9f6', fontSize: 13, cursor: 'pointer', fontWeight: 500 }}>
            <Icon name="play" size={13} color="#fff" /> Take assessment
          </button>
        </div>
      </div>

      <h1 style={{ fontFamily: 'var(--font-family-serif)', fontSize: 34, fontWeight: 400, letterSpacing: '-0.02em', margin: '0 0 4px' }}>
        Voice Support Agent · Northwind track
      </h1>
      <div style={{ color: '#5a6072', fontSize: 14, marginBottom: 20 }}>Mixed-format assessment · 62 minutes · 5 sections</div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 6, background: '#f3f1ea', padding: 4, borderRadius: 12, marginBottom: 24, width: 'fit-content' }}>
        {TABS.map(t => (
          <div key={t.id} onClick={() => setTab(t.id)} style={{
            padding: '10px 14px', borderRadius: 8, fontSize: 13, cursor: 'pointer', minWidth: 140,
            color: tab === t.id ? '#0b1220' : '#5a6072',
            background: tab === t.id ? '#fff' : 'transparent',
            border: `1px solid ${tab === t.id ? '#e3e0d2' : 'transparent'}`,
            boxShadow: tab === t.id ? '0 1px 2px rgba(11,18,32,0.06)' : 'none',
            fontWeight: tab === t.id ? 500 : 400,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {t.id}
              {tab === t.id && (
                <span style={{ display: 'inline-block', background: '#0b1220', color: '#fff', fontSize: 10, width: 20, height: 20, borderRadius: '50%', textAlign: 'center', lineHeight: '20px', fontFamily: 'monospace' }}>
                  {TAB_COUNTS[t.id]}
                </span>
              )}
            </div>
            <div style={{ fontSize: 11, color: '#5a6072', marginTop: 2 }}>{t.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 20 }}>
        {/* Library */}
        <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e3e0d2', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-family-serif)', fontSize: 22, letterSpacing: '-0.02em' }}>Library</div>
              <div style={{ fontSize: 12, color: '#5a6072' }}>From the RemConnect scenario library</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px', background: '#f3f1ea', borderRadius: 6, fontSize: 12, color: '#5a6072' }}>
                <Icon name="search" size={12} /> Search scenarios…
              </div>
              <button style={{ padding: '6px 10px', fontSize: 12, borderRadius: 6, border: '1px solid #e3e0d2', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <Icon name="filter" size={12} />
              </button>
            </div>
          </div>
          {CHALLENGES.slice(0, 4).map((c, i) => (
            <div key={i} style={{
              padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14,
              borderBottom: i < 3 ? '1px solid #e3e0d2' : 'none',
            }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: '#f3f1ea', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={c.cat === 'Voice' ? 'mic' : c.cat === 'Written' ? 'chat' : 'spreadsheet'} size={18} color="#5a6072" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 500, fontSize: 14 }}>{c.title}</div>
                <div style={{ fontSize: 11, color: '#5a6072', fontWeight: 600, marginTop: 4 }}>~{c.mins} min</div>
                <div style={{ display: 'flex', gap: 4, marginTop: 6, flexWrap: 'wrap' }}>
                  <Chip variant="neutral" style={{ fontSize: 10 }}>{c.cat}</Chip>
                  {c.tags.map(t => <Chip key={t} variant="neutral" style={{ fontSize: 10 }}>{t}</Chip>)}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <Chip variant={c.level === 'Hard' ? 'bad' : c.level === 'Easy' ? 'good' : 'neutral'} style={{ fontSize: 10 }}>{c.level}</Chip>
                <button style={{ padding: '6px 10px', fontSize: 11, borderRadius: 6, border: '1px solid #e3e0d2', background: 'transparent', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  Preview <Icon name="arrow-up-right" size={10} />
                </button>
                <button style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid #e3e0d2', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="plus" size={14} />
                </button>
              </div>
            </div>
          ))}
          {/* Histogram section */}
          <div style={{ padding: 20, borderTop: '1px solid #e3e0d2', background: '#f3f1ea' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: '#fff', border: '1px solid #e3e0d2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="activity" size={18} color="#1d6fd6" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>Performance · Angry customer scenario</div>
                <div style={{ fontSize: 11, color: '#5a6072', fontWeight: 600 }}>Distribution across 2,847 recruits</div>
              </div>
              <div style={{ display: 'flex', gap: 24, fontSize: 11 }}>
                {[{ l: 'Avg score', v: '6.2' }, { l: 'Pass rate', v: 'Low' }, { l: 'Reuse', v: 'High' }].map(s => (
                  <div key={s.l}>
                    <div style={{ color: '#5a6072', fontSize: 10 }}>{s.l}</div>
                    <div style={{ fontFamily: 'var(--font-family-serif)', fontSize: 18 }}>{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 80, marginTop: 14 }}>
              {Array.from({ length: 40 }).map((_, i) => {
                const center = 22, d = Math.abs(i - center)
                const h = Math.max(4, 70 - d * 2.2 + Math.sin(i * 3) * 8)
                const hue = 200 + (i / 40) * 60
                return <div key={i} style={{ flex: 1, height: h, borderRadius: 2, background: `linear-gradient(180deg, hsl(${hue}, 70%, 58%), hsl(${hue}, 70%, 72%))` }} />
              })}
            </div>
          </div>
        </div>

        {/* Selected */}
        <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, overflow: 'hidden', height: 'fit-content' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e3e0d2' }}>
            <div style={{ fontFamily: 'var(--font-family-serif)', fontSize: 20, letterSpacing: '-0.02em' }}>
              Selected <span style={{ color: '#5a6072' }}>({selected.length})</span>
            </div>
          </div>
          {selected.map((c, i) => (
            <div key={i} style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: i < selected.length - 1 ? '1px solid #e3e0d2' : 'none' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{c.title}</div>
                <div style={{ fontSize: 10, color: '#5a6072', fontWeight: 600, marginTop: 2, display: 'flex', gap: 6 }}>
                  <span>{c.cat}</span> · <span>{c.tags[0]}</span>
                </div>
              </div>
              {c.score != null
                ? <Chip variant="good" style={{ fontSize: 10 }}>✓ {c.score}</Chip>
                : <Chip style={{ fontSize: 10 }}>Pending</Chip>}
              <button style={{ padding: '5px 8px', fontSize: 11, borderRadius: 6, border: '1px solid #e3e0d2', background: 'transparent', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                Preview <Icon name="arrow-up-right" size={9} />
              </button>
              <button style={{ width: 24, height: 24, borderRadius: 6, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5a6072' }}>
                <Icon name="x" size={12} />
              </button>
            </div>
          ))}
          <div style={{ padding: 16, background: '#f3f1ea', borderTop: '1px solid #e3e0d2' }}>
            <div style={{ fontSize: 11, color: '#5a6072', fontWeight: 600, marginBottom: 6 }}>Custom content</div>
            <div style={{ fontSize: 12, color: '#5a6072', marginBottom: 10 }}>Ops can add company-specific scenarios, product knowledge, or rubrics.</div>
            <button style={{ width: '100%', justifyContent: 'center', padding: '9px 14px', borderRadius: 6, background: '#0b1220', color: '#faf9f6', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icon name="plus" size={13} color="#fff" /> Add custom scenario
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
