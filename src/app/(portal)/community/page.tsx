'use client'

import { useState } from 'react'
import { Icon } from '@/components/ui/Icon'
import { Chip } from '@/components/ui/Chip'
import { Avatar } from '@/components/ui/Avatar'

const ANNOUNCEMENTS = [
  {
    id: 1, type: 'ops', title: 'New client onboarding — Apex Insurance wave 2',
    body: 'We\'re onboarding 12 new agents to the Apex Insurance account starting May 19. If you are bench-ready and interested, respond to the invite in your Opportunities tab before Friday.',
    author: 'Ops · Mekdes Haile', date: 'May 10', pinned: true,
  },
  {
    id: 2, type: 'training', title: 'CX Excellence Level 2 — cohort registration open',
    body: 'The next CXE Level 2 cohort begins May 26. Seats are limited to 30. Complete the pre-assessment first — link in your Training tab.',
    author: 'Training · Samuel Girma', date: 'May 9', pinned: false,
  },
  {
    id: 3, type: 'update', title: 'Platform update: earnings export now includes ETB breakdown',
    body: 'The CSV export on your Earnings page now shows both native and USD-equivalent columns. This makes it easier to reconcile against your CBE bank statements.',
    author: 'Product · RemConnect', date: 'May 8', pinned: false,
  },
  {
    id: 4, type: 'event', title: 'Monthly all-hands — May 15 @ 3PM EAT',
    body: 'Join the May all-hands for a performance recap, client updates, and Q&A with leadership. Zoom link will be sent 1h before.',
    author: 'Ops · Mekdes Haile', date: 'May 7', pinned: false,
  },
]

const STUDY_GROUPS = [
  {
    id: 'vsf-may', name: 'VSF Study Group · May cohort', topic: 'Verified Support Fundamentals',
    members: 8, maxMembers: 10, nextSession: 'Fri May 16 · 2PM EAT', joined: true,
    avatarTones: [0, 1, 2, 3],
  },
  {
    id: 'cxe2-june', name: 'CXE Level 2 · Pre-cohort', topic: 'CX Excellence Level 2 prep',
    members: 14, maxMembers: 20, nextSession: 'Mon May 19 · 4PM EAT', joined: false,
    avatarTones: [1, 2, 4, 5],
  },
  {
    id: 'qa-calibration', name: 'QA Calibration Circle', topic: 'Call scoring & calibration',
    members: 6, maxMembers: 8, nextSession: 'Wed May 21 · 1PM EAT', joined: false,
    avatarTones: [0, 3, 5],
  },
]

const LEADERBOARD = [
  { rank: 1, name: 'Tigist Bekele', score: 97, delta: '+2', tone: 2 },
  { rank: 2, name: 'Eyob Tesfaye', score: 95, delta: '+1', tone: 4 },
  { rank: 3, name: 'Liya Demeke',  score: 94, delta: '+3', tone: 0, isMe: true },
  { rank: 4, name: 'Naol Gemechu', score: 91, delta: '—', tone: 1 },
  { rank: 5, name: 'Sara Alemu',   score: 88, delta: '-1', tone: 5 },
]

const TYPE_CFG = {
  ops:      { label: 'Ops', chip: 'neutral' as const },
  training: { label: 'Training', chip: 'good' as const },
  update:   { label: 'Update', chip: 'default' as const },
  event:    { label: 'Event', chip: 'warn' as const },
}

