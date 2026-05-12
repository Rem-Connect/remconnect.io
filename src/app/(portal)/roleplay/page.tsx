'use client'

import { useState, useEffect } from 'react'
import { Icon } from '@/components/ui/Icon'
import { Chip } from '@/components/ui/Chip'
import { ScoreRing } from '@/components/ui/ScoreRing'
import { Waveform } from '@/components/ui/Waveform'
import { Avatar } from '@/components/ui/Avatar'
import { ProgressBar } from '@/components/ui/ProgressBar'

const SCENARIO = {
  title: 'Angry customer — refund denied after 30-day window',
  brief: 'Customer bought a blender 34 days ago, it broke on day 32. Company policy: 30-day returns. Find a path to resolution without breaking policy.',
  persona: 'Michael, 42, small business owner, tone: escalating',
}

const SCRIPTS = [
  { who: 'ai',    text: "Listen — I bought this blender just over a month ago. It BROKE. I want my money back today.", ts: '00:02' },
  { who: 'agent', text: "I hear you, Michael. That's frustrating, especially when you need it for your business. Tell me what happened?", ts: '00:08' },
  { who: 'ai',    text: "It just stopped. Thirty-FOUR days. You're telling me four days is the difference between me getting help or not?", ts: '00:19' },
  { who: 'agent', text: "I understand how that sounds. Our policy is 30 days for refunds — but we can still help. Let me check your warranty options…", ts: '00:28' },
]

const COACH_NOTES = [
  { text: 'Acknowledged emotion before solving',  status: 'good', sec: '00:08' },
  { text: 'Named the customer — builds trust',     status: 'good', sec: '00:08' },
  { text: 'Said "policy" without softening',       status: 'warn', sec: '00:28', tip: 'Try "our standard window" to reduce friction' },
  { text: "Haven't offered alternative yet",       status: 'warn', sec: 'now',   tip: 'Pivot to warranty or store credit soon' },
]

const SCORES = [
  { k: 'Empathy', v: 82 }, { k: 'Clarity', v: 74 }, { k: 'Policy use', v: 62 }, { k: 'Resolution', v: 48 },
]

