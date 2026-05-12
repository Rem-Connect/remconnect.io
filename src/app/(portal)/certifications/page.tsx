'use client'

import { useState } from 'react'
import { Icon } from '@/components/ui/Icon'
import { Chip } from '@/components/ui/Chip'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { ScoreRing } from '@/components/ui/ScoreRing'

const RC_CERTS = [
  {
    id: 'vsf', title: 'Verified Support Fundamentals', credentialId: 'RC-VSF-2847',
    issued: 'Apr 14, 2026', expires: 'Apr 14, 2028', status: 'active',
    desc: 'Core RemConnect agent certification covering ticket handling, escalation paths, and tone guidelines.',
    skills: ['Active listening', 'Ticket routing', 'Escalation protocol'],
    score: 94,
  },
  {
    id: 'cxe', title: 'CX Excellence · Level 1', credentialId: 'RC-CXE1-1193',
    issued: 'Mar 2, 2026', expires: 'Mar 2, 2028', status: 'active',
    desc: 'Customer experience fundamentals — CSAT drivers, empathy frameworks, and first-call resolution tactics.',
    skills: ['CSAT optimization', 'Empathy mapping', 'FCR tactics'],
    score: 89,
  },
  {
    id: 'wfm', title: 'Workforce Management Basics', credentialId: null,
    issued: null, expires: null, status: 'in-progress',
    desc: 'Scheduling, adherence metrics, and shift management for remote agents.',
    skills: ['Schedule adherence', 'Adherence metrics'],
    progress: 62,
    score: null,
  },
  {
    id: 'qae', title: 'QA Evaluator Certification', credentialId: null,
    issued: null, expires: null, status: 'locked',
    desc: 'For agents promoted to QA reviewer role. Requires CX Excellence Level 2.',
    skills: ['Call scoring', 'Calibration sessions'],
    progress: 0,
    score: null,
    requires: 'CX Excellence Level 2',
  },
  {
    id: 'cxe2', title: 'CX Excellence · Level 2', credentialId: null,
    issued: null, expires: null, status: 'locked',
    desc: 'Advanced CX track: complaint resolution, retention, and senior-tier escalation.',
    skills: ['Retention tactics', 'Senior escalation'],
    progress: 0,
    score: null,
    requires: 'CX Excellence Level 1',
  },
  {
    id: 'ml', title: 'Multi-lingual Support Badge', credentialId: 'RC-ML-0488',
    issued: 'Jan 20, 2026', expires: null, status: 'active',
    desc: 'Awarded to agents supporting clients in two or more languages.',
    skills: ['Amharic', 'English'],
    score: null,
  },
]

const OTHER_CERTS = [
  { name: 'TOEFL iBT', issuer: 'ETS', score: '110 / 120', date: 'Jun 2024', credId: '0000-2847-XB', source: 'resume', status: 'verified' },
  { name: 'Google CX Professional', issuer: 'Google', score: null, date: 'Feb 2025', credId: 'GGL-CX-88421', source: 'resume', status: 'verified' },
  { name: 'HubSpot CRM Certified', issuer: 'HubSpot', score: null, date: 'Sep 2025', credId: 'HS-CRM-22110', source: 'resume', status: 'pending' },
  { name: 'Zendesk Admin Essentials', issuer: 'Zendesk', score: null, date: 'Nov 2025', credId: null, source: 'manual', status: 'pending' },
]

const STATUS_CFG = {
  active:       { chip: 'good' as const, label: 'Active' },
  'in-progress':{ chip: 'warn' as const, label: 'In progress' },
  locked:       { chip: 'neutral' as const, label: 'Locked' },
}

