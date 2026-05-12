import { Icon } from '@/components/ui/Icon'
import { Chip } from '@/components/ui/Chip'
import { ProgressBar } from '@/components/ui/ProgressBar'
import type { AgentStatus } from '@/types'

interface QueueItem {
  icon: string
  title: string
  meta: string
  cta: string
  progress: number
  accent?: boolean
}

const RECRUIT_ITEMS: QueueItem[] = [
  { icon: 'grad-cap',  title: 'Module 6: Handling angry callers',       meta: '14 min · AI role-play included',    cta: 'Resume', progress: 45 },
  { icon: 'clipboard', title: 'Upload KYC documents',                   meta: '2 of 3 uploaded',                    cta: 'Upload', progress: 66 },
  { icon: 'robot',     title: 'Voice assessment — final attempt',        meta: 'Unlocks profile',                    cta: 'Start',  progress: 0, accent: true },
  { icon: 'video',     title: 'Record 2-minute intro video',            meta: 'Shown to clients with your profile', cta: 'Record', progress: 0 },
]

const DEPLOYED_ITEMS: QueueItem[] = [
  { icon: 'headset',   title: 'Shift warm-up — 5 practice tickets',     meta: 'Primes tone & product knowledge',    cta: 'Start',   progress: 0, accent: true },
  { icon: 'book',      title: 'Northwind: Q2 policy update',            meta: 'New refund rules',                   cta: 'Read',    progress: 0 },
  { icon: 'grad-cap',  title: 'Coaching suggestion: de-escalation',     meta: "From last week's QA",                cta: 'Practice',progress: 0 },
  { icon: 'clipboard', title: 'Weekly timesheet',                       meta: 'Due Friday 6:00 PM',                 cta: 'Review',  progress: 0 },
]

interface TodayQueueProps { status: AgentStatus }

export function TodayQueue({ status }: TodayQueueProps) {
  const items = status === 'deployed' ? DEPLOYED_ITEMS : RECRUIT_ITEMS
  return (
    <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, overflow: 'hidden', boxShadow: '0 1px 2px rgba(11,18,32,0.06)' }}>
      <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e3e0d2' }}>
        <div>
          <div style={{ fontSize: 11, color: '#5a6072', fontWeight: 600 }}>Your queue</div>
          <div style={{ fontFamily: 'var(--font-family-serif)', fontSize: 22, letterSpacing: '-0.02em', marginTop: 2 }}>Today</div>
        </div>
        <Chip style={{ fontSize: 11 }}>{items.length} items</Chip>
      </div>
      {items.map((it, i) => (
        <div key={i} style={{
          padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 14,
          borderBottom: i < items.length - 1 ? '1px solid #e3e0d2' : 'none',
          background: it.accent ? 'rgba(29,111,214,0.04)' : '#fff',
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: it.accent ? 'rgba(29,111,214,0.12)' : '#f3f1ea',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Icon name={it.icon} size={18} color={it.accent ? '#1d6fd6' : '#5a6072'} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 500 }}>{it.title}</div>
            <div style={{ fontSize: 12, color: '#5a6072', marginTop: 2 }}>{it.meta}</div>
            {it.progress > 0 && (
              <div style={{ marginTop: 8, maxWidth: 200 }}>
                <ProgressBar value={it.progress} variant="amber" />
              </div>
            )}
          </div>
          <button style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '6px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer',
            fontWeight: 500, border: it.accent ? 'none' : '1px solid #e3e0d2',
            background: it.accent ? '#1d6fd6' : 'transparent',
            color: it.accent ? '#fff' : '#0b1220',
          }}>
            {it.cta} <Icon name="arrow-right" size={11} color={it.accent ? '#fff' : '#0b1220'} />
          </button>
        </div>
      ))}
    </div>
  )
}
