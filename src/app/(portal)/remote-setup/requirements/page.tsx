'use client'

import { useState } from 'react'
import { Icon } from '@/components/ui/Icon'
import { Chip } from '@/components/ui/Chip'
import { ITEMS, DEMO_STATE, VERDICT } from '@/lib/remote-setup-data'

export default function RemoteSetupRequirementsPage() {
  const [state] = useState(DEMO_STATE)

  return (
    <div style={{ padding: '28px 32px 48px', maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontFamily: 'var(--font-family-serif)', fontSize: 28, fontWeight: 400, letterSpacing: '-0.02em', margin: '0 0 4px' }}>
          Requirements
        </h1>
        <div style={{ fontSize: 13, color: '#5a6072' }}>
          Upload a photo for each item below. Ops will review and mark each as Satisfactory or request a retake.
        </div>
      </div>

      <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '40px 1.6fr 1fr 160px 140px', padding: '10px 16px', background: '#f3f1ea', borderBottom: '1px solid #e3e0d2', fontSize: 10, color: '#5a6072', fontWeight: 600 }}>
          <div>#</div><div>Remote setup item</div><div>Image upload</div><div>Satisfactory</div><div />
        </div>
        {ITEMS.map((it, i) => {
          const s = state[it.id] || {}
          const v = s.verdict ? VERDICT[s.verdict] : null
          return (
            <div
              key={it.id}
              style={{ display: 'grid', gridTemplateColumns: '40px 1.6fr 1fr 160px 140px', padding: '12px 16px', alignItems: 'center', borderBottom: i < ITEMS.length - 1 ? '1px solid #e3e0d2' : 'none', fontSize: 13 }}
            >
              <div style={{ color: '#5a6072', fontFamily: 'monospace' }}>{i + 1}</div>
              <div>
                <div style={{ fontWeight: 500 }}>{it.label}</div>
                <div style={{ fontSize: 11, color: '#5a6072', marginTop: 2 }}>{it.desc}</div>
              </div>
              <div style={{ fontSize: 12, color: s.uploaded ? '#0b1220' : '#5a6072' }}>
                {s.uploaded
                  ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon name="check" size={11} color="#2f8d5c" /> Uploaded {s.when}</span>
                  : <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon name="upload" size={11} color="#8b93a7" /> Not uploaded</span>}
              </div>
              <div>
                {v
                  ? <Chip variant={v.chip} style={{ fontSize: 10 }}><Icon name={v.icon} size={10} /> {v.label}</Chip>
                  : <span style={{ fontSize: 11, color: '#5a6072' }}>—</span>}
              </div>
              <div style={{ textAlign: 'right' }}>
                <button style={{
                  padding: '5px 10px', fontSize: 11, borderRadius: 6,
                  border: (!s.uploaded || s.verdict === 'needs-fix') ? 'none' : '1px solid #e3e0d2',
                  background: (!s.uploaded || s.verdict === 'needs-fix') ? '#0b1220' : 'transparent',
                  color: (!s.uploaded || s.verdict === 'needs-fix') ? '#fff' : '#0b1220',
                  cursor: 'pointer', fontWeight: 500,
                }}>
                  {!s.uploaded ? 'Upload' : s.verdict === 'needs-fix' ? 'Retake' : s.verdict === 'pending' ? 'Replace' : 'View'}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