export default function CertificationsPage() {
  const [addOpen, setAddOpen] = useState(false)
  const activeCerts = RC_CERTS.filter(c => c.status === 'active').length

  return (
    <div style={{ padding: '28px 32px 48px', maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-family-serif)', fontSize: 34, fontWeight: 400, letterSpacing: '-0.02em', margin: 0 }}>Certifications</h1>
          <div style={{ color: '#5a6072', fontSize: 14, marginTop: 4 }}>{activeCerts} active credentials · verified by RemConnect</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 14px', borderRadius: 6, border: '1px solid #e3e0d2', background: 'transparent', fontSize: 13, cursor: 'pointer', fontWeight: 500 }}>
            <Icon name="download" size={13} /> Export all
          </button>
        </div>
      </div>

      {/* RemConnect Certifications */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{ fontFamily: 'var(--font-family-serif)', fontSize: 22, letterSpacing: '-0.02em' }}>RemConnect Certifications</div>
          <Chip variant="good" style={{ fontSize: 10 }}>{activeCerts} earned</Chip>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {RC_CERTS.map(c => {
            const cfg = STATUS_CFG[c.status as keyof typeof STATUS_CFG]
            return (
              <div key={c.id} style={{
                background: c.status === 'locked' ? '#f3f1ea' : '#fff',
                border: '1px solid #e3e0d2',
                borderRadius: 12,
                padding: '18px 20px',
                opacity: c.status === 'locked' ? 0.7 : 1,
                display: 'flex', flexDirection: 'column',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: c.status === 'active' ? 'linear-gradient(135deg, #1d6fd6, #3f6b4e)' : '#e3e0d2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={c.status === 'locked' ? 'lock' : 'check'} size={18} color={c.status === 'active' ? '#fff' : '#8b93a7'} />
                  </div>
                  <Chip variant={cfg.chip} style={{ fontSize: 10 }}>{cfg.label}</Chip>
                </div>
                <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{c.title}</div>
                <div style={{ fontSize: 12, color: '#5a6072', lineHeight: 1.5, marginBottom: 10 }}>{c.desc}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
                  {c.skills.map(s => <Chip key={s} style={{ fontSize: 10 }}>{s}</Chip>)}
                </div>
                {c.status === 'in-progress' && c.progress !== undefined && (
                  <div style={{ marginBottom: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#5a6072', marginBottom: 4 }}>
                      <span>Progress</span><span>{c.progress}%</span>
                    </div>
                    <ProgressBar value={c.progress} variant="amber" />
                  </div>
                )}
                {c.status === 'locked' && c.requires && (
                  <div style={{ fontSize: 11, color: '#8b93a7', marginBottom: 10 }}>
                    <Icon name="lock" size={10} color="#8b93a7" /> Requires: {c.requires}
                  </div>
                )}
                <div style={{ marginTop: 'auto', paddingTop: 10, borderTop: '1px solid #e3e0d2' }}>
                  {c.status === 'active' && c.credentialId ? (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: 10, color: '#5a6072', fontWeight: 600 }}>Credential ID</div>
                        <div style={{ fontSize: 12, fontFamily: 'monospace', fontWeight: 600 }}>{c.credentialId}</div>
                        {c.issued && <div style={{ fontSize: 10, color: '#5a6072', marginTop: 2 }}>Issued {c.issued}{c.expires ? ` · Exp ${c.expires}` : ''}</div>}
                      </div>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button style={{ padding: '5px 8px', fontSize: 11, borderRadius: 6, border: '1px solid #e3e0d2', background: 'transparent', cursor: 'pointer' }}>
                          <Icon name="download" size={11} /> PDF
                        </button>
                        <button style={{ padding: '5px 8px', fontSize: 11, borderRadius: 6, border: '1px solid #e3e0d2', background: 'transparent', cursor: 'pointer' }}>
                          <Icon name="share" size={11} /> Share
                        </button>
                      </div>
                    </div>
                  ) : c.status === 'in-progress' ? (
                    <button style={{ width: '100%', padding: '7px 12px', fontSize: 12, borderRadius: 6, border: 'none', background: '#0b1220', color: '#fff', cursor: 'pointer', fontWeight: 500 }}>
                      Continue training
                    </button>
                  ) : (
                    <div style={{ fontSize: 11, color: '#8b93a7', textAlign: 'center' }}>Complete prerequisites to unlock</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Other Certifications */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ fontFamily: 'var(--font-family-serif)', fontSize: 22, letterSpacing: '-0.02em' }}>Other Certifications</div>
            <Chip style={{ fontSize: 10 }}>Resume-parsed + manual</Chip>
          </div>
          <button onClick={() => setAddOpen(o => !o)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 12px', borderRadius: 6, border: 'none', background: '#0b1220', color: '#fff', fontSize: 12, cursor: 'pointer', fontWeight: 500 }}>
            <Icon name="plus" size={12} color="#fff" /> Add certification
          </button>
        </div>

        {addOpen && (
          <div style={{ background: '#fff', border: '1px solid #1d6fd6', borderRadius: 10, padding: 20, marginBottom: 16 }}>
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 14 }}>Add certification</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 12 }}>
              {[['Certification name', 'e.g. AWS Solutions Architect'], ['Issuing organization', 'e.g. Amazon Web Services'], ['Date earned', 'MM / YYYY']].map(([label, ph]) => (
                <div key={label}>
                  <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 4, color: '#5a6072' }}>{label}</div>
                  <input placeholder={ph} style={{ width: '100%', padding: '8px 10px', fontSize: 13, borderRadius: 6, border: '1px solid #e3e0d2', outline: 'none', background: '#faf9f6', boxSizing: 'border-box' }} />
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 14 }}>
              {[['Credential ID (optional)', 'e.g. CERT-12345'], ['Proof / document URL', 'https://...']].map(([label, ph]) => (
                <div key={label}>
                  <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 4, color: '#5a6072' }}>{label}</div>
                  <input placeholder={ph} style={{ width: '100%', padding: '8px 10px', fontSize: 13, borderRadius: 6, border: '1px solid #e3e0d2', outline: 'none', background: '#faf9f6', boxSizing: 'border-box' }} />
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ padding: '7px 14px', fontSize: 13, borderRadius: 6, border: 'none', background: '#0b1220', color: '#fff', cursor: 'pointer', fontWeight: 500 }}>Save certification</button>
              <button onClick={() => setAddOpen(false)} style={{ padding: '7px 14px', fontSize: 13, borderRadius: 6, border: '1px solid #e3e0d2', background: 'transparent', cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        )}

        <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 100px 140px 120px 90px', padding: '10px 20px', background: '#f3f1ea', borderBottom: '1px solid #e3e0d2', fontSize: 10, color: '#5a6072', fontWeight: 600 }}>
            <div>Certification</div><div>Issuer</div><div>Date</div><div>Credential ID</div><div>Source</div><div>Status</div>
          </div>
          {OTHER_CERTS.map((c, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 100px 140px 120px 90px', padding: '14px 20px', borderBottom: i < OTHER_CERTS.length - 1 ? '1px solid #e3e0d2' : 'none', alignItems: 'center', fontSize: 13 }}>
              <div>
                <div style={{ fontWeight: 500 }}>{c.name}</div>
                {c.score && <div style={{ fontSize: 11, color: '#5a6072' }}>Score: {c.score}</div>}
              </div>
              <div style={{ fontSize: 12, color: '#5a6072' }}>{c.issuer}</div>
              <div style={{ fontSize: 12, fontFamily: 'monospace', color: '#5a6072' }}>{c.date}</div>
              <div style={{ fontSize: 11, fontFamily: 'monospace', color: c.credId ? '#0b1220' : '#8b93a7' }}>{c.credId || '—'}</div>
              <Chip variant={c.source === 'resume' ? 'default' : 'neutral'} style={{ fontSize: 10 }}>
                <Icon name={c.source === 'resume' ? 'document' : 'plus'} size={9} /> {c.source === 'resume' ? 'From resume' : 'Manual'}
              </Chip>
              <Chip variant={c.status === 'verified' ? 'good' : 'warn'} style={{ fontSize: 10 }}>
                {c.status === 'verified' ? 'Verified' : 'Pending'}
              </Chip>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
