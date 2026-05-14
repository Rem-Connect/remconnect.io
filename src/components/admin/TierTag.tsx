'use client'

import { tierColor } from '@/lib/admin-data'
import type { RiskTier } from '@/types/admin'

const LABELS: Record<RiskTier, string> = { low: 'Low', med: 'Medium', high: 'High', critical: 'Critical' }

export function TierTag({ tier }: { tier: RiskTier }) {
  const c = tierColor(tier)
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '2px 7px', borderRadius: 4, fontSize: 10, fontWeight: 600,
      textTransform: 'uppercase', letterSpacing: '0.06em',
      background: c.bg, color: c.fg, border: `1px solid ${c.border}`,
      flexShrink: 0,
    }}>
      {LABELS[tier]}
    </span>
  )
}
