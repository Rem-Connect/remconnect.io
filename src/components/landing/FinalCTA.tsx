'use client'
import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { Icon } from '@/components/ui/Icon'
import { APPLY_HREF } from '@/lib/landing-data'

const EASE = [0.16, 1, 0.3, 1] as const

function MagneticCTA() {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useSpring(useMotionValue(0), { stiffness: 250, damping: 15 })
  const y = useSpring(useMotionValue(0), { stiffness: 250, damping: 15 })
  function onMove(e: React.MouseEvent) {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.35)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35)
  }
  function onLeave() { x.set(0); y.set(0) }
  return (
    <motion.a ref={ref} href={APPLY_HREF} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ x, y, display: 'inline-flex', alignItems: 'center', gap: 12, background: '#fff', color: 'var(--l-blue-deep)', padding: '18px 42px', borderRadius: 14, fontWeight: 700, fontSize: 17, boxShadow: '0 18px 44px rgba(11,18,32,0.22)' }}
      whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
      Apply for free <Icon name="arrow-right" size={18} color="var(--l-blue-deep)" />
    </motion.a>
  )
}

export default function FinalCTA() {
  return (
    <section style={{ background: 'var(--l-blue)', padding: '128px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -120, right: -80, width: 360, height: 360, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.14)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -140, left: -60, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.5, backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '64px 64px', maskImage: 'radial-gradient(100% 100% at 50% 0%, #000 20%, transparent 75%)' }} />

      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7, ease: EASE }}
        style={{ position: 'relative', zIndex: 1, maxWidth: 760, margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-family-display)', fontWeight: 600, fontSize: 'clamp(2.6rem, 5vw, 4.4rem)', color: '#fff', letterSpacing: '-0.035em', lineHeight: 1, margin: '0 0 22px' }}>
          Your next role is <span style={{ color: 'rgba(255,255,255,0.7)' }}>one profile away</span>
        </h2>
        <p style={{ fontSize: '1.15rem', lineHeight: 1.55, color: 'rgba(255,255,255,0.82)', margin: '0 auto 44px', maxWidth: 480, fontWeight: 500 }}>
          Apply once, get matched to every opportunity that fits. Free, forever, for candidates.
        </p>
        <MagneticCTA />
        <p style={{ marginTop: 22, fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>No fees. No catch. Just a fairer path to global work.</p>
      </motion.div>
    </section>
  )
}
