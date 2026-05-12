'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Icon } from '@/components/ui/Icon'
import { Chip } from '@/components/ui/Chip'
import { ScoreRing } from '@/components/ui/ScoreRing'
import { usePortal } from '@/context/PortalContext'

const INVITES = [
  {
    client: 'Northwind Retail', role: 'Voice Support Agent', channel: 'Voice',
    schedule: 'Start Mon Apr 27 · 40 hrs/wk', pay: '$5.80/hr + bonuses',
    expires: '2d 14h', status: 'new', fit: 94,
    why: [
      "Your English tone score (82) exceeds Northwind's threshold (75)",
      'You completed de-escalation in April with 88 QA',
      'Shift aligns with your availability (EAT 4pm–1am)',
    ],
    brief: 'Retail customer support for a US e-commerce brand. US hours (EST overnight).',
  },
  {
    client: 'Apex Insurance', role: 'Written Support (Chat + Email)', channel: 'Written',
    schedule: 'Start Wed Apr 29 · 30 hrs/wk', pay: '$4.90/hr',
    expires: '4d', status: 'new', fit: 87,
    why: [
      'Written chat (88) is your top axis',
      'Passed insurance compliance quiz',
      'Cohort-mate Betel is already on this team',
    ],
    brief: 'Handle policyholder inquiries via chat and email. No voice.',
  },
  {
    client: 'Lumen Telecom', role: 'Tier-1 Voice + Written hybrid', channel: 'Hybrid',
    schedule: 'Start May 4 · 40 hrs/wk', pay: '$6.20/hr', status: 'pending', fit: 79, expires: '6d',
    why: [
      'Hybrid role — you qualify on both tracks',
      "Coached on Lumen's product line last week",
    ],
    brief: 'Mixed phone + chat for Lumen Telecom subscribers. Overnight EAT.',
  },
]

export default function OpportunitiesPage() {
  const { setAcceptedClient, acceptedClient } = usePortal()
  const router = useRouter()

  const accept = (client: string) => {
    setAcceptedClient(client)
    setTimeout(() => router.push('/preboarding'), 400)
  }

  return (
    <div style={{ padding: '28px 32px 48px', maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 4 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-family-serif)', fontSize: 34, fontWeight: 400, letterSpacing: '-0.02em', margin: 0 }}>
            Opportunities
          </h1>
          <div style={{ color: '#5a6072', fontSize: 14, marginTop: 4, marginBottom: 4 }}>
            Ops invites you to roles matched to your skills. Accept or decline — no cold applications.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Chip><Icon name="lock" size={11} /> Invite-only</Chip>
          <button style={{ padding: '9px 14px', fontSize: 13, borderRadius: 6, border: '1px solid #e3e0d2', background: 'transparent', cursor: 'pointer', fontWeight: 500 }}>
            Availability settings
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 24 }}>
        {INVITES.map((inv, i) => (
          <div key={i} style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, padding: 22, position: 'relative', overflow: 'hidden', boxShadow: '0 1px 2px rgba(11,18,32,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: 10, background: '#f3f1ea', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e3e0d2', flexShrink: 0 }}>
                <Icon name="briefcase" size={20} color="#5a6072" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-family-serif)', fontSize: 22, letterSpacing: '-0.02em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{inv.client}</div>
                <div style={{ fontSize: 13, color: '#5a6072' }}>{inv.role} · {inv.channel}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                {inv.status === 'new' && (
                  <div style={{ background: '#1d6fd6', color: '#fff', padding: '3px 10px', borderRadius: 999, fontSize: 10, fontWeight: 600, letterSpacing: '0.04em' }}>NEW</div>
                )}
                <ScoreRing value={inv.fit} size={50} thickness={5} color="var(--rc-blue)" />
              </div>
            </div>

            <div style={{ fontSize: 13, color: '#2a2f3c', marginBottom: 14, padding: 12, background: '#f3f1ea', borderRadius: 8 }}>
              {inv.brief}
            </div>

            <div style={{ fontSize: 11, color: '#5a6072', fontWeight: 600, marginBottom: 8 }}>Why this fits you</div>
            {inv.why.map((w, j) => (
              <div key={j} style={{ display: 'flex', gap: 8, fontSize: 12.5, marginBottom: 6, alignItems: 'flex-start' }}>
                <Icon name="check" size={12} color="#2f8d5c" />
                <span style={{ lineHeight: 1.5 }}>{w}</span>
              </div>
            ))}

            <div style={{ display: 'flex', gap: 20, marginTop: 16, paddingTop: 14, borderTop: '1px solid #e3e0d2', fontSize: 12 }}>
              <div>
                <div style={{ color: '#5a6072', fontSize: 10 }}>Schedule</div>
                <div style={{ fontWeight: 500, marginTop: 2 }}>{inv.schedule}</div>
              </div>
              <div>
                <div style={{ color: '#5a6072', fontSize: 10 }}>Rate</div>
                <div style={{ fontWeight: 500, marginTop: 2, fontFamily: 'monospace' }}>{inv.pay}</div>
              </div>
              <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                <div style={{ color: '#5a6072', fontSize: 10 }}>Respond in</div>
                <div style={{ fontWeight: 500, marginTop: 2, fontFamily: 'monospace', color: '#b54838' }}>{inv.expires}</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              {acceptedClient === inv.client ? (
                <button disabled style={{ flex: 1, justifyContent: 'center', padding: '9px 14px', borderRadius: 6, background: '#2f8d5c', color: '#fff', border: 'none', cursor: 'default', fontSize: 13, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Icon name="check" size={13} color="#fff" /> Accepted — preboarding unlocked
                </button>
              ) : (
                <button onClick={() => accept(inv.client)} style={{ flex: 1, justifyContent: 'center', padding: '9px 14px', borderRadius: 6, background: '#0b1220', color: '#faf9f6', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}>
                  Accept invitation <Icon name="arrow-right" size={12} color="#fff" />
                </button>
              )}
              <button style={{ padding: '9px 14px', fontSize: 13, borderRadius: 6, border: '1px solid #e3e0d2', background: 'transparent', cursor: 'pointer', fontWeight: 500 }}>Decline</button>
              <button style={{ padding: '9px 14px', fontSize: 13, borderRadius: 6, border: '1px solid #e3e0d2', background: 'transparent', cursor: 'pointer', fontWeight: 500 }}>More info</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
