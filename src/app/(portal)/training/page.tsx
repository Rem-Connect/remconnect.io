'use client'

import { useState } from 'react'
import { Icon } from '@/components/ui/Icon'
import { Chip } from '@/components/ui/Chip'
import { ProgressBar } from '@/components/ui/ProgressBar'

const CATEGORIES = [
  { id: 'voice',      label: 'Voice Support',          icon: 'headset',     desc: 'Real-time phone handling, tone control, de-escalation.',              accent: '#1d6fd6' },
  { id: 'chat',       label: 'Live Chat & Email',       icon: 'chat',        desc: 'Written tone, multi-chat discipline, macros.',                        accent: '#3f6b4e' },
  { id: 'crm',        label: 'CRM & Tooling',           icon: 'spreadsheet', desc: 'Zendesk, Salesforce, internal tools.',                               accent: '#4a6b8a' },
  { id: 'angry',      label: 'Angry-Caller Simulator',  icon: 'robot',       desc: 'AI role-play with escalating emotional scenarios.',                   accent: '#b54838' },
  { id: 'accent',     label: 'Accent & Pronunciation',  icon: 'mic',         desc: 'Real-time pronunciation scoring, minimal pairs.',                    accent: '#0c3a7a' },
  { id: 'compliance', label: 'Compliance & Security',   icon: 'shield',      desc: 'PCI, HIPAA, data handling for BPO.',                                 accent: '#5a6072' },
]

const COURSES = [
  { cat: 'voice',      title: 'De-escalation fundamentals',                   mins: 22, lessons: 6, progress: 100, level: 'Foundation' },
  { cat: 'voice',      title: 'Mastering hold & transfer',                    mins: 14, lessons: 4, progress: 100, level: 'Foundation' },
  { cat: 'voice',      title: 'Handling angry callers',                       mins: 28, lessons: 7, progress: 45,  level: 'Intermediate' },
  { cat: 'chat',       title: 'Written tone that sells',                      mins: 18, lessons: 5, progress: 80,  level: 'Foundation' },
  { cat: 'chat',       title: 'Running 3 chats without dropping the ball',    mins: 24, lessons: 6, progress: 0,   level: 'Advanced' },
  { cat: 'crm',        title: 'Zendesk in 60 minutes',                        mins: 62, lessons: 9, progress: 33,  level: 'Foundation' },
  { cat: 'angry',      title: 'Scenario: Refund denied',                      mins: 12, lessons: 3, progress: 0,   level: 'Practice',    roleplay: true },
  { cat: 'angry',      title: 'Scenario: Package lost on holiday',            mins: 12, lessons: 3, progress: 0,   level: 'Practice',    roleplay: true },
  { cat: 'compliance', title: 'PCI for voice agents',                         mins: 16, lessons: 4, progress: 100, level: 'Required' },
]

