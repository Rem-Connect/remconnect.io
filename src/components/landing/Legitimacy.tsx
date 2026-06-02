'use client'
import { motion } from 'motion/react'
import { LEGIT_WILL, LEGIT_WONT, MISSION_QUOTE } from '@/lib/landing-data'

const EASE = [0.16, 1, 0.3, 1] as const

function CheckMark({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="11" stroke={color} strokeOpacity="0.35" />
      <motion.path d="M7 12.5l3.2 3.2L17 8.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: EASE }} />
    </svg>
  )
}

function CrossMark({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="11" stroke={color} strokeOpacity="0.35" />
      <motion.path d="M8 8l8 8M16 8l-8 8" stroke={color} strokeWidth="2.2" strokeLinecap="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: EASE }} />
    </svg>
  )
}

export default function Legitimacy() {
  return (
    <section className="l-section-pad" style={{ background: 'var(--l-surface)', padding: '120px 48px', borderTop: '1px solid var(--l-line)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7, ease: EASE }}
          style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto 64px' }}>
          <span style={{ display: 'inline-block', padding: '6px 14px', borderRadius: 999, background: 'var(--l-tint)', color: 'var(--l-blue-deep)', fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 24 }}>
            Free &amp; legitimate, always
          </span>
          <blockquote style={{ margin: 0, fontFamily: 'var(--font-family-display)', fontWeight: 500, fontSize: 'clamp(1.4rem, 2.4vw, 2.1rem)', lineHeight: 1.36, color: 'var(--l-ink)', letterSpacing: '-0.02em' }}>
            &ldquo;{MISSION_QUOTE}&rdquo;
          </blockquote>
        </motion.div>

        <div className="l-legit-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {[
            { title: 'What we will always do', items: LEGIT_WILL, mark: 'check' as const, color: '#2f8d5c', accent: 'rgba(47,141,92,0.06)' },
            { title: 'What we will never do', items: LEGIT_WONT, mark: 'cross' as const, color: '#c2533f', accent: 'rgba(181,72,56,0.05)' },
          ].map((col, ci) => (
            <motion.div key={col.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, delay: ci * 0.12, ease: EASE }}
              style={{ background: col.accent, border: '1px solid var(--l-line)', borderRadius: 22, padding: '40px 38px' }}>
              <h3 style={{ fontFamily: 'var(--font-family-display)', fontWeight: 600, fontSize: '1.25rem', color: 'var(--l-ink)', letterSpacing: '-0.015em', margin: '0 0 26px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: col.color }} /> {col.title}
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 18 }}>
                {col.items.map((it, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: ci === 0 ? -10 : 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.1 + i * 0.07, ease: EASE }}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: 13 }}>
                    {col.mark === 'check' ? <CheckMark color={col.color} /> : <CrossMark color={col.color} />}
                    <span style={{ fontSize: 14.5, lineHeight: 1.5, color: 'var(--l-body)', fontWeight: 500 }}>{it}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
          style={{ textAlign: 'center', marginTop: 36, fontSize: 13.5, color: 'var(--l-body)' }}>
          Spotted something suspicious? Report it to{' '}
          <a href="mailto:bezamariam@remconnect.io" style={{ color: 'var(--l-blue)', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: 3 }}>bezamariam@remconnect.io</a>
        </motion.p>
      </div>
    </section>
  )
}
