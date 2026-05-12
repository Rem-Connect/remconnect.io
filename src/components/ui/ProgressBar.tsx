interface ProgressBarProps {
  value: number
  variant?: 'default' | 'amber' | 'good' | 'dark'
  style?: React.CSSProperties
}

export function ProgressBar({ value, variant = 'amber', style }: ProgressBarProps) {
  return (
    <div className={`rc-bar ${variant !== 'default' ? variant : ''}`} style={style}>
      <span style={{ width: `${Math.min(100, value)}%` }} />
    </div>
  )
}
