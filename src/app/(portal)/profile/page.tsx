'use client'

import { useState } from 'react'
import { Icon } from '@/components/ui/Icon'
import { Chip } from '@/components/ui/Chip'
import { ScoreRing } from '@/components/ui/ScoreRing'
import { SkillRadar } from '@/components/ui/SkillRadar'
import { Avatar } from '@/components/ui/Avatar'

const TABS = ['Overview', 'Experience', 'Education', 'Skills', 'Portfolio', 'Certifications']

const EXPERIENCE = [
  { title: 'Customer Support Specialist', company: 'Global BPO Co.', period: 'Jan 2024 – Present', bullets: ['Handled 80+ tickets/day with 4.8 CSAT', 'Trained 3 new agents on Zendesk workflow'] },
  { title: 'Freelance Tech Support',       company: 'Self-employed',  period: 'Mar 2022 – Dec 2023', bullets: ['Remote IT support for 15+ small businesses', 'Configured VPNs and CRM systems'] },
]

const EDUCATION = [
  { school: 'Addis Ababa University', degree: 'BSc Computer Science', gpa: '3.4', year: '2022' },
]

const SKILLS = ['English (Fluent)', 'Spanish (Intermediate)', 'Arabic (Basic)', 'Amharic (Native)', 'Zendesk', 'Salesforce', 'De-escalation', 'Multi-channel support']

const CERTS_REMCONNECT = [
  { title: 'Voice Support Foundation', id: 'RC-VSF-2847', date: 'Apr 2026' },
  { title: 'De-escalation Certified',  id: 'RC-DEC-1204', date: 'Mar 2026' },
]

const CERTS_OTHER = [
  { title: 'TOEFL iBT (110)',   issuer: 'ETS',         date: 'Jan 2023', source: 'resume' },
  { title: 'Google CX Basics',  issuer: 'Google',       date: 'Aug 2022', source: 'resume' },
]

const SKILL_AXES = [
  { k: 'English', v: 82 }, { k: 'Empathy', v: 74 }, { k: 'Product', v: 58 },
  { k: 'Systems', v: 66 }, { k: 'Voice',   v: 70 }, { k: 'Written',  v: 88 },
]

