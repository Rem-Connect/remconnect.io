'use client'

import { useState } from 'react'
import { Icon } from '@/components/ui/Icon'
import { Chip } from '@/components/ui/Chip'
import { ScoreRing } from '@/components/ui/ScoreRing'
import { ProgressBar } from '@/components/ui/ProgressBar'

const STEPS = [
  {
    id: 'nda', title: 'Sign NDA & confidentiality agreement', category: 'Legal',
    desc: 'DocuSign link sent to your registered email. Complete before accessing client systems.',
    status: 'done', automationId: 'N8N-NDA-001', doneAt: 'Apr 12',
  },
  {
    id: 'bgcheck', title: 'Background check consent', category: 'Legal',
    desc: 'Consent form for ID verification. Takes 1–2 business days.',
    status: 'done', automationId: 'N8N-BGC-002', doneAt: 'Apr 12',
  },
  {
    id: 'equip', title: 'Equipment verification sign-off', category: 'Setup',
    desc: 'Ops reviews your remote setup photos and marks this complete.',
    status: 'done', automationId: 'N8N-EQP-003', doneAt: 'Apr 14',
  },
  {
    id: 'training', title: 'Complete Northwind product training', category: 'Training',
    desc: '4 modules covering product catalog, return policy, and tier routing. ~3 hours.',
    status: 'done', automationId: 'N8N-TRN-004', doneAt: 'Apr 15',
  },
  {
    id: 'shadow', title: 'Shadow session — 4 hours', category: 'Training',
    desc: 'Listen in on live calls with a senior agent before going solo.',
    status: 'done', automationId: 'N8N-SHD-005', doneAt: 'Apr 16',
  },
  {
    id: 'tools', title: 'Tool access provisioned', category: 'Setup',
    desc: 'Zendesk, Confluence, and Slack workspace access.',
    status: 'done', automationId: 'N8N-TAP-006', doneAt: 'Apr 17',
  },
  {
    id: 'buddy', title: 'Buddy call — 30 min', category: 'Onboarding',
    desc: 'Introductory call with your assigned RemConnect buddy.',
    status: 'in-progress', automationId: 'N8N-BDY-007', doneAt: null,
  },
  {
    id: 'mock', title: 'Mock call assessment', category: 'Assessment',
    desc: 'Pass a 20-minute mock call with QA scoring ≥ 80. Required before live queue.',
    status: 'locked', automationId: 'N8N-MCK-008', doneAt: null,
  },
  {
    id: 'live', title: 'Go live — first shift', category: 'Deployment',
    desc: 'Your first day on the live queue. Team lead will be on standby.',
    status: 'locked', automationId: null, doneAt: null,
  },
]

const STATUS_CFG = {
  done:        { chip: 'good' as const, label: 'Complete', icon: 'check' },
  'in-progress': { chip: 'warn' as const, label: 'In progress', icon: 'clock' },
  locked:      { chip: 'neutral' as const, label: 'Locked', icon: 'lock' },
}

const CAT_COLORS: Record<string, string> = {
  Legal: '#1d6fd6', Setup: '#3f6b4e', Training: '#c08a2a', Onboarding: '#8b6fd6', Assessment: '#b54838', Deployment: '#2f8d5c',
}

