'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Icon } from '@/components/ui/Icon'
import { Chip } from '@/components/ui/Chip'
import { ITEMS, DEMO_STATE, VERDICT } from '@/lib/remote-setup-data'
import '@/app/network.css'

const AgentSpeedPanel = dynamic(
  () => import('@/components/network/agent-self/AgentSpeedPanel').then(m => m.AgentSpeedPanel),
  { ssr: false }
)

export default function RemoteSetupGalleryPage() {
  const [state] = useState(DEMO_STATE)

  return (
    <div style={{ padding: '28px 32px 48px', maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--font-family-serif)', fontSize: 28, fontWeight: 400, letterSpacing: '-0.02em', margin: '0 0 4px' }}>
          Gallery &amp; Speed test
        </h1>
        <div style={{ fontSize: 13, color: '#5a6072' }}>
          Photos are visible to Ops during review and to clients in your assigned profile.
        </div>
      </div>

      {/* Speed test panel */}
      <div className="net-scope" style={{ marginBottom: 28 }}>
        <AgentSpeedPanel />
      </div>

      {/* Gallery header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 14 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-family-serif)', fontSize: 22, letterSpacing: '-0.02em' }}>Photos</div>
          <div style={{ fontSize: 12, color: '#5a6072' }}>Good lighting, label visible where possible, wide angle for the desk shot.</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {ITEMS.map(it => {
          const s = state[it.id] || {}
          const v = s.verdict ? VERDICT[s.verdict] : null
          return (
            <div key={it.id} style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', height: 140 }}>
                {s.uploaded
                  ? <div className="rc-placeholder" style={{ height: '100%', borderRadius: 0 }}><span style={{ padding: 8 }}>{it.label} · photo</span></div>
                  : <div style={{ height: '100%', background: '#f3f1ea', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, color: '#5a6072' }}>
                      <div style={{ width: 44, height: 44, borderRadius: 10, background: '#fff', border: '1px dashed #e3e0d2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name="upload" size={18} color="#8b93a7" />
                      </div>
                      <div style={{ fontSize: 11 }}>No photo uploaded</div>
                    </div>
                }
                {v && (
                  <div style={{ position: 'absolute', top: 10, right: 10 }}>
                    <Chip variant={v.chip} style={{ fontSize: 10 }}><Icon name={v.icon} size={10} /> {v.label}</Chip>
                  </div>
                )}
              </div>
              <div style={{ padding: '14px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <Icon name={it.icon} size={14} color="#5a6072" />
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{it.label}</div>
                </div>
                <div style={{ fontSize: 11.5, color: '#5a6072', lineHeight: 1.5, marginBottom: 10 }}>{it.desc}</div>
                {s.verdict === 'needs-fix' && s.note && (
                  <div style={{ fontSize: 11.5, padding: 8, background: 'rgba(181,72,56,0.06)', border: '1px solid rgba(181,72,56,0.2)', borderRadius: 6, color: '#8a362a', marginBottom: 10, lineHeight: 1.45 }}>
                    <b>Reviewer note:</b> {s.note}
                  </div>
                )}
                {s.uploaded && s.reviewer && (
                  <div style={{ fontSize: 10, color: '#5a6072', fontWeight: 600, marginBottom: 10 }}>Reviewed by {s.reviewer} · {s.when}</div>
                )}
                <div style={{ marginTop: 'auto' }}>
                  <button style={{
                    width: '100%', padding: '6px 10px', fontSize: 12, borderRadius: 6,
                    border: (!s.uploaded || s.verdict === 'needs-fix') ? 'none' : '1px solid #e3e0d2',
                    background: (!s.uploaded || s.verdict === 'needs-fix') ? '#0b1220' : 'transparent',
                    color: (!s.uploaded || s.verdict === 'needs-fix') ? '#fff' : '#0b1220',
                    cursor: 'pointer', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center',
                  }}>
                    <Icon name="upload" size={12} color={(!s.uploaded || s.verdict === 'needs-fix') ? '#fff' : '#0b1220'} />
                    {!s.uploaded ? 'Upload photo' : s.verdict !== 'satisfactory' ? 'Retake' : 'View photo'}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
