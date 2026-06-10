import Image from 'next/image'
import { Icon } from '@/components/ui/Icon'
import { ScoreRing } from '@/components/ui/ScoreRing'
import { cn } from '@/lib/cn'
import { isExternalPhoto } from '@/lib/agent-photo'
import type { SampleAgent, AgentProfileExtras } from '@/types/admin'
import { STATUS_BADGE, stealthName } from './utils'

export type ProfileView = 'internal' | 'stealth'

interface TabDef {
  id: string
  label: string
}

interface AgentProfileHeaderProps {
  agent: SampleAgent
  extras: AgentProfileExtras
  photo: string
  stealth: boolean
  tab: string
  tabs: TabDef[]
  onBack: () => void
  onStealthToggle: (view: ProfileView) => void
  onTabChange: (id: string) => void
}

export function AgentProfileHeader({
  agent,
  extras,
  photo,
  stealth,
  tab,
  tabs,
  onBack,
  onStealthToggle,
  onTabChange,
}: AgentProfileHeaderProps) {
  const statusLabel =
    agent.status === 'deployed'
      ? `Deployed → ${stealth ? '••••' : agent.client}`
      : agent.status.charAt(0).toUpperCase() + agent.status.slice(1)

  return (
    <>
      {/* Top bar */}
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex cursor-pointer items-center gap-1.5 border-none bg-transparent p-0 text-xs text-rc-muted"
        >
          <Icon name="arrow-right" size={12} style={{ transform: 'rotate(180deg)' }} />
          Back to directory
        </button>
        <div className="flex gap-0.5 rounded-[7px] bg-rc-paper-2 p-[3px]">
          {(['internal', 'stealth'] as ProfileView[]).map((v) => {
            const active = v === (stealth ? 'stealth' : 'internal')
            return (
              <button
                key={v}
                onClick={() => onStealthToggle(v)}
                className={cn(
                  'inline-flex cursor-pointer items-center gap-1.5 rounded-[5px] border-none px-3 py-[5px] text-xs font-medium',
                  active
                    ? v === 'stealth'
                      ? 'bg-rc-warn text-white'
                      : 'bg-rc-ink text-white'
                    : 'bg-transparent text-rc-muted',
                )}
              >
                <Icon
                  name={v === 'stealth' ? 'eye-off' : 'eye'}
                  size={11}
                  color={active ? '#fff' : 'var(--rc-muted)'}
                />
                {v === 'internal' ? 'Internal' : 'Stealth'}
              </button>
            )
          })}
        </div>
      </div>

      {stealth && (
        <div className="mb-3.5 flex items-center gap-2 rounded-lg border border-rc-warn/30 bg-rc-warn/5 px-3.5 py-2.5 text-xs font-medium text-rc-warn">
          <Icon name="eye-off" size={13} color="var(--rc-warn)" />
          Stealth preview — this is what clients see. PII, financials, and internal notes are
          hidden.
        </div>
      )}

      {/* Hero */}
      <div className="rounded-t-md border border-b-0 border-rc-line bg-white px-6 pt-6 pb-5">
        <div className="flex flex-wrap items-start gap-[22px]">
          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 border-rc-line">
            {isExternalPhoto(photo) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photo}
                alt={agent.name}
                width={80}
                height={80}
                className="h-full w-full object-cover"
              />
            ) : (
              <Image
                src={photo}
                alt={agent.name}
                width={80}
                height={80}
                className="h-full w-full object-cover"
              />
            )}
          </div>

          <div className="min-w-[240px] flex-1">
            <div className="font-serif text-[30px] font-normal leading-[1.15] tracking-[-0.02em]">
              {stealth ? stealthName(agent.name) : agent.name}
            </div>
            <div className="mt-[3px] text-sm text-rc-muted">{extras.headline}</div>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-rc-muted-d">
              <span>{stealth ? '•••••' : agent.id}</span>
              <span className="text-rc-line-2">·</span>
              <span>{extras.location}</span>
              <span className="text-rc-line-2">·</span>
              <span>{extras.timezone}</span>
            </div>
            <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
              <span
                className={cn(
                  'rounded-[4px] px-2.5 py-[3px] text-[11px] font-semibold',
                  STATUS_BADGE[agent.status],
                )}
              >
                {statusLabel}
              </span>
              <span className="rounded-[4px] bg-rc-paper-2 px-2.5 py-[3px] text-[11px] text-rc-muted">
                {agent.role}
              </span>
              {agent.langs.map((l) => (
                <span
                  key={l}
                  className="rounded-[3px] bg-rc-paper-2 px-[7px] py-[3px] font-mono text-[11px] text-rc-muted"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-end gap-2.5">
            {agent.score > 0 && (
              <div className="text-center">
                <ScoreRing value={agent.score} size={72} />
                <div className="mt-1 text-[10px] uppercase tracking-[0.07em] text-rc-muted">
                  Score
                </div>
              </div>
            )}
            {!stealth && (
              <div className="text-right text-[11px] text-rc-muted-d">
                <div>Started {extras.started}</div>
                {extras.deployedSince !== '—' && (
                  <div className="mt-px">Deployed {extras.deployedSince}</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tab strip (tab-strip / tab-btn classes come from network.css) */}
      <div className="border-r border-b border-l border-rc-line bg-white">
        <div className="tab-strip px-5">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => onTabChange(t.id)}
              className={`tab-btn${tab === t.id ? ' active' : ''}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
