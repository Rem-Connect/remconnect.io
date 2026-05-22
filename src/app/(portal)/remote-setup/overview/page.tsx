'use client'

import { useState } from 'react'
import { Icon } from '@/components/ui/Icon'
import { Chip } from '@/components/ui/Chip'
import { ScoreRing } from '@/components/ui/ScoreRing'
import { ITEMS, DEMO_STATE } from '@/lib/remote-setup-data'

export default function RemoteSetupOverviewPage() {
  const [state] = useState(DEMO_STATE)
  const approved = ITEMS.filter(it => state[it.id]?.verdict === 'satisfactory').length
  const uploaded = ITEMS.filter(it => state[it.id]?.uploaded).length
  const pct = Math.round(approved / ITEMS.length * 100)

  return (
    <div style={{ padding: '28px 32px 48px', maxWidth: 1280, margin: '0 auto' }}>
      <div style={{
        background: approved === ITEMS.length
          ? 'linear-gradient(135deg, #ecf5ee, #fff)'
          : 'linear-gradient(135deg, #f4f7fc, #fff)',
        border: '1px solid #e3e0d2',
        borderRadius: 10,
        padding: 24,
        marginBottom: 20,
        display: 'flex',
        gap: 24,
        alignItems: 'center',
      }}>
        <ScoreRing value={pct} size={80} thickness={7} color="var(--rc-blue)" />
        <div style={{ flex: 1 }}>
          <Chip style={{ marginBottom: 8 }}>
            <Icon name="shield" size={10} /> Required · blocks deployment
          </Chip>
          <h1 style={{ fontFamily: 'var(--font-family-serif)', fontSize: 30, fontWeight: 400, letterSpacing: '-0.02em', margin: '6px 0 4px' }}>
            Remote setup verification
          </h1>
          <div style={{ fontSize: 13, color: '#5a6072', maxWidth: 620, lineHeight: 1.5 }}>
            Upload a clear photo of each station item. Ops reviews within 24h and marks <b>Satisfactory</b> or requests a retake.
            All 8 must be approved before you can accept client invitations.
          </div>
          <div style={{ display: 'flex', gap: 14, marginTop: 14, fontSize: 12 }}>
            <div><b>{approved}</b> <span style={{ color: '#5a6072' }}>approved</span></div>
            <div><b>{uploaded - approved}</b> <span style={{ color: '#5a6072' }}>in review / retake</span></div>
            <div><b>{ITEMS.length - uploaded}</b> <span style={{ color: '#5a6072' }}>not started</span></div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 14px', borderRadius: 6, background: '#0b1220', color: '#faf9f6', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500 }}>
            <Icon name="upload" size={13} color="#fff" /> Upload all photos
          </button>
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 14px', borderRadius: 6, border: '1px solid #e3e0d2', background: 'transparent', cursor: 'pointer', fontSize: 13, fontWeight: 500 }}>
            <Icon name="help" size={13} /> Setup guide (PDF)
          </button>
        </div>
      </div>

      {/* Summary grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {[
          { label: 'Approved', value: approved, color: '#2f8d5c', bg: 'rgba(47,141,92,0.08)' },
          { label: 'In review / retake', value: uploaded - approved, color: '#c08a2a', bg: 'rgba(192,138,42,0.08)' },
          { label: 'Not started', value: ITEMS.length - uploaded, color: '#5a6072', bg: '#f9f8f5' },
        ].map(({ label, value, color, bg }) => (
          <div key={label} style={{ background: bg, border: '1px solid #e3e0d2', borderRadius: 10, padding: '18px 20px' }}>
            <div style={{ fontSize: 11, color: '#5a6072', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>{label}</div>
            <div style={{ fontFamily: 'monospace', fontSize: 32, fontWeight: 700, color }}>{value}</div>
            <div style={{ fontSize: 11, color: '#8b93a7', marginTop: 2 }}>of {ITEMS.length} items</div>
          </div>
        ))}
      </div>
    </div>
  )
}