export default function CommunityPage() {
  const [filter, setFilter] = useState<string>('all')

  const filtered = ANNOUNCEMENTS.filter(a => filter === 'all' || a.type === filter)

  return (
    <div style={{ padding: '28px 32px 48px', maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-family-serif)', fontSize: 34, fontWeight: 400, letterSpacing: '-0.02em', margin: 0 }}>Community</h1>
          <div style={{ color: '#5a6072', fontSize: 14, marginTop: 4 }}>Announcements, cohort groups, and the agent leaderboard.</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20 }}>
        {/* Left: Announcements */}
        <div>
          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 16, background: '#f3f1ea', padding: 4, borderRadius: 8, width: 'fit-content' }}>
            {['all', 'ops', 'training', 'update', 'event'].map(t => (
              <button key={t} onClick={() => setFilter(t)} style={{
                padding: '6px 12px', fontSize: 12, borderRadius: 6, border: 'none', cursor: 'pointer',
                fontWeight: filter === t ? 500 : 400,
                background: filter === t ? '#0b1220' : 'transparent',
                color: filter === t ? '#fff' : '#5a6072',
              }}>
                {t === 'all' ? 'All' : TYPE_CFG[t as keyof typeof TYPE_CFG]?.label}
              </button>
            ))}
          </div>

          {/* Announcement cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filtered.map(a => {
              const cfg = TYPE_CFG[a.type as keyof typeof TYPE_CFG]
              return (
                <div key={a.id} style={{ background: '#fff', border: a.pinned ? '1px solid rgba(29,111,214,0.3)' : '1px solid #e3e0d2', borderRadius: 10, padding: '16px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    {a.pinned && (
                      <Chip variant="default" style={{ fontSize: 10 }}>
                        <Icon name="pin" size={9} /> Pinned
                      </Chip>
                    )}
                    <Chip variant={cfg.chip} style={{ fontSize: 10 }}>{cfg.label}</Chip>
                    <span style={{ fontSize: 11, color: '#5a6072', fontFamily: 'monospace', marginLeft: 'auto' }}>{a.date}</span>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 6 }}>{a.title}</div>
                  <div style={{ fontSize: 13, color: '#5a6072', lineHeight: 1.6 }}>{a.body}</div>
                  <div style={{ fontSize: 11, color: '#8b93a7', marginTop: 10 }}>{a.author}</div>
                </div>
              )
            })}
          </div>

          {/* Study groups */}
          <div style={{ marginTop: 28 }}>
            <div style={{ fontFamily: 'var(--font-family-serif)', fontSize: 22, letterSpacing: '-0.02em', marginBottom: 14 }}>Study groups</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {STUDY_GROUPS.map(g => (
                <div key={g.id} style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{g.name}</div>
                      {g.joined && <Chip variant="good" style={{ fontSize: 10 }}>Joined</Chip>}
                    </div>
                    <div style={{ fontSize: 12, color: '#5a6072', marginBottom: 8 }}>{g.topic}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, color: '#5a6072' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {g.avatarTones.map((t, i) => (
                          <div key={i} style={{ marginLeft: i ? -8 : 0, zIndex: g.avatarTones.length - i }}>
                            <Avatar name=" " size={22} tone={t} />
                          </div>
                        ))}
                        <span style={{ marginLeft: 8 }}>{g.members} / {g.maxMembers} members</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Icon name="clock" size={11} />
                        {g.nextSession}
                      </div>
                    </div>
                  </div>
                  <button style={{
                    padding: '7px 14px', fontSize: 12, borderRadius: 6, cursor: 'pointer', fontWeight: 500,
                    border: g.joined ? '1px solid #e3e0d2' : 'none',
                    background: g.joined ? 'transparent' : '#0b1220',
                    color: g.joined ? '#0b1220' : '#fff',
                    flexShrink: 0,
                  }}>
                    {g.joined ? 'View group' : 'Join group'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Leaderboard */}
        <div>
          <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #e3e0d2', fontFamily: 'var(--font-family-serif)', fontSize: 20, letterSpacing: '-0.02em' }}>
              Cohort leaderboard
            </div>
            <div style={{ padding: '10px 20px', background: '#f3f1ea', borderBottom: '1px solid #e3e0d2', fontSize: 10, color: '#5a6072', fontWeight: 600, display: 'grid', gridTemplateColumns: '28px 1fr 50px 40px' }}>
              <div>#</div><div>Agent</div><div>Score</div><div>Δ</div>
            </div>
            {LEADERBOARD.map(l => (
              <div key={l.rank} style={{
                display: 'grid', gridTemplateColumns: '28px 1fr 50px 40px',
                padding: '12px 20px', alignItems: 'center', fontSize: 13,
                background: l.isMe ? 'rgba(29,111,214,0.04)' : 'transparent',
                borderBottom: '1px solid #e3e0d2',
              }}>
                <div style={{ fontFamily: 'monospace', fontWeight: 600, color: l.rank <= 3 ? '#c08a2a' : '#8b93a7', fontSize: 12 }}>
                  {l.rank <= 3 ? ['🥇', '🥈', '🥉'][l.rank - 1] : l.rank}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Avatar name={l.name} size={26} tone={l.tone} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: l.isMe ? 600 : 400 }}>{l.name}</div>
                    {l.isMe && <div style={{ fontSize: 10, color: '#1d6fd6' }}>You</div>}
                  </div>
                </div>
                <div style={{ fontFamily: 'monospace', fontWeight: 600, fontSize: 14 }}>{l.score}</div>
                <div style={{ fontFamily: 'monospace', fontSize: 11, color: l.delta.startsWith('+') ? '#2f8d5c' : l.delta === '—' ? '#5a6072' : '#b54838' }}>
                  {l.delta}
                </div>
              </div>
            ))}
            <div style={{ padding: '12px 20px', fontSize: 11, color: '#5a6072', textAlign: 'center' }}>
              Rolling 30-day composite · Updated daily
            </div>
          </div>

          {/* Upcoming events */}
          <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, marginTop: 16, overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #e3e0d2', fontFamily: 'var(--font-family-serif)', fontSize: 20, letterSpacing: '-0.02em' }}>
              Upcoming events
            </div>
            {[
              { date: 'May 15', name: 'Monthly all-hands', time: '3:00 PM EAT' },
              { date: 'May 19', name: 'Apex Insurance onboarding', time: '10:00 AM EAT' },
              { date: 'May 26', name: 'CXE Level 2 cohort starts', time: '9:00 AM EAT' },
            ].map((e, i, arr) => (
              <div key={i} style={{ padding: '12px 20px', borderBottom: i < arr.length - 1 ? '1px solid #e3e0d2' : 'none', display: 'flex', gap: 14, alignItems: 'center' }}>
                <div style={{ width: 40, textAlign: 'center', flexShrink: 0 }}>
                  <div style={{ fontSize: 18, fontFamily: 'var(--font-family-serif)', lineHeight: 1 }}>{e.date.split(' ')[1]}</div>
                  <div style={{ fontSize: 10, color: '#5a6072', fontWeight: 600 }}>{e.date.split(' ')[0].toUpperCase()}</div>
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{e.name}</div>
                  <div style={{ fontSize: 11, color: '#5a6072' }}>{e.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
