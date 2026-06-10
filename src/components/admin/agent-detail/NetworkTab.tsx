import { Icon } from '@/components/ui/Icon'
import { Chip } from '@/components/ui/Chip'
import { cn } from '@/lib/cn'
import type { AgentProfileExtras } from '@/types/admin'
import type { NetworkAgent, NetworkStatus } from '@/types/network'
import { DetailCard, FieldGroupLabel } from './parts'
import { metricColor, NET_STATUS_UI } from './utils'

interface NetworkTabProps {
  extras: AgentProfileExtras
  netAgent: NetworkAgent | undefined
  onViewNetwork: () => void
}

const BANNER: Record<NetworkStatus, { card: string; iconBg: string; text: string }> = {
  healthy: {
    card: 'border-rc-good/30 bg-rc-good/5',
    iconBg: 'bg-rc-good/15',
    text: 'text-rc-good',
  },
  warning: {
    card: 'border-rc-warn/30 bg-rc-warn/5',
    iconBg: 'bg-rc-warn/15',
    text: 'text-rc-warn',
  },
  critical: { card: 'border-rc-bad/30 bg-rc-bad/5', iconBg: 'bg-rc-bad/15', text: 'text-rc-bad' },
}

const SETUP_ITEMS = [
  { label: '2nd monitor', ok: true },
  { label: 'PC / Laptop', ok: true },
  { label: 'Router', ok: true },
  { label: 'Power bank', ok: true },
  { label: 'Proper desk', ok: true },
  { label: 'Headset', ok: true },
  { label: 'Charger', ok: true },
  { label: 'Extinguisher', ok: false },
]

