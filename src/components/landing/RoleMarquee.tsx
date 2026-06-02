import { ROLE_CATEGORIES } from '@/lib/landing-data'

// Kinetic bridge between hero and stats. The page's single marquee.
export default function RoleMarquee() {
  const words = ROLE_CATEGORIES.flatMap(r => r.examples)
  const loop = [...words, ...words]

  return (
    <div style={{
      background: 'var(--l-surface)', borderTop: '1px solid var(--l-line)', borderBottom: '1px solid var(--l-line)',
      padding: '20px 0', overflow: 'hidden', position: 'relative',
    }}>
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 160, zIndex: 2, pointerEvents: 'none', background: 'linear-gradient(to right, var(--l-surface), transparent)' }} />
      <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: 160, zIndex: 2, pointerEvents: 'none', background: 'linear-gradient(to left, var(--l-surface), transparent)' }} />

      <div className="l-marquee" style={{ display: 'flex', width: 'max-content', willChange: 'transform' }}>
        {loop.map((word, i) => (
          <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 38, paddingRight: 38 }}>
            <span style={{ fontFamily: 'var(--font-family-display)', fontWeight: 500, fontSize: 'clamp(1rem, 1.5vw, 1.3rem)', letterSpacing: '-0.01em', color: 'var(--l-ink)', whiteSpace: 'nowrap' }}>
              {word}
            </span>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--l-blue)', flexShrink: 0 }} />
          </div>
        ))}
      </div>
    </div>
  )
}
