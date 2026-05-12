'use client'

import { usePortal } from '@/context/PortalContext'
import { HomeHero } from '@/components/home/HomeHero'
import { TodayQueue } from '@/components/home/TodayQueue'
import { AICoachCard } from '@/components/home/AICoachCard'
import { SkillSnapshot } from '@/components/home/SkillSnapshot'

export default function HomePage() {
  const { status } = usePortal()
  return (
    <div style={{ padding: '28px 32px 48px', maxWidth: 1280, margin: '0 auto' }}>
      <HomeHero status={status} />
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 20 }}>
        <TodayQueue status={status} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <AICoachCard />
          <SkillSnapshot />
        </div>
      </div>
    </div>
  )
}
