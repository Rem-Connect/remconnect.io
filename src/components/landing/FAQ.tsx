'use client'
import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { FAQS } from '@/lib/landing-data'

const EASE = [0.16, 1, 0.3, 1] as const

function FAQItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div style={{ borderBottom: '1px solid var(--l-line)' }}>
      <button onClick={onToggle}
        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '24px 0', background: 'none', border: 'none', cursor: 'pointer', gap: 24, textAlign: 'left' }}>
        <span style={{ fontWeight: 600, fontSize: 16, color: open ? 'var(--l-ink)' : 'var(--l-body)', lineHeight: 1.4, transition: 'color 0.2s', fontFamily: 'var(--font-family-display)', letterSpacing: '-0.01em' }}>
          {q}
        </span>
        <motion.span animate={{ rotate: open ? 45 : 0, backgroundColor: open ? 'var(--l-blue)' : 'transparent' }} transition={{ duration: 0.25, ease: EASE }}
          style={{ width: 26, height: 26, flexShrink: 0, marginTop: 1, display: 'grid', placeItems: 'center', borderRadius: '50%', border: `1px solid ${open ? 'var(--l-blue)' : 'var(--l-line-2)'}`, color: open ? '#fff' : 'var(--l-body)', fontSize: 17, lineHeight: 1, transition: 'border-color 0.2s, color 0.2s' }}>
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.32, ease: EASE }} style={{ overflow: 'hidden' }}>
            <p style={{ fontSize: 14.5, lineHeight: 1.72, color: 'var(--l-body)', padding: '0 48px 24px 0', margin: 0 }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)
  return (
    <section id="faq" className="l-section-pad" style={{ background: 'var(--l-surface)', padding: '116px 48px', borderTop: '1px solid var(--l-line)', scrollMarginTop: 80 }}>
      <div className="l-faq-grid" style={{ maxWidth: 1180, margin: '0 auto', display: 'grid', gridTemplateColumns: '320px 1fr', gap: 88, alignItems: 'start' }}>
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.6, ease: EASE }} style={{ position: 'sticky', top: 110 }}>
          <p style={{ fontFamily: 'var(--font-family-sans)', fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', color: 'var(--l-blue)', textTransform: 'uppercase', margin: '0 0 16px' }}>FAQ</p>
          <h2 style={{ fontFamily: 'var(--font-family-display)', fontWeight: 600, fontSize: 'clamp(2rem, 3vw, 2.8rem)', color: 'var(--l-ink)', letterSpacing: '-0.03em', lineHeight: 1.04, margin: '0 0 16px' }}>
            Common <span style={{ color: 'var(--l-blue)' }}>questions</span>
          </h2>
          <p style={{ fontSize: 14.5, color: 'var(--l-body)', lineHeight: 1.6, margin: '0 0 26px' }}>Everything about applying, working, and getting paid.</p>
          <a href="mailto:bezamariam@remconnect.io" style={{ fontSize: 13.5, color: 'var(--l-blue)', fontWeight: 600, paddingBottom: 1, borderBottom: '1.5px solid rgba(29,111,214,0.3)' }}>Still have questions? Email us →</a>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.6, delay: 0.12, ease: EASE }}>
          {FAQS.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} open={openIdx === i} onToggle={() => setOpenIdx(openIdx === i ? null : i)} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
