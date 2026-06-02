'use client'
import { motion } from 'motion/react'
import { Icon } from '@/components/ui/Icon'
import { FEATURED_JOBS } from '@/lib/landing-data'

const EASE = [0.16, 1, 0.3, 1] as const

const TYPE_COLOR: Record<string, { bg: string; text: string }> = {
  'Full Time': { bg: 'rgba(29,111,214,0.1)', text: 'var(--l-blue-deep)' },
  'Part Time': { bg: 'rgba(47,141,92,0.12)', text: '#256b45' },
  'Contract': { bg: 'rgba(192,138,42,0.14)', text: '#9a6a1c' },
}

export default function OpenRoles() {
  const [feature, ...rest] = FEATURED_JOBS
  return (
    <section className="l-section-pad" style={{ background: 'var(--l-surface)', padding: '116px 48px', borderTop: '1px solid var(--l-line)', borderBottom: '1px solid var(--l-line)' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.65, ease: EASE }}
          style={{ marginBottom: 52, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
          <h2 style={{ fontFamily: 'var(--font-family-display)', fontWeight: 600, fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', color: 'var(--l-ink)', letterSpacing: '-0.03em', lineHeight: 1.02, margin: 0, maxWidth: 560 }}>
            Roles open right now
          </h2>
          <motion.a href="/jobs" whileHover={{ x: 4 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 7, color: 'var(--l-blue)', fontSize: 14.5, fontWeight: 700, paddingBottom: 2, borderBottom: '1.5px solid rgba(29,111,214,0.3)' }}>
            Browse all jobs <Icon name="arrow-right" size={14} color="currentColor" />
          </motion.a>
        </motion.div>

        <div className="l-jobs-grid" style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gridTemplateRows: 'auto auto', gap: 16 }}>
          <motion.div className="l-jobs-feature"
            initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease: EASE }}
            whileHover={{ y: -5 }}
            style={{ gridRow: '1 / 3', background: 'var(--l-ink)', borderRadius: 22, padding: 44, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 380, position: 'relative', overflow: 'hidden', boxShadow: 'var(--l-sh-lg)' }}>
            <div style={{ position: 'absolute', top: -70, right: -70, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(29,111,214,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative' }}>
              <div style={{ display: 'flex', gap: 10, marginBottom: 26, flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ padding: '5px 12px', borderRadius: 7, fontSize: 11.5, fontWeight: 700, letterSpacing: '0.03em', background: 'rgba(124,179,245,0.18)', color: 'var(--rc-blue-soft)' }}>{feature.employmentType}</span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>{feature.location}</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-family-display)', fontWeight: 600, fontSize: '1.7rem', color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.15, margin: '0 0 16px' }}>{feature.title}</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.65, color: 'rgba(255,255,255,0.62)', margin: 0, maxWidth: 380 }}>{feature.blurb}</p>
            </div>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 36, flexWrap: 'wrap', gap: 12 }}>
              <span style={{ fontFamily: 'var(--font-family-display)', fontWeight: 600, fontSize: '1.2rem', color: '#fff' }}>{feature.salaryRange}</span>
              <motion.a href="/apply" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--l-blue)', color: '#fff', padding: '12px 24px', borderRadius: 10, fontWeight: 700, fontSize: 13.5 }}>
                Apply now <Icon name="arrow-right" size={13} color="#fff" />
              </motion.a>
            </div>
          </motion.div>

          {rest.map((job, i) => {
            const tc = TYPE_COLOR[job.employmentType] ?? TYPE_COLOR['Full Time']
            return (
              <motion.div key={job.id}
                initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: (i + 1) * 0.1, ease: EASE }}
                whileHover={{ y: -4 }}
                style={{ background: 'var(--l-bg)', border: '1px solid var(--l-line)', borderRadius: 18, padding: '28px 30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 16, boxShadow: 'var(--l-sh-sm)' }}>
                <div>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ padding: '4px 10px', borderRadius: 6, fontSize: 10.5, fontWeight: 700, letterSpacing: '0.03em', background: tc.bg, color: tc.text }}>{job.employmentType}</span>
                    <span style={{ fontSize: 11.5, color: 'var(--l-faint)' }}>{job.location}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-family-display)', fontWeight: 600, fontSize: '1.15rem', color: 'var(--l-ink)', letterSpacing: '-0.015em', lineHeight: 1.25, margin: '0 0 8px' }}>{job.title}</h3>
                  <p style={{ fontSize: 13, color: 'var(--l-body)', lineHeight: 1.55, margin: 0 }}>{job.blurb}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'var(--font-family-display)', fontSize: 13.5, color: 'var(--l-ink)', fontWeight: 600 }}>{job.salaryRange}</span>
                  <a href="/apply" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700, color: 'var(--l-blue)' }}>Apply <Icon name="arrow-right" size={13} color="currentColor" /></a>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