export default function RoleplayPage() {
  const [waveLevel, setWaveLevel] = useState(0.4)

  useEffect(() => {
    const id = setInterval(() => setWaveLevel(0.2 + Math.random() * 0.7), 180)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ padding: '28px 32px 48px', maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-family-serif)', fontSize: 34, fontWeight: 400, letterSpacing: '-0.02em', margin: 0 }}>AI role-play</h1>
          <div style={{ color: '#5a6072', fontSize: 14, marginTop: 4 }}>Practice real scenarios with an AI customer. Get live coaching while you talk.</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 14px', borderRadius: 6, border: '1px solid #e3e0d2', background: 'transparent', fontSize: 13, cursor: 'pointer', fontWeight: 500 }}>
            <Icon name="clock" size={13} /> History
          </button>
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 14px', borderRadius: 6, border: '1px solid #e3e0d2', background: 'transparent', fontSize: 13, cursor: 'pointer', fontWeight: 500 }}>
            New scenario
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20 }}>
        {/* Main conversation panel — dark */}
        <div style={{ background: '#0b1220', borderRadius: 16, padding: 24, color: '#faf9f6', minHeight: 580, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <Chip variant="dark">Scenario 03 of 12</Chip>
                <Chip variant="dark"><span className="rc-pulse" style={{ width: 6, height: 6, borderRadius: '50%', background: '#7ae0a8' }} /> Live</Chip>
                <Chip variant="dark" style={{ fontFamily: 'monospace' }}>00:34</Chip>
              </div>
              <div style={{ fontFamily: 'var(--font-family-serif)', fontSize: 22, letterSpacing: '-0.02em' }}>{SCENARIO.title}</div>
              <div style={{ fontSize: 12, color: '#8b93a7', marginTop: 6, maxWidth: 480 }}>{SCENARIO.brief}</div>
            </div>
            <button style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 10px', fontSize: 11, borderRadius: 6, background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer' }}>
              <Icon name="x" size={11} color="#fff" /> End session
            </button>
          </div>

          {/* Transcript */}
          <div className="rc-scroll" style={{ flex: 1, overflowY: 'auto', paddingRight: 8 }}>
            {SCRIPTS.map((m, i) => (
              <div key={i} className="rc-fadein" style={{ display: 'flex', gap: 10, marginBottom: 14, alignItems: 'flex-start' }}>
                {m.who === 'ai'
                  ? <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg, #b54838, #0c3a7a)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon name="user" size={14} color="#fff" />
                    </div>
                  : <Avatar name="Liya Demeke" size={30} tone={0} />
                }
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11, color: '#8b93a7', fontWeight: 600, marginBottom: 4 }}>
                    {m.who === 'ai' ? 'Michael (customer)' : 'You'} · <span style={{ fontFamily: 'monospace' }}>{m.ts}</span>
                  </div>
                  <div style={{
                    fontSize: 13, lineHeight: 1.55, padding: '10px 14px', borderRadius: 10,
                    background: m.who === 'ai' ? '#121a2b' : 'rgba(29,111,214,0.18)',
                    border: '1px solid ' + (m.who === 'ai' ? '#243150' : 'rgba(124,179,245,0.3)'),
                    maxWidth: '85%',
                  }}>{m.text}</div>
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', color: '#8b93a7', fontSize: 12, padding: '4px 10px' }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg, #b54838, #0c3a7a)', flexShrink: 0 }} />
              <span className="rc-typing"><span /><span /><span /></span>
              {' '}Michael is typing back…
            </div>
          </div>

          {/* Mic composer */}
          <div style={{ marginTop: 16, padding: 14, background: '#121a2b', borderRadius: 12, border: '1px solid #243150', display: 'flex', alignItems: 'center', gap: 14 }}>
            <button style={{ width: 44, height: 44, borderRadius: '50%', border: 'none', background: '#1d6fd6', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 5px rgba(29,111,214,0.24)', flexShrink: 0 }}>
              <Icon name="mic" size={18} color="#fff" />
            </button>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: '#8b93a7', fontWeight: 600, marginBottom: 6, fontFamily: 'monospace' }}>LISTENING · 00:12</div>
              <Waveform bars={56} color="#7cb3f5" active={waveLevel} height={28} />
            </div>
            <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
              <button style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 10px', fontSize: 11, borderRadius: 6, background: 'transparent', color: '#faf9f6', border: '1px solid #243150', cursor: 'pointer' }}>
                <Icon name="pause" size={11} color="#fff" /> Pause
              </button>
              <button style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 10px', fontSize: 11, borderRadius: 6, background: 'transparent', color: '#faf9f6', border: '1px solid #243150', cursor: 'pointer' }}>
                Type instead
              </button>
            </div>
          </div>
        </div>

        {/* Coach sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, padding: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg, #1d6fd6, #7cb3f5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="spark" size={12} color="#fff" />
              </div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>Live coach</div>
              <Chip style={{ marginLeft: 'auto', fontSize: 10 }}>
                <span className="rc-pulse" style={{ width: 5, height: 5, borderRadius: '50%', background: '#1d6fd6' }} /> listening
              </Chip>
            </div>
            <div style={{ fontSize: 11, color: '#5a6072', fontWeight: 600, marginBottom: 8 }}>Observations</div>
            {COACH_NOTES.map((n, i) => (
              <div key={i} style={{
                display: 'flex', gap: 8, padding: '8px 10px', borderRadius: 6, marginBottom: 4,
                background: n.status === 'good' ? 'rgba(47,141,92,0.08)' : 'rgba(192,138,42,0.08)',
                border: '1px solid ' + (n.status === 'good' ? 'rgba(47,141,92,0.2)' : 'rgba(192,138,42,0.2)'),
              }}>
                <Icon name={n.status === 'good' ? 'check' : 'info'} size={12} color={n.status === 'good' ? '#2f8d5c' : '#c08a2a'} />
                <div style={{ fontSize: 12, flex: 1 }}>
                  {n.text}
                  {n.tip && <div style={{ color: '#5a6072', fontSize: 11, marginTop: 3 }}>{n.tip}</div>}
                </div>
                <span style={{ fontSize: 10, fontFamily: 'monospace', color: '#5a6072' }}>{n.sec}</span>
              </div>
            ))}
          </div>

          <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, padding: 18 }}>
            <div style={{ fontSize: 11, color: '#5a6072', fontWeight: 600, marginBottom: 10 }}>Running score</div>
            {SCORES.map(d => (
              <div key={d.k} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                  <span>{d.k}</span>
                  <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{d.v}</span>
                </div>
                <ProgressBar value={d.v} variant="amber" />
              </div>
            ))}
            <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid #e3e0d2', display: 'flex', alignItems: 'center', gap: 10 }}>
              <ScoreRing value={67} size={44} thickness={4} color="var(--rc-blue)" />
              <div>
                <div style={{ fontSize: 11, color: '#5a6072', fontWeight: 600 }}>Composite</div>
                <div style={{ fontFamily: 'var(--font-family-serif)', fontSize: 18, letterSpacing: '-0.02em' }}>Trending up</div>
              </div>
            </div>
          </div>

          <div style={{ background: '#f3f1ea', border: '1px solid #e3e0d2', borderRadius: 10, padding: 18 }}>
            <div style={{ fontSize: 11, color: '#5a6072', fontWeight: 600, marginBottom: 8 }}>Persona</div>
            <div style={{ fontSize: 13, lineHeight: 1.55 }}>{SCENARIO.persona}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
