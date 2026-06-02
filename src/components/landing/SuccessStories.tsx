'use client'
import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'motion/react'
import { SUCCESS_STORIES } from '@/lib/landing-data'

const EASE = [0.16, 1, 0.3, 1] as const

export default function SuccessStories() {
  const [active, setActive] = useState(0)
  const story = SUCCESS_STORIES[active]

  return (
    <section id="stories" className="l-section-pad" style={{ background: 'var(--l-bg)', padding: '116px 48px', scrollMarginTop: 80 }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.65, ease: EASE }} style={{ marginBottom: 52, maxWidth: 560 }}>
          <p style={{ fontFamily: 'var(--font-family-sans)', fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', color: 'var(--l-blue)', textTransform: 'uppercase', margin: '0 0 16px' }}>
            Success stories
          </p>
          <h2 style={{ fontFamily: 'var(--font-family-display)', fontWeight: 600, fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', color: 'var(--l-ink)', letterSpacing: '-0.03em', lineHeight: 1.02, margin: '0 0 16px' }}>
            Real people, <span style={{ color: 'var(--l-blue)' }}>real placements</span>
          </h2>
          <p style={{ fontSize: 15.5, lineHeight: 1.6, color: 'var(--l-body)', margin: 0 }}>
            Professionals from Addis Ababa now working with teams around the world.
          </p>
        </motion.div>

        <div className="l-stories-grid" style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: 56, alignItems: 'center' }}>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, ease: EASE }}
            style={{ position: 'relative', aspectRatio: '4 / 5', borderRadius: 24, overflow: 'hidden', boxShadow: 'var(--l-sh-lg)', border: '1px solid var(--l-line)', background: 'var(--l-ink)' }}>
            <AnimatePresence mode="wait">
              <motion.div key={story.id} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease: EASE }} style={{ position: 'absolute', inset: 0 }}>
                <Image src={story.img} alt={`${story.name}, ${story.role}`} fill sizes="400px" style={{ objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,18,32,0.9) 0%, transparent 45%)' }} />
                <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 11px', borderRadius: 999, background: 'rgba(255,255,255,0.92)', fontSize: 11, fontWeight: 700, color: '#1d5e3c', letterSpacing: '0.02em', marginBottom: 12 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--rc-good)' }} /> {story.outcome}
                  </span>
                  <p style={{ margin: 0, fontFamily: 'var(--font-family-display)', fontWeight: 600, fontSize: '1.4rem', color: '#fff', letterSpacing: '-0.01em' }}>{story.name}</p>
                  <p style={{ margin: '4px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>{story.role} · {story.placedAt}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, ease: EASE }}>
            <div style={{ fontFamily: 'var(--font-family-display)', fontSize: '4rem', lineHeight: 0.7, color: 'var(--l-line-2)', marginBottom: 16 }}>&ldquo;</div>
            <AnimatePresence mode="wait">
              <motion.blockquote key={story.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35, ease: EASE }}
                style={{ margin: '0 0 36px', fontFamily: 'var(--font-family-display)', fontWeight: 500, fontSize: 'clamp(1.3rem, 2vw, 1.85rem)', lineHeight: 1.4, color: 'var(--l-ink)', letterSpacing: '-0.02em', maxWidth: 600 }}>
                {story.quote}
              </motion.blockquote>
            </AnimatePresence>

            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              {SUCCESS_STORIES.map((s, i) => (
                <button key={s.id} onClick={() => setActive(i)} aria-label={`Show ${s.name}'s story`}
                  style={{ position: 'relative', width: 54, height: 54, borderRadius: '50%', overflow: 'hidden', border: `2px solid ${i === active ? 'var(--l-blue)' : 'transparent'}`, padding: 0, cursor: 'pointer', background: 'none', opacity: i === active ? 1 : 0.55, transition: 'opacity 0.2s, border-color 0.2s', flexShrink: 0, boxShadow: i === active ? 'var(--l-sh-md)' : 'none' }}
                  onMouseEnter={e => { if (i !== active) e.currentTarget.style.opacity = '0.85' }}
                  onMouseLeave={e => { if (i !== active) e.currentTarget.style.opacity = '0.55' }}>
                  <Image src={s.img} alt={s.name} fill sizes="54px" style={{ objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
