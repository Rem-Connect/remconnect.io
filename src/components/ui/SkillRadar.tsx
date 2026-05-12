'use client'

interface Axis {
  k: string
  v: number
}

interface SkillRadarProps {
  axes?: Axis[]
  size?: number
  color?: string
  fillOpacity?: number
}

export function SkillRadar({ axes = [], size = 220, color = 'var(--rc-blue)', fillOpacity = 0.18 }: SkillRadarProps) {
  const cx = size / 2
  const cy = size / 2
  const r = size / 2 - 22
  const n = axes.length
  const rings = [0.25, 0.5, 0.75, 1]

  const coord = (i: number, radius: number): [number, number] => {
    const a = -Math.PI / 2 + (i / n) * Math.PI * 2
    return [cx + Math.cos(a) * radius, cy + Math.sin(a) * radius]
  }

  const points = axes.map((ax, i) => coord(i, r * (ax.v / 100)))
  const polyPts = points.map(p => p.map(x => x.toFixed(1)).join(',')).join(' ')

  return (
    <svg width={size} height={size} style={{ display: 'block' }}>
      {rings.map((ring, i) => {
        const pts = Array.from({ length: n }, (_, j) => coord(j, r * ring))
        const s = pts.map(p => p.map(x => x.toFixed(1)).join(',')).join(' ')
        return <polygon key={i} points={s} fill="none" stroke="rgba(11,18,32,0.08)" strokeWidth="1" />
      })}
      {axes.map((_, i) => {
        const [x, y] = coord(i, r)
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(11,18,32,0.08)" strokeWidth="1" />
      })}
      <polygon points={polyPts} fill={color} fillOpacity={fillOpacity} stroke={color} strokeWidth="1.5" />
      {points.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="3" fill={color} />)}
      {axes.map((ax, i) => {
        const [x, y] = coord(i, r + 14)
        return (
          <text key={i} x={x} y={y} fontSize="10" textAnchor="middle" dominantBaseline="middle"
            fontFamily="Inter" fill="#5a6072">
            {ax.k}
          </text>
        )
      })}
    </svg>
  )
}