export default function ProfilePage() {
  const [tab, setTab] = useState('Overview')
  const [resumeState, setResumeState] = useState<'idle' | 'parsing' | 'done'>('idle')
  const [parseProgress, setParseProgress] = useState(0)

  const simulateParse = () => {
    setResumeState('parsing')
    setParseProgress(0)
    const tick = () => {
      setParseProgress(p => {
        if (p >= 100) { setResumeState('done'); return 100 }
        setTimeout(tick, 60)
        return p + 4
      })
    }
    tick()
  }

  return (
    <div style={{ padding: '28px 32px 48px', maxWidth: 1280, margin: '0 auto' }}>
      {/* Profile hero */}
      <div style={{ background: 'linear-gradient(135deg, #0b1220 0%, #132245 60%, #0c3a7a 100%)', borderRadius: 16, padding: '28px 32px', color: '#faf9f6', marginBottom: 24, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -40, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,179,245,0.2), transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ display: 'flex', gap: 20, alignItems: 'flex-end' }}>
          <Avatar name="Liya Demeke" size={80} tone={0} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: '#7cb3f5', fontWeight: 600 }}>Agent ID: AD-2847</div>
            <h1 style={{ fontFamily: 'var(--font-family-serif)', fontSize: 34, fontWeight: 400, letterSpacing: '-0.02em', margin: '6px 0 4px', color: '#faf9f6' }}>
              Liya Demeke
            </h1>
            <div style={{ fontSize: 14, color: 'rgba(250,249,246,0.75)' }}>Voice & Written Support · Addis Ababa</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
              {['English (Fluent)', 'De-escalation', 'Zendesk', 'Voice Support'].map(s => (
                <span key={s} style={{ padding: '3px 8px', borderRadius: 999, fontSize: 11, fontWeight: 500, background: 'rgba(124,179,245,0.14)', color: '#7cb3f5', border: '1px solid rgba(124,179,245,0.25)' }}>{s}</span>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <ScoreRing value={74} size={70} thickness={6} color="#7cb3f5" track="rgba(255,255,255,0.1)" label />
            <div>
              <div style={{ fontSize: 10, color: '#8b93a7', fontWeight: 600 }}>Skill composite</div>
              <div style={{ fontSize: 11, color: '#7ae0a8', marginTop: 2 }}>+4 this week</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
            <button style={{ padding: '9px 14px', fontSize: 13, borderRadius: 6, background: '#1d6fd6', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <Icon name="eye" size={13} color="#fff" /> View as client
            </button>
            <button style={{ padding: '9px 14px', fontSize: 13, borderRadius: 6, background: 'transparent', color: '#faf9f6', border: '1px solid #243150', cursor: 'pointer', fontWeight: 500 }}>
              Edit profile
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 24, borderBottom: '1px solid #e3e0d2', paddingBottom: 0 }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '8px 16px', fontSize: 13, borderRadius: '6px 6px 0 0', cursor: 'pointer',
            background: tab === t ? '#fff' : 'transparent', border: `1px solid ${tab === t ? '#e3e0d2' : 'transparent'}`,
            borderBottom: tab === t ? '1px solid #fff' : '1px solid transparent',
            marginBottom: -1, fontWeight: tab === t ? 500 : 400, color: tab === t ? '#0b1220' : '#5a6072',
          }}>
            {t}
          </button>
        ))}
      </div>

      {/* Overview tab */}
      {tab === 'Overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Resume Upload */}
            <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <Icon name="upload" size={16} color="#1d6fd6" />
                <div style={{ fontWeight: 600, fontSize: 14 }}>Resume import</div>
                <Chip style={{ marginLeft: 'auto', fontSize: 10 }}>AI-powered</Chip>
              </div>
              {resumeState === 'idle' && (
                <div
                  onClick={simulateParse}
                  style={{ border: '1.5px dashed #e3e0d2', borderRadius: 10, padding: '20px', background: '#f3f1ea', display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer', transition: 'all 0.18s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#1d6fd6'; (e.currentTarget as HTMLDivElement).style.background = 'rgba(29,111,214,0.04)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#e3e0d2'; (e.currentTarget as HTMLDivElement).style.background = '#f3f1ea' }}
                >
                  <div style={{ width: 48, height: 48, borderRadius: 10, background: 'linear-gradient(135deg, #1d6fd6, #7cb3f5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="upload" size={22} color="#fff" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>Upload your resume (PDF or DOCX)</div>
                    <div style={{ fontSize: 12, color: '#5a6072', marginTop: 3 }}>AI will auto-fill education, experience, skills, and certifications.</div>
                  </div>
                  <button style={{ padding: '9px 14px', fontSize: 13, borderRadius: 6, background: '#0b1220', color: '#faf9f6', border: 'none', cursor: 'pointer', fontWeight: 500 }}>Choose file</button>
                </div>
              )}
              {resumeState === 'parsing' && (
                <div style={{ border: '1px solid #e3e0d2', borderRadius: 10, padding: 18, background: '#fff' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(29,111,214,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon name="bolt" size={16} color="#1d6fd6" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>Parsing resume…</div>
                      <div style={{ fontSize: 11, color: '#5a6072', marginTop: 2 }}>Extracting education · experience · skills · certifications</div>
                    </div>
                    <div style={{ fontFamily: 'monospace', fontSize: 12, color: '#1d6fd6' }}>{parseProgress}%</div>
                  </div>
                  <div style={{ height: 4, borderRadius: 999, background: '#f3f1ea', overflow: 'hidden' }}>
                    <div style={{ width: `${parseProgress}%`, height: '100%', background: 'linear-gradient(90deg, #1d6fd6, #7cb3f5)', transition: 'width 0.18s ease' }} />
                  </div>
                </div>
              )}
              {resumeState === 'done' && (
                <div style={{ background: '#f3f1ea', borderRadius: 10, padding: 16, border: '1px solid #e3e0d2' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#2f8d5c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon name="check" size={14} color="#fff" />
                    </div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>Resume parsed</div>
                    <Chip variant="good" style={{ marginLeft: 'auto', fontSize: 10 }}>6 fields extracted</Chip>
                  </div>
                  {[
                    { field: 'School', value: 'Addis Ababa University', confidence: 97 },
                    { field: 'Degree', value: 'BSc Computer Science', confidence: 94 },
                    { field: 'GPA (optional)', value: '3.4', confidence: 91 },
                    { field: 'Skills', value: 'Zendesk, Salesforce, English, Spanish, Arabic, Amharic', confidence: 88 },
                    { field: 'Experience', value: '2 roles extracted', confidence: 92 },
                    { field: 'Certifications', value: 'TOEFL, Google CX', confidence: 85 },
                  ].map(f => (
                    <div key={f.field} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', borderBottom: '1px solid #e3e0d2', fontSize: 13 }}>
                      <div style={{ width: 120, color: '#5a6072', fontSize: 11, fontWeight: 600 }}>{f.field}</div>
                      <div style={{ flex: 1 }}>{f.value}</div>
                      <Chip variant={f.confidence >= 90 ? 'good' : f.confidence >= 70 ? 'warn' : 'bad'} style={{ fontSize: 10 }}>{f.confidence}%</Chip>
                    </div>
                  ))}
                  <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                    <button onClick={() => setResumeState('idle')} style={{ padding: '7px 12px', fontSize: 12, borderRadius: 6, border: '1px solid #e3e0d2', background: 'transparent', cursor: 'pointer', fontWeight: 500 }}>Replace file</button>
                    <button style={{ flex: 1, padding: '7px 12px', fontSize: 12, borderRadius: 6, background: '#0b1220', color: '#faf9f6', border: 'none', cursor: 'pointer', fontWeight: 500 }}>Approve &amp; apply to profile</button>
                  </div>
                </div>
              )}
            </div>

            {/* Experience */}
            <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, padding: 20 }}>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 14 }}>Experience</div>
              {EXPERIENCE.map((e, i) => (
                <div key={i} style={{ paddingBottom: 16, marginBottom: 16, borderBottom: i < EXPERIENCE.length - 1 ? '1px solid #e3e0d2' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: '#f3f1ea', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon name="briefcase" size={16} color="#5a6072" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 500, fontSize: 14 }}>{e.title}</div>
                      <div style={{ fontSize: 12, color: '#5a6072', fontWeight: 600 }}>{e.company} · {e.period}</div>
                      <ul style={{ margin: '8px 0 0 0', paddingLeft: 16, fontSize: 13, color: '#2a2f3c', lineHeight: 1.6 }}>
                        {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, padding: 18 }}>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 10 }}>Skill radar</div>
              <SkillRadar size={200} color="var(--rc-blue)" axes={SKILL_AXES} />
            </div>

            <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, padding: 18 }}>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 10 }}>Languages</div>
              {['English', 'Spanish', 'Arabic', 'Amharic'].map((l, i) => (
                <div key={l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '5px 0', borderBottom: i < 3 ? '1px solid #e3e0d2' : 'none' }}>
                  <span>{l}</span>
                  <Chip style={{ fontSize: 10 }}>
                    {i === 0 ? 'Fluent' : i === 3 ? 'Native' : i === 1 ? 'Intermediate' : 'Basic'}
                  </Chip>
                </div>
              ))}
            </div>

            <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, padding: 18 }}>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 10 }}>Certifications</div>
              <div style={{ fontSize: 11, color: '#5a6072', fontWeight: 600, marginBottom: 8 }}>RemConnect</div>
              {CERTS_REMCONNECT.map(c => (
                <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0' }}>
                  <Icon name="award" size={14} color="#1d6fd6" />
                  <div style={{ flex: 1, fontSize: 12 }}>{c.title}</div>
                  <Chip variant="good" style={{ fontSize: 10 }}>✓</Chip>
                </div>
              ))}
              <div style={{ fontSize: 11, color: '#5a6072', fontWeight: 600, marginTop: 10, marginBottom: 8 }}>Other</div>
              {CERTS_OTHER.map(c => (
                <div key={c.title} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0' }}>
                  <Icon name="award" size={14} color="#5a6072" />
                  <div style={{ flex: 1, fontSize: 12 }}>{c.title}</div>
                  <Chip variant="neutral" style={{ fontSize: 10 }}>From resume</Chip>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab !== 'Overview' && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#5a6072', fontSize: 14 }}>
          <Icon name="user" size={40} color="#e3e0d2" />
          <div style={{ marginTop: 12 }}>{tab} content coming soon</div>
        </div>
      )}
    </div>
  )
}
