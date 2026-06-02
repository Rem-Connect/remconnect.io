'use client'
import { useState } from 'react'
import { motion } from 'motion/react'
import { STATS } from '@/lib/landing-data'
import { useCounter } from './useLandingHooks'

function StatItem({ stat, active, isLast }: { stat: typeof STATS[number]; active: boolean; isLast: boolean }) {
  const count = useCounter(stat.value, active, 1700)
  const display = stat.value === 0 ? 'Zero' : `${stat.prefix ?? ''}${count}${stat.suffix ?? ''}`
  return (
    <div style={{ textAlign: 'center', padding: '8px 24px', borderRight: isLast ? 'none' : '1px solid var(--l-line)' }}>
      <div style={{ fontFamily: 'var(--font-family-display)', fontWeight: 600, fontSize: 'clamp(2.2rem, 3.6vw, 3.4rem)', color: 'var(--l-ink)', lineHeight: 1, letterSpacing: '-0.03em' }}>
        {display}
      </div>
      <div style={{ marginTop: 10, fontSize: 12.5, color: 'var(--l-body)', fontWeight: 600, letterSpacing: '0.01em' }}>
        {stat.label}
      </div>
    </div>
  )
}

export default function StatsBar() {
  const [active, setActive] = useState(false)
  return (
    <section style={{ background: 'var(--l-bg)', padding: '68px 48px' }}>
      <motion.div className="l-stats-grid"
        style={{ maxWidth: 1180, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', alignItems: 'center' }}
        initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} onViewportEnter={() => setActive(true)}>
        {STATS.map((stat, i) => (
          <StatItem key={stat.label} stat={stat} active={active} isLast={i === STATS.length - 1} />
        ))}
      </motion.div>
    </section>
  )
}
