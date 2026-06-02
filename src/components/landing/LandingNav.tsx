'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useScrolled } from './useLandingHooks'
import { EMPLOYERS_HREF } from '@/lib/landing-data'

const LINKS = [
  { label: 'Jobs', href: '/jobs' },
  { label: 'How it works', href: '#how' },
  { label: 'Success stories', href: '#stories' },
  { label: 'FAQ', href: '#faq' },
]

function Logo() {
  return (
    <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, flexShrink: 0 }}>
      <span style={{ display: 'grid', placeItems: 'center', width: 30, height: 30, borderRadius: 9, background: 'var(--l-blue)', boxShadow: '0 4px 12px rgba(29,111,214,0.35)' }}>
        {/* connection mark: two nodes + link */}
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
          <circle cx="6.5" cy="6.5" r="3" fill="#fff" />
          <circle cx="17.5" cy="17.5" r="3" fill="#fff" fillOpacity="0.85" />
          <path d="M9 9l6 6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </span>
      <span style={{ fontFamily: 'var(--font-family-display)', fontWeight: 600, fontSize: 19, letterSpacing: '-0.02em', color: 'var(--l-ink)' }}>
        Rem<span style={{ color: 'var(--l-blue)' }}>Connect</span>
      </span>
    </Link>
  )
}

export default function LandingNav() {
  const scrolled = useScrolled(40)
  const [open, setOpen] = useState(false)

  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', justifyContent: 'center', padding: scrolled ? '12px 16px' : '20px 16px', transition: 'padding 0.35s cubic-bezier(0.16,1,0.3,1)' }}>
      <nav style={{
        width: '100%', maxWidth: 1080, display: 'flex', alignItems: 'center', gap: 8,
        height: 60, padding: '0 12px 0 18px', borderRadius: 999,
        background: scrolled ? 'rgba(255,255,255,0.78)' : 'rgba(255,255,255,0.55)',
        backdropFilter: 'blur(18px) saturate(140%)',
        WebkitBackdropFilter: 'blur(18px) saturate(140%)',
        border: '1px solid var(--l-line)',
        boxShadow: scrolled ? 'var(--l-sh-md)' : 'var(--l-sh-sm)',
        transition: 'background 0.35s, box-shadow 0.35s',
      }}>
        <Logo />

        {/* Desktop links — centered */}
        <div className="l-nav-desktop" style={{ display: 'flex', gap: 2, margin: '0 auto' }}>
          {LINKS.map(l => (
            <a key={l.label} href={l.href}
              style={{ padding: '8px 14px', borderRadius: 8, color: 'var(--l-body)', fontSize: 14, fontWeight: 600, transition: 'color 0.15s, background 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--l-ink)'; e.currentTarget.style.background = 'rgba(20,24,31,0.05)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--l-body)'; e.currentTarget.style.background = 'transparent' }}>
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="l-nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <a href={EMPLOYERS_HREF} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '8px 12px', borderRadius: 8, color: 'var(--l-body)', fontSize: 14, fontWeight: 600, transition: 'color 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--l-ink)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--l-body)' }}>
            For employers ↗
          </a>
          <a href="/apply"
            style={{ padding: '9px 20px', borderRadius: 999, background: 'var(--l-ink)', color: '#fff', fontSize: 14, fontWeight: 700, transition: 'transform 0.15s, box-shadow 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = 'var(--l-sh-md)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}>
            Apply
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(v => !v)} className="l-mobile-menu-btn" aria-label="Toggle menu"
          style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'var(--l-ink)', cursor: 'pointer', padding: 8, borderRadius: 8 }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            {open ? <><line x1="5" y1="5" x2="17" y2="17" /><line x1="17" y1="5" x2="5" y2="17" /></>
              : <><line x1="3" y1="7" x2="19" y2="7" /><line x1="3" y1="11" x2="19" y2="11" /><line x1="3" y1="15" x2="19" y2="15" /></>}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div style={{ position: 'absolute', top: 76, left: 16, right: 16, background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(20px)', border: '1px solid var(--l-line)', borderRadius: 18, boxShadow: 'var(--l-sh-lg)', padding: '10px 18px 22px' }}>
          {LINKS.map(l => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)}
              style={{ display: 'block', padding: '14px 0', color: 'var(--l-body)', fontSize: 15, fontWeight: 600, borderBottom: '1px solid var(--l-line)' }}>
              {l.label}
            </a>
          ))}
          <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
            <a href={EMPLOYERS_HREF} target="_blank" rel="noopener noreferrer" style={{ flex: 1, textAlign: 'center', padding: 12, borderRadius: 10, border: '1px solid var(--l-line-2)', color: 'var(--l-ink)', fontSize: 14, fontWeight: 600 }}>For employers ↗</a>
            <a href="/apply" style={{ flex: 1, textAlign: 'center', padding: 12, borderRadius: 10, background: 'var(--l-ink)', color: '#fff', fontWeight: 700, fontSize: 14 }}>Apply</a>
          </div>
        </div>
      )}
    </header>
  )
}
