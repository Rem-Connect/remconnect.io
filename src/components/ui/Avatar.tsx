const TONES: [string, string][] = [
  ['#1d6fd6', '#fff'],
  ['#3f6b4e', '#fff'],
  ['#4a6b8a', '#fff'],
  ['#0c3a7a', '#fff'],
  ['#0c3a7a', '#7cb3f5'],
  ['#1a2338', '#7cb3f5'],
]

interface AvatarProps {
  name?: string
  tone?: number
  size?: number
}

export function Avatar({ name = 'A', tone = 0, size = 32 }: AvatarProps) {
  const [bg, fg] = TONES[tone % TONES.length]
  const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: bg, color: fg,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.38, fontWeight: 600, fontFamily: 'var(--font-family-sans)',
      flexShrink: 0, letterSpacing: '0.02em',
    }}>
      {initials}
    </div>
  )
}