export function NetworkTab({ extras, netAgent, onViewNetwork }: NetworkTabProps) {
  const ui = netAgent ? NET_STATUS_UI[netAgent.status] : null
  const banner = netAgent ? BANNER[netAgent.status] : null
  const lastSeen = netAgent
    ? netAgent.lastSeen === 0
      ? 'just now'
      : `${netAgent.lastSeen} min ago`
    : '—'

  const speedRows = netAgent
    ? [
        {
          label: 'Download',
          value: netAgent.download.toFixed(1),
          unit: 'Mbps',
          color: metricColor(netAgent.download, 25, 15, true),
        },
        {
          label: 'Upload',
          value: netAgent.upload.toFixed(1),
          unit: 'Mbps',
          color: metricColor(netAgent.upload, 15, 10, true),
        },
        {
          label: 'Latency',
          value: String(netAgent.latency),
          unit: 'ms',
          color: metricColor(netAgent.latency, 100, 200, false),
        },
        {
          label: 'Packet loss',
          value: netAgent.loss.toFixed(1),
          unit: '%',
          color: metricColor(netAgent.loss, 0.5, 2, false),
        },
      ]
    : [
        { label: 'Download', value: '—', unit: 'Mbps', color: 'var(--rc-muted-d)' },
        { label: 'Upload', value: '—', unit: 'Mbps', color: 'var(--rc-muted-d)' },
        { label: 'Latency', value: '—', unit: 'ms', color: 'var(--rc-muted-d)' },
        { label: 'Packet loss', value: '—', unit: '%', color: 'var(--rc-muted-d)' },
      ]

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="-mb-3.5 font-serif text-[19px] font-normal tracking-[-0.01em] text-rc-ink">
          Network &amp; remote setup
        </div>
        {netAgent ? (
          <button
            onClick={onViewNetwork}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-[7px] border border-rc-blue/30 bg-rc-blue/5 px-3 py-1.5 text-xs font-semibold text-rc-blue"
          >
            <Icon name="activity" size={13} color="var(--rc-blue)" />
            View full network history
            <Icon name="arrow-right" size={13} color="var(--rc-blue)" />
          </button>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-[11.5px] text-rc-muted-d">
            <Icon name="info" size={12} color="var(--rc-muted-d)" />
            Network monitoring begins after onboarding
          </span>
        )}
      </div>

      {/* Connection status banner */}
      <DetailCard
        className={cn('flex items-center gap-4', banner ? banner.card : 'border-rc-line bg-white')}
      >
        <div
          className={cn(
            'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl',
            banner ? banner.iconBg : 'bg-rc-paper-2',
          )}
        >
          <Icon name="globe" size={22} color={ui ? ui.color : 'var(--rc-muted)'} />
        </div>
        <div className="flex-1">
          <div
            className={cn(
              'mb-0.5 text-[15px] font-semibold',
              banner ? banner.text : 'text-rc-muted',
            )}
          >
            {ui ? ui.label : 'Not monitored yet'}
          </div>
          <div className="text-xs text-rc-muted">
            {netAgent
              ? `${extras.location} · ${netAgent.isp} · Last test ${lastSeen}`
              : `${extras.location} · ${extras.timezone} · Monitoring begins after onboarding`}
          </div>
        </div>
        {netAgent && ui ? (
          <Chip variant={ui.chip}>
            <Icon name={netAgent.online ? 'check' : 'info'} size={11} />{' '}
            {netAgent.online ? ui.chipLabel : 'Offline'}
          </Chip>
        ) : (
          <Chip variant="neutral">Not set up</Chip>
        )}
      </DetailCard>

      <div className="grid grid-cols-2 gap-4">
        {/* Connection details */}
        <DetailCard>
          <FieldGroupLabel>Connection details</FieldGroupLabel>
          <div className="grid gap-2.5">
            {[
              { icon: 'globe', label: 'Location', value: extras.location },
              { icon: 'clock', label: 'Timezone', value: extras.timezone },
              { icon: 'activity', label: 'Working hours', value: extras.hours },
              { icon: 'globe', label: 'ISP', value: netAgent?.isp ?? '—' },
              {
                icon: 'shield',
                label: 'VPN',
                value: netAgent ? (netAgent.vpn ? 'Detected' : 'Not active') : '—',
              },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-rc-paper-2">
                  <Icon name={icon} size={13} color="var(--rc-muted)" />
                </div>
                <div>
                  <div className="text-[10px] leading-none text-rc-muted-d">{label}</div>
                  <div className="mt-px text-[13px] font-medium">{value}</div>
                </div>
              </div>
            ))}
          </div>
        </DetailCard>

        {/* Speed test */}
        <DetailCard>
          <FieldGroupLabel>Last speed test</FieldGroupLabel>
          <div className="grid gap-3">
            {speedRows.map(({ label, value, unit, color }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-[12.5px] text-rc-muted">{label}</span>
                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-lg font-bold" style={{ color }}>
                    {value}
                  </span>
                  <span className="text-[10px] text-rc-muted-d">{unit}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3.5 border-t border-rc-paper-2 pt-2.5 text-[11px] text-rc-muted-d">
            Tested via RemConnect speed tool · Requirements: ≥10 Mbps down, &lt;200ms latency
          </div>
        </DetailCard>
      </div>

      {/* Remote setup verification */}
      <DetailCard>
        <FieldGroupLabel>Remote setup verification</FieldGroupLabel>
        <div className="grid grid-cols-4 gap-2.5">
          {SETUP_ITEMS.map(({ label, ok }) => (
            <div
              key={label}
              className={cn(
                'flex items-center gap-1.5 rounded-[7px] border px-2.5 py-2',
                ok ? 'border-rc-good/20 bg-rc-good/5' : 'border-rc-bad/15 bg-rc-bad/5',
              )}
            >
              <Icon
                name={ok ? 'check' : 'info'}
                size={12}
                color={ok ? 'var(--rc-good)' : 'var(--rc-bad)'}
              />
              <span
                className={cn(
                  'text-[11px] font-medium',
                  ok ? 'text-rc-good-deep' : 'text-rc-bad-deep',
                )}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </DetailCard>
    </div>
  )
}
