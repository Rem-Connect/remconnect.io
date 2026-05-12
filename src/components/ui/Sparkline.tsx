import { CSSProperties } from 'react'

interface SparklineProps {
  data?: number[]
  color?: string
  width?: number
  height?: number
  fill?: boolean
  style?: CSSProperties
}

export function Sparkline({ data = [], color = 'var(--rc-blue)', width = 120, height = 28, fill = true, style }: SparklineProps) {
  if (!data.length) return null
  const max = Math.max(...data)
  const min = Math.min(...data)
  const span = max - min || 1
  const pts = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((d - min) / span) * (height - 4) - 2
    return [x, y]
  })
  const path = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ')
  const fillPath = `${path} L ${width} ${height} L 0 ${height} Z`
  return (
    <svg width={width} height={height} style={{ display: 'block', ...style }}>
      {fill && <path d={fillPath} fill={color} opacity={0.12} />}
      <path d={path} stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
