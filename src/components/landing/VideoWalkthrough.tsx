'use client'
import { useState } from 'react'
import { motion } from 'motion/react'
import { Icon } from '@/components/ui/Icon'
import { VIDEO_YOUTUBE_ID } from '@/lib/landing-data'

const EASE = [0.16, 1, 0.3, 1] as const

export default function VideoWalkthrough() {
  const [playing, setPlaying] = useState(false)
  const poster = `https://i.ytimg.com/vi/${VIDEO_YOUTUBE_ID}/maxresdefault.jpg`

  return (
    <section className="l-section-pad" style={{ background: 'var(--l-tint)', padding: '116px 48px' }}>
      <div style={{ maxWidth: 1040, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.65, ease: EASE }}
          style={{ textAlign: 'center', marginBottom: 44, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
          <h2 style={{ fontFamily: 'var(--font-family-display)', fontWeight: 600, fontSize: 'clamp(2.1rem, 3.6vw, 3.1rem)', color: 'var(--l-ink)', letterSpacing: '-0.03em', lineHeight: 1.04, margin: '0 0 14px' }}>
            How to register, in two minutes
          </h2>
          <p style={{ fontSize: 15.5, lineHeight: 1.6, color: 'var(--l-body)', margin: 0 }}>
            A step-by-step walkthrough of creating your account and submitting a profile that gets matched.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, ease: EASE }}
          style={{ position: 'relative', borderRadius: 22, overflow: 'hidden', aspectRatio: '16 / 9', border: '1px solid var(--l-line)', boxShadow: 'var(--l-sh-lg)', background: 'var(--l-ink)' }}>
          {playing ? (
            <iframe src={`https://www.youtube-nocookie.com/embed/${VIDEO_YOUTUBE_ID}?autoplay=1&rel=0`} title="How to register on RemConnect"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }} />
          ) : (
            <button onClick={() => setPlaying(true)} aria-label="Play registration walkthrough"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', padding: 0, cursor: 'pointer', background: 'none' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={poster} alt="RemConnect registration walkthrough video" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <span style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,18,32,0.45), rgba(11,18,32,0.12))' }} />
              <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', display: 'grid', placeItems: 'center' }}>
                <span aria-hidden className="l-ripple" style={{ position: 'absolute', width: 84, height: 84, borderRadius: '50%', background: 'var(--l-blue)' }} />
                <motion.span whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
                  style={{ position: 'relative', width: 84, height: 84, borderRadius: '50%', background: 'var(--l-blue)', display: 'grid', placeItems: 'center', boxShadow: 'var(--l-sh-blue)' }}>
                  <Icon name="play" size={32} color="#fff" />
                </motion.span>
              </span>
            </button>
          )}
        </motion.div>
      </div>
    </section>
  )
}
