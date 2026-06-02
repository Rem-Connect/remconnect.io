'use client'
import { motion } from 'motion/react'
import { REQUIREMENTS, APPLY_HREF } from '@/lib/landing-data'

const EASE = [0.16, 1, 0.3, 1] as const

function TickBox() {
  return (
    <motion.span initial={{ scale: 0.6 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, ease: EASE }}
      style={{ width: 30, height: 30, borderRadius: 9, flexShrink: 0, display: 'grid', placeItems: 'center', background: 'var(--l-blue)', boxShadow: '0 4px 12px rgba(29,111,214,0.3)' }}>
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
        <motion.path d="M6 12.5l3.5 3.5L18 7.5" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.15, ease: EASE }} />
      </svg>
    </motion.span>
  )
}

export default function Requirements() {
  return (
    <section className="l-section-pad" style={{ background: 'var(--l-bg)', padding: '116px 48px' }}>
      <div style={{ maxWidth: 1040, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.65, ease: EASE }}
          style={{ textAlign: 'center', maxWidth: 580, margin: '0 auto 52px' }}>
          <h2 style={{ fontFamily: 'var(--font-family-display)', fontWeight: 600, fontSize: 'clamp(2.1rem, 3.6vw, 3.1rem)', color: 'var(--l-ink)', letterSpacing: '-0.03em', lineHeight: 1.04, margin: '0 0 14px' }}>
            Before you apply, a quick check
          </h2>
          <p style={{ fontSize: 15.5, lineHeight: 1.6, color: 'var(--l-body)', margin: 0 }}>
            Most candidates qualify. Tick off what applies, then start your profile.
          </p>
        </motion.div>

        <div className="l-req-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 40px', marginBottom: 48 }}>
          {REQUIREMENTS.map((req, i) => (
            <motion.div key={req.label} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
              style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '24px 26px', borderRadius: 16, background: 'var(--l-surface)', border: '1px solid var(--l-line)', boxShadow: 'var(--l-sh-sm)' }}>
              <TickBox />
              <div>
                <h3 style={{ fontFamily: 'var(--font-family-display)', fontWeight: 600, fontSize: '1.1rem', color: 'var(--l-ink)', margin: '0 0 4px', letterSpacing: '-0.015em' }}>{req.label}</h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.55, color: 'var(--l-body)', margin: 0 }}>{req.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <motion.a href={APPLY_HREF} whileHover={{ y: -2, boxShadow: 'var(--l-sh-blue)' }} whileTap={{ scale: 0.98 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--l-blue)', color: '#fff', padding: '15px 32px', borderRadius: 12, fontWeight: 700, fontSize: 15.5 }}>
            Apply for free →
          </motion.a>
        </div>
      </div>
    </section>
  )
}
