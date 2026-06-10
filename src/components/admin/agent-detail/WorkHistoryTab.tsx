import { cn } from '@/lib/cn'
import type { SampleAgent, AgentProfileExtras } from '@/types/admin'
import { DetailCard, SectionTitle, StatBox } from './parts'

interface WorkHistoryTabProps {
  agent: SampleAgent
  extras: AgentProfileExtras
}

export function WorkHistoryTab({ agent, extras }: WorkHistoryTabProps) {
  const isActive = extras.history.some((h) => h.current)

  return (
    <div className="grid gap-5">
      <div className="grid grid-cols-3 gap-3">
        <StatBox label="Total experience" value={`${agent.years}y`} sub="across all roles" />
        <StatBox label="Positions" value={String(extras.history.length)} sub="listed" />
        <StatBox
          label="Current"
          value={isActive ? 'Active' : 'Available'}
          sub={agent.status === 'deployed' ? `at ${agent.client}` : 'on bench'}
          accent={agent.status === 'deployed' ? 'var(--rc-good)' : 'var(--rc-blue)'}
        />
      </div>

      <DetailCard>
        <SectionTitle>Experience timeline</SectionTitle>
        <div className="relative">
          {extras.history.map((h, i) => {
            const last = i === extras.history.length - 1
            return (
              <div
                key={`${h.co}-${h.when}`}
                className={cn('relative flex gap-[18px]', !last && 'pb-6')}
              >
                <div className="flex shrink-0 flex-col items-center">
                  <div
                    className={cn(
                      'z-[1] mt-1 h-3 w-3 rounded-full border-2',
                      h.current ? 'border-rc-blue bg-rc-blue' : 'border-rc-line-2 bg-rc-line-2',
                    )}
                  />
                  {!last && <div className="mt-1 w-0.5 flex-1 bg-rc-line" />}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-1.5">
                    <div>
                      <div className="text-[14.5px] font-semibold text-rc-ink">{h.role}</div>
                      <div className="mt-0.5 text-[13px] text-rc-muted">{h.co}</div>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5">
                      {h.current && (
                        <span className="rounded-[4px] bg-rc-blue/10 px-2 py-0.5 text-[10px] font-semibold text-rc-blue">
                          Current
                        </span>
                      )}
                      <span className="rounded-[4px] bg-rc-paper-2 px-2 py-[3px] font-mono text-[11px] text-rc-muted-d">
                        {h.when}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </DetailCard>
    </div>
  )
}
