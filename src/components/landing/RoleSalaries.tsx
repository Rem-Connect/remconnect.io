'use client'
import { useState } from 'react'
import { motion } from 'motion/react'
import { Icon } from '@/components/ui/Icon'
import { ROLE_CATEGORIES } from '@/lib/landing-data'

const EASE = [0.16, 1, 0.3, 1] as const

function RoleCard({ role, index }: { role: typeof ROLE_CATEGORIES[number]; index: number }) {
  const [hover, setHover] = useState(false)
  return (
    <motion.div
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: EASE }}
      whileHover={{ y: -6 }}
      style={{
        position: 'relative', background: 'var(--l-surface)',
        border: `1px solid ${hover ? 'rgba(29,111,214,0.35)' : 'var(--l-line)'}`,
        borderRadius: 20, padding: '30px 28px 26px', overflow: 'hidden', cursor: 'default',
        boxShadow: hover ? 'var(--l-sh-lg)' : 'var(--l-sh-sm)',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}>
      <div style={{ position: 'absolute', top: 0, left: 0, height: 3, width: hover ? '100%' : '0%', background: 'var(--l-blue)', transition: 'width 0.4s cubic-bezier(0.16,1,0.3,1)' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <span style={{ display: 'grid', placeItems: 'center', width: 46, height: 46, borderRadius: 13, background: hover ? 'var(--l-blue)' : 'var(--l-tint)', transition: 'background 0.3s' }}>
          <Icon name={role.icon} size={22} color={hover ? '#fff' : 'var(--l-blue)'} />
        </span>
        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--l-faint)', letterSpacing: '0.04em' }}>0{index + 1}</span>
      </div>

      <h3 style={{ fontFamily: 'var(--font-family-display)', fontWeight: 600, fontSize: '1.3rem', color: 'var(--l-ink)', letterSpacing: '-0.02em', margin: '0 0 10px' }}>
        {role.name}
      </h3>
      <p style={{ margin: '0 0 20px', fontSize: 13, lineHeight: 1.55, color: 'var(--l-body)' }}>
        {role.examples.join(' · ')}
      </p>

      <div style={{ paddingTop: 16, borderTop: '1px solid var(--l-line)', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--l-faint)', textTransform: 'uppercase', letterSpacing: '0.09em' }}>Typical / mo</span>
        <span style={{ fontFamily: 'var(--font-family-display)', fontWeight: 600, fontSize: '1.1rem', color: 'var(--l-blue-deep)', letterSpacing: '-0.01em' }}>{role.salaryBand}</span>
      </div>
    </motion.div>
  )
}

export default function RoleSalaries() {
  return (
    <section className="l-section-pad" style={{ background: 'var(--l-tint)', padding: '116px 48px' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.65, ease: EASE }} style={{ marginBottom: 60, maxWidth: 640 }}>
          <p style={{ fontFamily: 'var(--font-family-sans)', fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', color: 'var(--l-blue)', textTransform: 'uppercase', margin: '0 0 16px' }}>
            Is there a role for you?
          </p>
          <h2 style={{ fontFamily: 'var(--font-family-display)', fontWeight: 600, fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', color: 'var(--l-ink)', letterSpacing: '-0.03em', lineHeight: 1.02, margin: '0 0 18px' }}>
            Six fields we place into, and <span style={{ color: 'var(--l-blue)' }}>what they pay</span>
          </h2>
          <p style={{ fontSize: 15.5, lineHeight: 1.6, color: 'var(--l-body)', margin: 0, maxWidth: 540 }}>
            No degree required. Every band below is what we typically match Ethiopian professionals into.
          </p>
        </motion.div>

        <div className="l-roles-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
          {ROLE_CATEGORIES.map((role, i) => <RoleCard key={role.id} role={role} index={i} />)}
        </div>

        <p style={{ marginTop: 26, fontSize: 12, color: 'var(--l-faint)', fontWeight: 500 }}>
          {/* TODO: confirm representative bands; final figures vary by role, experience, and client. */}
          Bands are representative and vary by role, experience, and the hiring company.
        </p>
      </div>
    </section>
  )
}
