interface WaveformProps {
  bars?: number
  color?: string
  active?: number
  height?: number
}

export function Waveform({ bars = 60, color = 'var(--rc-blue)', active = 0.5, height = 36 }: WaveformProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 2, height }}>
      {Array.from({ length: bars }).map((_, i) => {
        const h = 4 + Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.9)) * (height - 6)
        const isActive = i / bars < active
        return (
          <div key={i} style={{
            width: 2, height: h, borderRadius: 1,
            background: isActive ? color : 'rgba(11,18,32,0.15)',
            flexShrink: 0,
          }} />
        )
      })}
    </div>
  )
}
