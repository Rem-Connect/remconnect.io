import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import type { SampleAgent, AgentProfileExtras } from '@/types/admin'
import { DetailCard, FieldGroupLabel, SectionTitle } from './parts'

interface SkillsTabProps {
  agent: SampleAgent
  extras: AgentProfileExtras
}

const LANG_NAMES: Record<string, string> = {
  EN: 'English',
  AM: 'Amharic',
  OM: 'Oromo',
  TI: 'Tigrinya',
  FR: 'French',
}

export function SkillsTab({ agent, extras }: SkillsTabProps) {
  const hasEducation = Boolean(extras.education && extras.education !== '—')

  return (
    <div className="grid gap-5">
      <div className="grid grid-cols-[1.2fr_1fr] gap-4">
        <DetailCard>
          <SectionTitle>Skills</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {agent.skills.map((s, idx) => (
              <span
                key={s}
                className={cn(
                  'rounded-md px-3 py-[7px] text-[13px]',
                  idx < 3 ? 'bg-rc-ink font-medium text-white' : 'bg-rc-paper-2 text-rc-ink',
                )}
              >
                {s}
              </span>
            ))}
          </div>
          {agent.skills.length > 3 && (
            <div className="mt-2.5 text-[11px] text-rc-muted-d">
              Top 3 highlighted · {agent.skills.length} total skills
            </div>
          )}
        </DetailCard>

        <DetailCard>
          <SectionTitle>Languages</SectionTitle>
          <div className="grid gap-2.5">
            {agent.langs.map((l, idx) => (
              <div
                key={l}
                className="flex items-center justify-between rounded-lg border border-rc-line bg-rc-paper-4 px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[13px] font-bold">{l}</span>
                  <span className="text-xs text-rc-muted">{LANG_NAMES[l] ?? l}</span>
                </div>
                <span
                  className={cn(
                    'text-[11px] font-semibold',
                    idx === 0 ? 'text-rc-blue' : 'text-rc-muted-d',
                  )}
                >
                  {idx === 0 ? 'Primary' : 'Fluent'}
                </span>
              </div>
            ))}
          </div>
        </DetailCard>
      </div>

      {extras.tools.length > 0 && (
        <DetailCard>
          <SectionTitle>Tools &amp; platforms</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {extras.tools.map((t) => (
              <div
                key={t}
                className="flex items-center gap-1.5 rounded-[7px] border border-rc-blue/20 bg-rc-blue/5 px-3 py-[7px]"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-rc-blue" />
                <span className="text-[13px] font-medium text-rc-blue-ink">{t}</span>
              </div>
            ))}
          </div>
        </DetailCard>
      )}

      {hasEducation && (
        <DetailCard>
          <FieldGroupLabel>Education background</FieldGroupLabel>
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-rc-paper-2">
              <Icon name="grad-cap" size={20} color="var(--rc-muted)" />
            </div>
            <div>
              <div className="text-sm font-medium">{extras.education}</div>
              <div className="mt-0.5 text-[11.5px] text-rc-muted-d">
                Academic background · on file
              </div>
            </div>
          </div>
        </DetailCard>
      )}
    </div>
  )
}
