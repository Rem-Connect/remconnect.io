'use client'
import Image from 'next/image'
import { motion } from 'motion/react'
import { Icon } from '@/components/ui/Icon'
import { BENEFITS } from '@/lib/landing-data'

const EASE = [0.16, 1, 0.3, 1] as const

export default function WhatYouGet() {
  return (
    <section className="l-section-pad" style={{ background: 'var(--l-bg)', padding: '116px 48px' }}>
      <div className="l-split-grid" style={{ maxWidth: 1180, margin: '0 auto', display: 'grid', gridTemplateColumns: '0.82fr 1fr', gap: 72, alignItems: 'center' }}>
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, ease: EASE }}>
          <h2 style={{ fontFamily: 'var(--font-family-display)', fontWeight: 600, fontSize: 'clamp(2.1rem, 3.6vw, 3.1rem)', color: 'var(--l-ink)', letterSpacing: '-0.03em', lineHeight: 1.04, margin: '0 0 18px' }}>
            More than a job, <span style={{ color: 'var(--l-blue)' }}>a real foothold</span>
          </h2>
          <p style={{ fontSize: 15.5, lineHeight: 1.6, color: 'var(--l-body)', margin: '0 0 32px', maxWidth: 400 }}>
            Placement is the start. Here is what comes with working through RemConnect.
          </p>
          <div style={{ position: 'relative', borderRadius: 22, overflow: 'hidden', aspectRatio: '4 / 3', boxShadow: 'var(--l-sh-lg)', border: '1px solid var(--l-line)' }}>
            <Image src="/agents/nahom-dereje.jpg" alt="A RemConnect-placed professional working remotely" fill sizes="(max-width: 1024px) 100vw, 420px" style={{ objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,18,32,0.55), transparent 55%)' }} />
            <p style={{ position: 'absolute', bottom: 16, left: 18, margin: 0, fontSize: 12.5, color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>Working remotely from Addis Ababa</p>
          </div>
        </motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}>
          {BENEFITS.map((b, i) => (
            <motion.div key={b.id} variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } } }}
              style={{ display: 'flex', gap: 22, padding: '24px 0', borderBottom: i < BENEFITS.length - 1 ? '1px solid var(--l-line)' : 'none' }}>
              <div style={{ width: 46, height: 46, flexShrink: 0, borderRadius: 13, display: 'grid', placeItems: 'center', background: 'var(--l-tint)', color: 'var(--l-blue)' }}>
                <Icon name={b.icon} size={21} color="var(--l-blue)" />
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-family-display)', fontWeight: 600, fontSize: '1.15rem', color: 'var(--l-ink)', letterSpacing: '-0.015em', margin: '0 0 5px' }}>{b.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--l-body)', margin: 0 }}>{b.body}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
