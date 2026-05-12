interface ScoreRingProps {
  value?: number
  size?: number
  thickness?: number
  color?: string
  track?: string
  label?: boolean | string
}

export function ScoreRing({
  value = 82,
  size = 56,
  thickness = 5,
  color = 'var(--rc-blue)',
  track = 'rgba(11,18,32,0.08)',
  label = true,
}: ScoreRingProps) {
  const r = (size - thickness) / 2
  const c = 2 * Math.PI * r
  const off = c * (1 - value / 100)
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} stroke={track} strokeWidth={thickness} fill="none" />
        <circle cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth={thickness} fill="none"
          strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s' }} />
      </svg>
      {label !== false && label != null && (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          fontWeight: 600, fontSize: size * 0.28, letterSpacing: '-0.02em',
        }}>
          {value}
          {typeof label === 'string' && (
            <div style={{ fontSize: size * 0.14, fontWeight: 500, color: '#5a6072', letterSpacing: 0 }}>{label}</div>
          )}
        </div>
      )}
    </div>
  )
}
