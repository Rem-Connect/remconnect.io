import type { SampleAgent } from '@/types/admin'
import type { NetworkStatus } from '@/types/network'

/** Status badge classes for the hero, keyed by agent status. */
export const STATUS_BADGE: Record<SampleAgent['status'], string> = {
  deployed: 'bg-rc-good/10 text-rc-good',
  bench: 'bg-rc-blue/10 text-rc-blue',
  assess: 'bg-rc-warn/10 text-rc-warn',
  recruit: 'bg-rc-muted/10 text-rc-muted',
}

/** Connection-status UI, aligned with the thresholds used on /network/agents. */
export const NET_STATUS_UI: Record<
  NetworkStatus,
  { label: string; color: string; chip: 'good' | 'warn' | 'bad'; chipLabel: string }
> = {
  healthy: {
    label: 'Connection healthy',
    color: 'var(--rc-good)',
    chip: 'good',
    chipLabel: 'Online',
  },
  warning: {
    label: 'Connection degraded',
    color: 'var(--rc-warn)',
    chip: 'warn',
    chipLabel: 'Degraded',
  },
  critical: {
    label: 'Connection unstable',
    color: 'var(--rc-bad)',
    chip: 'bad',
    chipLabel: 'At risk',
  },
}

/** Returns a token CSS variable for a metric value (used as a dynamic inline color). */
export function metricColor(v: number, good: number, warn: number, higherIsBetter = true): string {
  const ok = higherIsBetter ? v >= good : v <= good
  const mid = higherIsBetter ? v >= warn : v <= warn
  if (ok) return 'var(--rc-good)'
  if (mid) return 'var(--rc-warn)'
  return 'var(--rc-bad)'
}

/** Score → token CSS variable. */
export function scoreColor(score: number): string {
  if (score >= 90) return 'var(--rc-good)'
  if (score >= 75) return 'var(--rc-warn)'
  return 'var(--rc-bad)'
}

/** Masks a full name to "First L." form for stealth (client-facing) view. */
export function stealthName(name: string): string {
  const [first, ...rest] = name.split(' ')
  return `${first} ${rest.map((w) => `${w[0]}.`).join(' ')}`
}