export default function PreboardingPage() {
  const [expanded, setExpanded] = useState<string | null>('buddy')
  const doneCount = STEPS.filter(s => s.status === 'done').length
  const pct = Math.round((doneCount / STEPS.length) * 100)

  return (
    <div style={{ padding: '28px 32px 48px', maxWidth: 1100, margin: '0 auto' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #f4f7fc, #fff)', border: '1px solid #e3e0d2', borderRadius: 10, padding: 24, marginBottom: 24, display: 'flex', gap: 24, alignItems: 'center' }}>
        <ScoreRing value={pct} size={80} thickness={7} color="var(--rc-blue)" />
        <div style={{ flex: 1 }}>
          <Chip style={{ marginBottom: 8 }}><Icon name="shield" size={10} /> Required · before first shift</Chip>
          <h1 style={{ fontFamily: 'var(--font-family-serif)', fontSize: 30, fontWeight: 400, letterSpacing: '-0.02em', margin: '6px 0 4px' }}>
            Pre-boarding checklist
          </h1>
          <div style={{ fontSize: 13, color: '#5a6072', maxWidth: 560, lineHeight: 1.5 }}>
            Complete all 9 steps before your first live shift. Steps are unlocked sequentially — your progress is synced automatically via RemConnect automation.
          </div>
          <div style={{ display: 'flex', gap: 16, marginTop: 14, fontSize: 12 }}>
            <div><b>{doneCount}</b> <span style={{ color: '#5a6072' }}>complete</span></div>
            <div><b>{STEPS.filter(s => s.status === 'in-progress').length}</b> <span style={{ color: '#5a6072' }}>in progress</span></div>
            <div><b>{STEPS.filter(s => s.status === 'locked').length}</b> <span style={{ color: '#5a6072' }}>locked</span></div>
          </div>
        </div>
        <div style={{ minWidth: 200 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#5a6072', marginBottom: 6 }}>
            <span>Overall progress</span><span>{pct}%</span>
          </div>
          <ProgressBar value={pct} variant={pct >= 80 ? 'good' : 'amber'} />
          {pct < 100 && (
            <div style={{ fontSize: 11, color: '#5a6072', marginTop: 8 }}>
              Est. completion: 1–2 business days
            </div>
          )}
        </div>
      </div>

      {/* Automation banner */}
      <div style={{ background: 'rgba(63,107,78,0.06)', border: '1px solid rgba(63,107,78,0.2)', borderRadius: 8, padding: '10px 16px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
        <Icon name="spark" size={14} color="#3f6b4e" />
        <span>Steps marked with a badge are <b>automated via N8N workflows</b> — they update automatically when the action is detected (e-signature received, training module scored, etc.).</span>
      </div>

      {/* Steps */}
      <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, overflow: 'hidden' }}>
        {STEPS.map((step, i) => {
          const cfg = STATUS_CFG[step.status as keyof typeof STATUS_CFG]
          const isExpanded = expanded === step.id
          const catColor = CAT_COLORS[step.category] || '#5a6072'
          return (
            <div key={step.id} style={{ borderBottom: i < STEPS.length - 1 ? '1px solid #e3e0d2' : 'none' }}>
              <div
                onClick={() => step.status !== 'locked' && setExpanded(isExpanded ? null : step.id)}
                style={{
                  display: 'grid', gridTemplateColumns: '32px 32px 1fr auto 120px',
                  padding: '14px 20px', alignItems: 'center', gap: 14,
                  cursor: step.status !== 'locked' ? 'pointer' : 'default',
                  background: isExpanded ? 'rgba(29,111,214,0.03)' : 'transparent',
                  opacity: step.status === 'locked' ? 0.5 : 1,
                }}
              >
                <div style={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 600, color: step.status === 'done' ? '#2f8d5c' : '#8b93a7', textAlign: 'center' }}>
                  {step.status === 'done' ? <Icon name="check" size={16} color="#2f8d5c" /> : i + 1}
                </div>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: catColor, margin: 'auto' }} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: step.status === 'locked' ? '#8b93a7' : '#0b1220' }}>{step.title}</div>
                  <div style={{ fontSize: 11, color: '#8b93a7', marginTop: 2 }}>
                    {step.category}
                    {step.doneAt && ` · Completed ${step.doneAt}`}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  {step.automationId && (
                    <Chip variant="good" style={{ fontSize: 9 }}>
                      <Icon name="spark" size={8} /> {step.automationId}
                    </Chip>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8 }}>
                  <Chip variant={cfg.chip} style={{ fontSize: 10 }}>
                    <Icon name={cfg.icon} size={10} /> {cfg.label}
                  </Chip>
                  {step.status !== 'locked' && (
                    <Icon name={isExpanded ? 'chevron-up' : 'chevron-down'} size={14} color="#8b93a7" />
                  )}
                </div>
              </div>

              {isExpanded && (
                <div style={{ padding: '4px 20px 18px', paddingLeft: 98, borderTop: '1px solid #e3e0d2', background: 'rgba(29,111,214,0.02)' }}>
                  <div style={{ fontSize: 13, color: '#5a6072', lineHeight: 1.6, marginBottom: 12 }}>{step.desc}</div>
                  {step.status === 'in-progress' && (
                    <button style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', fontSize: 12, borderRadius: 6, border: 'none', background: '#0b1220', color: '#fff', cursor: 'pointer', fontWeight: 500 }}>
                      <Icon name="arrow-right" size={12} color="#fff" /> Take action
                    </button>
                  )}
                  {step.status === 'done' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#2f8d5c' }}>
                      <Icon name="check" size={12} color="#2f8d5c" />
                      Completed on {step.doneAt} · Verified by RemConnect
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Locked message */}
      <div style={{ marginTop: 20, padding: '16px 20px', background: '#f3f1ea', borderRadius: 10, fontSize: 13, color: '#5a6072', display: 'flex', gap: 10, alignItems: 'center' }}>
        <Icon name="lock" size={16} color="#8b93a7" />
        <span>Steps <b>8–9</b> unlock automatically after the buddy call is marked complete. You&apos;ll receive an email notification.</span>
      </div>
    </div>
  )
}
