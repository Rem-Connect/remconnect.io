'use client'
import Image from 'next/image'
import { motion } from 'motion/react'
import { Icon } from '@/components/ui/Icon'
import { HERO_SUBHEAD_DISPLAY, APPLY_HREF, SUCCESS_STORIES } from '@/lib/landing-data'

const EASE = [0.16, 1, 0.3, 1] as const

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } }
const item = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }
const float = { hidden: { opacity: 0, y: 24, scale: 0.96 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: EASE } } }

export default function Hero() {
  return (
    <section style={{
      position: 'relative', minHeight: '100dvh', display: 'flex', alignItems: 'center',
      background: 'radial-gradient(120% 120% at 80% 0%, #ffffff 0%, var(--l-bg) 42%, #f3f0e9 100%)',
      overflow: 'hidden',
    }}>
      {/* Ambient accents */}
      <div style={{ position: 'absolute', top: '-12%', right: '4%', width: 620, height: 620, pointerEvents: 'none', background: 'radial-gradient(circle, rgba(29,111,214,0.10) 0%, transparent 64%)' }} />
      <div style={{ position: 'absolute', bottom: '-8%', left: '-6%', width: 480, height: 480, pointerEvents: 'none', background: 'radial-gradient(circle, rgba(29,111,214,0.05) 0%, transparent 70%)' }} />
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.5,
        backgroundImage: 'linear-gradient(rgba(20,24,31,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(20,24,31,0.018) 1px, transparent 1px)',
        backgroundSize: '64px 64px', maskImage: 'radial-gradient(120% 100% at 50% 0%, #000 30%, transparent 80%)',
      }} />

      <div className="l-hero-pad" style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 1280, margin: '0 auto', padding: '132px 48px 90px' }}>
        <div className="l-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 64, alignItems: 'center' }}>

          {/* ── Left: copy ── */}
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div variants={item} style={{
              display: 'inline-flex', alignItems: 'center', gap: 9, marginBottom: 28,
              padding: '6px 14px 6px 10px', borderRadius: 999,
              background: 'var(--l-surface)', border: '1px solid var(--l-line)', boxShadow: 'var(--l-sh-sm)',
            }}>
              <span style={{ position: 'relative', display: 'inline-flex', width: 8, height: 8 }}>
                <span className="rc-pulse" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--l-blue)' }} />
              </span>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--l-body)', letterSpacing: '0.01em' }}>
                30+ roles matched this month
              </span>
            </motion.div>

            <motion.h1 variants={item} style={{
              fontFamily: 'var(--font-family-display)', fontSize: 'clamp(3rem, 5.4vw, 5.4rem)',
              fontWeight: 600, lineHeight: 0.98, letterSpacing: '-0.03em', color: 'var(--l-ink)',
              maxWidth: 640, margin: '0 0 26px',
            }}>
              Your skills,{' '}
              <span style={{ color: 'var(--l-blue)' }}>a global salary.</span>
            </motion.h1>

            <motion.p variants={item} style={{
              fontSize: '1.15rem', lineHeight: 1.6, color: 'var(--l-body)', maxWidth: 440, margin: '0 0 38px', fontWeight: 500,
            }}>
              {HERO_SUBHEAD_DISPLAY}
            </motion.p>

            <motion.div variants={item} style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 44 }}>
              <motion.a href={APPLY_HREF}
                whileHover={{ y: -2, boxShadow: 'var(--l-sh-blue)' }} whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'var(--l-blue)', color: '#fff', padding: '15px 28px', borderRadius: 12, fontWeight: 700, fontSize: 15.5 }}>
                Apply for free <Icon name="arrow-right" size={16} color="#fff" />
              </motion.a>
              <motion.a href="/jobs"
                whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'var(--l-surface)', color: 'var(--l-ink)', padding: '15px 26px', borderRadius: 12, border: '1px solid var(--l-line-2)', fontWeight: 600, fontSize: 15.5, boxShadow: 'var(--l-sh-sm)' }}>
                Browse jobs
              </motion.a>
            </motion.div>

            {/* Trust row */}
            <motion.div variants={item} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ display: 'flex' }}>
                {SUCCESS_STORIES.map((s, i) => (
                  <span key={s.id} style={{
                    width: 38, height: 38, borderRadius: '50%', overflow: 'hidden', position: 'relative',
                    border: '2px solid var(--l-bg)', marginLeft: i === 0 ? 0 : -12, boxShadow: 'var(--l-sh-sm)',
                  }}>
                    <Image src={s.img} alt={s.name} fill sizes="38px" style={{ objectFit: 'cover' }} />
                  </span>
                ))}
              </div>
              <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.4, color: 'var(--l-body)' }}>
                <strong style={{ color: 'var(--l-ink)', fontWeight: 700 }}>100+ professionals</strong><br />
                already placed with global teams
              </p>
            </motion.div>
          </motion.div>

          {/* ── Right: product-feel visual ── */}
          <motion.div variants={container} initial="hidden" animate="show" className="l-hero-visual" style={{ position: 'relative', height: 540 }}>
            {/* Decorative arc */}
            <div className="l-float" style={{ position: 'absolute', top: 30, right: 0, width: 200, height: 200, borderRadius: '50%', border: '1.5px dashed rgba(29,111,214,0.22)', pointerEvents: 'none' }} />

            {/* Main candidate card */}
            <motion.div variants={float} style={{
              position: 'absolute', top: 36, left: '50%', transform: 'translateX(-50%)',
              width: 320, height: 420, borderRadius: 24, overflow: 'hidden',
              boxShadow: 'var(--l-sh-lg)', border: '1px solid var(--l-line)', background: '#fff',
            }}>
              <Image src={SUCCESS_STORIES[0].img} alt={`${SUCCESS_STORIES[0].name}, ${SUCCESS_STORIES[0].role}`} fill sizes="320px" priority style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,18,32,0.82) 0%, transparent 46%)' }} />
              <div style={{ position: 'absolute', top: 14, left: 14, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 11px', borderRadius: 999, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)' }}>
                <span className="rc-pulse" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--rc-good)' }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: '#1d5e3c', letterSpacing: '0.02em' }}>Placed remotely</span>
              </div>
              <div style={{ position: 'absolute', bottom: 18, left: 18, right: 18 }}>
                <p style={{ margin: 0, fontFamily: 'var(--font-family-display)', fontWeight: 600, fontSize: 19, color: '#fff', letterSpacing: '-0.01em' }}>{SUCCESS_STORIES[0].name}</p>
                <p style={{ margin: '3px 0 0', fontSize: 12.5, color: 'rgba(255,255,255,0.72)' }}>{SUCCESS_STORIES[0].role}</p>
              </div>
            </motion.div>

            {/* Floating: salary chip */}
            <motion.div variants={float} className="l-float" style={{
              position: 'absolute', top: 8, left: 0, zIndex: 3,
              background: 'var(--l-surface)', borderRadius: 16, padding: '14px 16px', boxShadow: 'var(--l-sh-md)', border: '1px solid var(--l-line)', animationDelay: '0.6s',
            }}>
              <p style={{ margin: '0 0 2px', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--l-faint)' }}>Monthly</p>
              <p style={{ margin: 0, fontFamily: 'var(--font-family-display)', fontWeight: 600, fontSize: 19, color: 'var(--l-ink)', letterSpacing: '-0.01em' }}>
                40–60k <span style={{ fontSize: 12, color: 'var(--l-blue)' }}>ETB</span>
              </p>
            </motion.div>

            {/* Floating: match ring card */}
            <motion.div variants={float} className="l-float" style={{
              position: 'absolute', bottom: 70, right: 0, zIndex: 3, display: 'flex', alignItems: 'center', gap: 12,
              background: 'var(--l-surface)', borderRadius: 16, padding: '13px 16px', boxShadow: 'var(--l-sh-md)', border: '1px solid var(--l-line)', animationDelay: '1.1s',
            }}>
              <div style={{ position: 'relative', width: 38, height: 38 }}>
                <svg width="38" height="38" viewBox="0 0 38 38" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="19" cy="19" r="16" fill="none" stroke="var(--l-line-2)" strokeWidth="4" />
                  <circle cx="19" cy="19" r="16" fill="none" stroke="var(--l-blue)" strokeWidth="4" strokeLinecap="round" strokeDasharray={2 * Math.PI * 16} strokeDashoffset={2 * Math.PI * 16 * 0.06} />
                </svg>
                <span style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', fontSize: 10, fontWeight: 800, color: 'var(--l-ink)' }}>94</span>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 12.5, fontWeight: 700, color: 'var(--l-ink)' }}>Strong match</p>
                <p style={{ margin: '1px 0 0', fontSize: 11, color: 'var(--l-faint)' }}>to 3 open roles</p>
              </div>
            </motion.div>

            {/* Floating: new role pill */}
            <motion.div variants={float} style={{
              position: 'absolute', bottom: 4, left: 24, zIndex: 3, display: 'flex', alignItems: 'center', gap: 10,
              background: 'var(--l-ink)', borderRadius: 14, padding: '11px 15px', boxShadow: 'var(--l-sh-md)',
            }}>
              <span style={{ display: 'grid', placeItems: 'center', width: 28, height: 28, borderRadius: 8, background: 'rgba(124,179,245,0.18)' }}>
                <Icon name="bell" size={15} color="var(--rc-blue-soft)" />
              </span>
              <div>
                <p style={{ margin: 0, fontSize: 11.5, fontWeight: 600, color: '#fff' }}>New role posted</p>
                <p style={{ margin: '1px 0 0', fontSize: 10.5, color: 'rgba(255,255,255,0.55)' }}>Customer Success · Remote</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="l-scroll-cue" style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, color: 'var(--l-faint)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
        <span>scroll</span>
        <Icon name="chevron-down" size={14} color="var(--l-faint)" />
      </div>
    </section>
  )
}
