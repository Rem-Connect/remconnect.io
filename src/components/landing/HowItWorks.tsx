'use client'
import { motion } from 'motion/react'
import { STEPS } from '@/lib/landing-data'

const EASE = [0.16, 1, 0.3, 1] as const

export default function HowItWorks() {
  return (
    <section id="how" className="l-section-pad" style={{ background: 'var(--l-bg)', padding: '116px 48px', scrollMarginTop: 80 }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.65, ease: EASE }} style={{ marginBottom: 72, maxWidth: 560 }}>
          <p style={{ fontFamily: 'var(--font-family-sans)', fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', color: 'var(--l-blue)', textTransform: 'uppercase', margin: '0 0 16px' }}>
            How it works
          </p>
          <h2 style={{ fontFamily: 'var(--font-family-display)', fontWeight: 600, fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', color: 'var(--l-ink)', letterSpacing: '-0.03em', lineHeight: 1.02, margin: '0 0 18px' }}>
            Three steps to your next opportunity
          </h2>
          <p style={{ fontSize: 15.5, lineHeight: 1.6, color: 'var(--l-body)', margin: 0 }}>
            A clear, human process with no guesswork. Here is exactly what happens after you apply.
          </p>
        </motion.div>

        <div className="l-timeline" style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          <motion.div className="l-timeline-bar"
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, ease: EASE, delay: 0.2 }}
            style={{ position: 'absolute', top: 27, left: '16%', right: '16%', height: 2, background: 'linear-gradient(to right, var(--l-blue), rgba(29,111,214,0.25))', transformOrigin: 'left', borderRadius: 2, zIndex: 0 }} />

          {STEPS.map((step, i) => (
            <motion.div key={step.id}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.18, ease: EASE }}
              style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                width: 56, height: 56, borderRadius: 16, marginBottom: 24,
                display: 'grid', placeItems: 'center', background: 'var(--l-surface)', color: 'var(--l-blue)',
                fontFamily: 'var(--font-family-display)', fontWeight: 600, fontSize: '1.4rem',
                boxShadow: 'var(--l-sh-md)', border: '1px solid var(--l-line)',
              }}>
                {step.n}
              </div>
              <h3 style={{ fontFamily: 'var(--font-family-display)', fontWeight: 600, fontSize: '1.45rem', color: 'var(--l-ink)', letterSpacing: '-0.02em', margin: '0 0 12px' }}>
                {step.title}
              </h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.65, color: 'var(--l-body)', margin: 0, maxWidth: 320 }}>
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
