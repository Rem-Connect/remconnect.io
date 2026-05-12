'use client'

import { Icon } from '@/components/ui/Icon'
import type { AgentStatus } from '@/types'

const GREETINGS: Record<AgentStatus, { pre: string; big: string; sub: string }> = {
  recruit:  { pre: 'Welcome back,', big: "Let's finish strong.", sub: '3 modules today to reach Bench-ready by Friday.' },
  assess:   { pre: 'Almost there,', big: 'One assessment left.', sub: 'Complete the voice simulation to unlock your profile.' },
  bench:    { pre: "You're bench-ready,", big: 'Opportunities are on the way.', sub: 'Ops will invite you to briefs matched to your skills.' },
  deployed: { pre: 'Good morning,', big: 'Platinum streak: day 12.', sub: 'Northwind shift starts in 1h 24m. Warm-up ready.' },
}

interface MiniStatProps { k: string; v: string; delta: string; isText?: boolean }

function MiniStat({ k, v, delta, isText }: MiniStatProps) {
  return (
    <div style={{
      minWidth: 120, padding: '12px 16px',
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 10,
    }}>
      <div style={{ fontSize: 10, color: '#8b93a7', fontWeight: 600 }}>{k}</div>
      <div style={{ fontFamily: 'var(--font-family-serif)', fontSize: 28, letterSpacing: '-0.02em', marginTop: 2, color: '#faf9f6' }}>{v}</div>
      <div style={{ fontSize: 11, color: isText ? '#7cb3f5' : '#7ae0a8', marginTop: 2, fontFamily: isText ? 'inherit' : 'monospace' }}>{delta}</div>
    </div>
  )
}

interface HomeHeroProps { status: AgentStatus }

export function HomeHero({ status }: HomeHeroProps) {
  const g = GREETINGS[status]
  return (
    <div style={{
      background: 'linear-gradient(135deg, #0b1220 0%, #132245 55%, #0c3a7a 100%)',
      color: '#faf9f6', borderRadius: 16, padding: '28px 32px',
      position: 'relative', overflow: 'hidden', marginBottom: 24,
    }}>
      <div style={{
        position: 'absolute', top: -60, right: -40, width: 280, height: 280,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,179,245,0.22), transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 32 }}>
        <div style={{ maxWidth: 560 }}>
          <div style={{ fontSize: 12, color: '#7cb3f5' }}>{g.pre} Liya</div>
          <h1 style={{
            fontFamily: 'var(--font-family-serif)', fontSize: 42, fontWeight: 400,
            letterSpacing: '-0.02em', margin: '8px 0 10px', lineHeight: 1.05, color: '#faf9f6',
          }}>
            {g.big}
          </h1>
          <div style={{ fontSize: 14, color: 'rgba(250,249,246,0.75)', maxWidth: 460 }}>{g.sub}</div>
          <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
            {status === 'deployed' ? (
              <>
                <button style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 14px',
                  borderRadius: 6, background: '#1d6fd6', color: '#fff', border: 'none',
                  fontWeight: 500, fontSize: 13, cursor: 'pointer',
                }}>
                  <Icon name="bolt" size={13} color="#fff" /> Start shift warm-up
                </button>
                <button style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 14px',
                  borderRadius: 6, background: 'transparent', color: '#faf9f6',
                  border: '1px solid #243150', fontWeight: 500, fontSize: 13, cursor: 'pointer',
                }}>
                  View Northwind brief
                </button>
              </>
            ) : (
              <>
                <button style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 14px',
                  borderRadius: 6, background: '#1d6fd6', color: '#fff', border: 'none',
                  fontWeight: 500, fontSize: 13, cursor: 'pointer',
                }}>
                  <Icon name="play" size={13} color="#fff" /> Resume training
                </button>
                <button style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 14px',
                  borderRadius: 6, background: 'transparent', color: '#faf9f6',
                  border: '1px solid #243150', fontWeight: 500, fontSize: 13, cursor: 'pointer',
                }}>
                  Onboarding checklist
                </button>
              </>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16, flexShrink: 0 }}>
          {status === 'deployed' ? (
            <>
              <MiniStat k="CSAT this week" v="4.78" delta="+0.12" />
              <MiniStat k="QA score" v="94" delta="+2" />
              <MiniStat k="Streak" v="12d" delta="Platinum" isText />
            </>
          ) : (
            <>
              <MiniStat k="Training complete" v="62%" delta="+8% wk" />
              <MiniStat k="Skill score" v="74" delta="+4" />
              <MiniStat k="Readiness" v="B+" delta="Bench by Fri" isText />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