export default function TrainingPage() {
  const [cat, setCat] = useState('all')
  const visible = cat === 'all' ? COURSES : COURSES.filter(c => c.cat === cat)

  return (
    <div style={{ padding: '28px 32px 48px', maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 4 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-family-serif)', fontSize: 34, fontWeight: 400, letterSpacing: '-0.02em', margin: 0 }}>
            Training &amp; courses
          </h1>
          <div style={{ color: '#5a6072', fontSize: 14, marginTop: 4, marginBottom: 20 }}>
            Earn certifications, level up skills, and unlock opportunities.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 14px', borderRadius: 6, border: '1px solid #e3e0d2', background: 'transparent', fontSize: 13, cursor: 'pointer', fontWeight: 500 }}>
            <Icon name="calendar" size={13} /> Study plan
          </button>
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 14px', borderRadius: 6, border: 'none', background: '#0b1220', color: '#faf9f6', fontSize: 13, cursor: 'pointer', fontWeight: 500 }}>
            <Icon name="spark" size={13} color="#fff" /> AI: plan my week
          </button>
        </div>
      </div>

      {/* Category tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 24, marginBottom: 28 }}>
        {CATEGORIES.map(c => (
          <div key={c.id} onClick={() => setCat(c.id)} style={{
            background: '#fff', border: `1px solid ${cat === c.id ? c.accent : '#e3e0d2'}`,
            borderRadius: 12, padding: 20, cursor: 'pointer',
            boxShadow: cat === c.id ? `0 0 0 2px ${c.accent}22` : '0 1px 2px rgba(11,18,32,0.06)',
            transition: 'transform 0.15s, box-shadow 0.15s',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: c.accent + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={c.icon} size={18} color={c.accent} />
              </div>
              {c.id === 'angry' && <Chip style={{ fontSize: 10 }}><Icon name="robot" size={10} /> AI</Chip>}
            </div>
            <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 6 }}>{c.label}</div>
            <div style={{ fontSize: 12, color: '#5a6072', lineHeight: 1.5, marginBottom: 14 }}>{c.desc}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 14, borderTop: '1px solid #e3e0d2' }}>
              <div style={{ fontSize: 11, color: '#5a6072', fontWeight: 600 }}>
                {COURSES.filter(x => x.cat === c.id).length} courses
              </div>
              <Icon name="arrow-right" size={12} color="#5a6072" />
            </div>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
        {['all', ...CATEGORIES.map(c => c.id)].map(id => (
          <button key={id} onClick={() => setCat(id)} style={{
            padding: '5px 12px', fontSize: 12, borderRadius: 6, cursor: 'pointer',
            fontWeight: cat === id ? 500 : 400,
            background: cat === id ? '#0b1220' : 'transparent',
            color: cat === id ? '#faf9f6' : '#0b1220',
            border: `1px solid ${cat === id ? '#0b1220' : '#e3e0d2'}`,
          }}>
            {id === 'all' ? 'All courses' : CATEGORIES.find(c => c.id === id)?.label}
          </button>
        ))}
      </div>

      {/* Course table */}
      <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, overflow: 'hidden', boxShadow: '0 1px 2px rgba(11,18,32,0.06)' }}>
        {visible.map((c, i) => (
          <div key={i} style={{
            padding: '16px 20px', borderBottom: i < visible.length - 1 ? '1px solid #e3e0d2' : 'none',
            display: 'grid', gridTemplateColumns: '40px 1fr 120px 140px 120px', gap: 16, alignItems: 'center',
          }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: '#f3f1ea', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon
                name={c.roleplay ? 'robot' : c.progress === 100 ? 'check' : 'play-circle'}
                size={16}
                color={c.progress === 100 ? '#2f8d5c' : c.roleplay ? '#1d6fd6' : '#5a6072'}
              />
            </div>
            <div>
              <div style={{ fontWeight: 500, fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                {c.title}
                {c.roleplay && <Chip style={{ fontSize: 10 }}>Role-play</Chip>}
                {c.level === 'Required' && <Chip variant="bad" style={{ fontSize: 10 }}>Required</Chip>}
              </div>
              <div style={{ fontSize: 12, color: '#5a6072', marginTop: 2 }}>
                {CATEGORIES.find(x => x.id === c.cat)?.label} · {c.level}
              </div>
            </div>
            <div style={{ fontSize: 12, color: '#5a6072', fontFamily: 'monospace' }}>
              {c.lessons} lessons · {c.mins}m
            </div>
            <div>
              <ProgressBar value={c.progress} variant={c.progress === 100 ? 'good' : 'amber'} />
              <div style={{ fontSize: 11, color: '#5a6072', fontWeight: 600, marginTop: 4, fontFamily: 'monospace' }}>{c.progress}%</div>
            </div>
            <button style={{
              padding: '6px 12px', fontSize: 12, borderRadius: 6, cursor: 'pointer', fontWeight: 500,
              border: c.progress === 0 ? 'none' : '1px solid #e3e0d2',
              background: c.progress === 0 ? '#0b1220' : 'transparent',
              color: c.progress === 0 ? '#faf9f6' : '#0b1220',
              display: 'inline-flex', alignItems: 'center', gap: 6, justifyContent: 'center',
            }}>
              {c.progress === 100 ? 'Review' : c.progress > 0 ? 'Resume' : 'Start'} <Icon name="arrow-right" size={11} color={c.progress === 0 ? '#fff' : '#0b1220'} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
