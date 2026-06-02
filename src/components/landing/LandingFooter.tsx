'use client'
import { EMPLOYERS_HREF } from '@/lib/landing-data'

const COLS: Record<string, { label: string; href: string; external?: boolean }[]> = {
  Jobs: [
    { label: 'Browse all jobs', href: '/jobs' },
    { label: 'Apply now', href: '/apply' },
    { label: 'How it works', href: '#how' },
  ],
  Company: [
    { label: 'About us', href: '/about' },
    { label: 'Success stories', href: '#stories' },
    { label: 'For employers ↗', href: EMPLOYERS_HREF, external: true },
    { label: 'Contact', href: 'mailto:bezamariam@remconnect.io' },
  ],
  Resources: [
    { label: 'Portal login', href: '/home' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Privacy policy', href: '/privacy' },
    { label: 'Terms of service', href: '/terms' },
  ],
}

export default function LandingFooter() {
  return (
    <footer style={{ background: 'var(--l-surface-2)', borderTop: '1px solid var(--l-line)', padding: '80px 48px 44px' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <div className="l-footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr repeat(3, 1fr)', gap: 56, marginBottom: 60 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, marginBottom: 18 }}>
              <span style={{ display: 'grid', placeItems: 'center', width: 30, height: 30, borderRadius: 9, background: 'var(--l-blue)' }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                  <circle cx="6.5" cy="6.5" r="3" fill="#fff" />
                  <circle cx="17.5" cy="17.5" r="3" fill="#fff" fillOpacity="0.85" />
                  <path d="M9 9l6 6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              </span>
              <span style={{ fontFamily: 'var(--font-family-display)', fontWeight: 600, fontSize: 20, letterSpacing: '-0.02em', color: 'var(--l-ink)' }}>
                Rem<span style={{ color: 'var(--l-blue)' }}>Connect</span>
              </span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--l-body)', margin: '0 0 22px', maxWidth: 250 }}>
              Connecting Ethiopia&apos;s top professionals to global remote opportunities.
            </p>
            <p style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: '0.06em', color: 'var(--l-faint)', textTransform: 'uppercase', margin: 0 }}>
              Addis Ababa · Ethiopia
            </p>
          </div>

          {Object.entries(COLS).map(([col, links]) => (
            <div key={col}>
              <p style={{ fontFamily: 'var(--font-family-display)', fontWeight: 600, fontSize: 13, color: 'var(--l-ink)', letterSpacing: '0.01em', margin: '0 0 20px' }}>{col}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 13 }}>
                {links.map(l => (
                  <li key={l.label}>
                    <a href={l.href} {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      style={{ fontSize: 14, color: 'var(--l-body)', transition: 'color 0.15s' }}
                      onMouseEnter={e => { e.currentTarget.style.color = 'var(--l-ink)' }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'var(--l-body)' }}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 30, borderTop: '1px solid var(--l-line)', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ margin: 0, fontSize: 12.5, color: 'var(--l-faint)' }}>&copy; 2025 RemConnect. All rights reserved.</p>
          <p style={{ margin: 0, fontSize: 12, fontWeight: 600, letterSpacing: '0.04em', color: 'var(--l-faint)' }}>Made in Ethiopia, built for the world.</p>
        </div>
      </div>
    </footer>
  )
}
