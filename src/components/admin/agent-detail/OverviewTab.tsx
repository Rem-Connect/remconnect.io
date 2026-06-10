import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import type { SampleAgent, AgentProfileExtras } from '@/types/admin'
import { DetailCard, FieldGroupLabel, SectionTitle, StatBox } from './parts'
import { scoreColor } from './utils'

interface OverviewTabProps {
  agent: SampleAgent
  extras: AgentProfileExtras
  stealth: boolean
}

export function OverviewTab({ agent, extras, stealth }: OverviewTabProps) {
  const intakeRows = extras.intake
    ? [
        { label: 'Desired salary', value: extras.intake.desiredSalary },
        { label: 'Availability', value: extras.intake.availability },
        { label: 'Prior experience', value: extras.intake.experience },
        { label: 'Currently employed', value: extras.intake.employed },
        { label: 'Late-hours OK', value: extras.intake.lateHours },
        { label: 'Computer', value: extras.intake.device },
        { label: 'Phone', value: extras.intake.phoneModel },
        { label: 'Internet', value: extras.intake.internet },
        { label: 'Freelance', value: extras.intake.freelance },
      ].filter((r) => r.value)
    : []

  return (
    <div className={cn('grid gap-5', stealth ? 'grid-cols-1' : 'grid-cols-[1.4fr_1fr]')}>
      <div className="grid content-start gap-4">
        {/* Bio */}
        <DetailCard>
          <SectionTitle>About</SectionTitle>
          <p className="m-0 text-[13.5px] leading-[1.65] text-rc-ink-soft">{extras.pitch}</p>
          {extras.education && extras.education !== '—' && (
            <div className="mt-3.5 flex items-start gap-2 border-t border-rc-line pt-3.5">
              <Icon
                name="grad-cap"
                size={14}
                color="var(--rc-muted)"
                style={{ marginTop: 1, flexShrink: 0 }}
              />
              <span className="text-[12.5px] text-rc-muted">{extras.education}</span>
            </div>
          )}
        </DetailCard>

        {/* Intro recording */}
        {(extras.video || extras.vocaroo || extras.introUrl) && (
          <DetailCard>
            <SectionTitle>{extras.video ? 'Intro video' : 'Intro recording'}</SectionTitle>
            {extras.video ? (
              <video
                src={extras.video}
                controls
                preload="metadata"
                className="block max-h-[360px] w-full rounded-[8px] bg-black"
              />
            ) : extras.vocaroo ? (
              <>
                <iframe
                  title={`${agent.name} — intro recording`}
                  width="100%"
                  height={60}
                  src={`https://vocaroo.com/embed/${extras.vocaroo}?autoplay=0`}
                  allow="autoplay"
                  className="block rounded-[8px] border-0"
                />
                <a
                  href={`https://voca.ro/${extras.vocaroo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-rc-blue"
                >
                  View on Vocaroo <Icon name="arrow-up-right" size={12} color="var(--rc-blue)" />
                </a>
              </>
            ) : (
              <a
                href={extras.introUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-[7px] border border-rc-line px-3 py-2.5 text-[12.5px] font-semibold text-rc-blue"
              >
                <Icon name="play-circle" size={14} color="var(--rc-blue)" /> Listen to intro
                recording
              </a>
            )}
          </DetailCard>
        )}

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-2.5">
          <StatBox label="Experience" value={`${agent.years}y`} sub="total" />
          <StatBox label="Certifications" value={String(agent.certs)} sub="earned" />
          <StatBox
            label="Score"
            value={agent.score > 0 ? String(agent.score) : '—'}
            sub="overall"
            accent={agent.score > 0 ? scoreColor(agent.score) : undefined}
          />
        </div>

        {/* Languages */}
        <DetailCard>
          <FieldGroupLabel>Languages</FieldGroupLabel>
          <div className="flex flex-wrap gap-2">
            {agent.langs.map((l, idx) => (
              <div
                key={l}
                className={cn(
                  'flex items-center gap-1.5 rounded-md border px-3 py-1.5',
                  idx === 0 ? 'border-rc-blue/20 bg-rc-blue/10' : 'border-rc-line bg-rc-paper-2',
                )}
              >
                <span
                  className={cn(
                    'font-mono text-xs font-bold',
                    idx === 0 ? 'text-rc-blue' : 'text-rc-muted',
                  )}
                >
                  {l}
                </span>
                {idx === 0 && <span className="text-[10px] text-rc-blue">Primary</span>}
              </div>
            ))}
          </div>
        </DetailCard>

        {/* Top skills */}
        <DetailCard>
          <FieldGroupLabel>Top skills</FieldGroupLabel>
          <div className="flex flex-wrap gap-1.5">
            {agent.skills.slice(0, 6).map((s) => (
              <span key={s} className="rounded-[5px] bg-rc-paper-2 px-2.5 py-1 text-xs text-rc-ink">
                {s}
              </span>
            ))}
            {agent.skills.length > 6 && (
              <span className="rounded-[5px] px-2.5 py-1 text-xs text-rc-muted-d">
                +{agent.skills.length - 6} more
              </span>
            )}
          </div>
        </DetailCard>
      </div>

      {/* Right column — internal only */}
      {!stealth && (
        <div className="grid content-start gap-4">
          <DetailCard>
            <SectionTitle>Contact</SectionTitle>
            <div className="grid gap-3">
              {[
                { icon: 'mail', val: extras.email },
                { icon: 'phone', val: extras.phone },
                { icon: 'clock', val: extras.hours },
                { icon: 'globe', val: `${extras.location} · ${extras.timezone}` },
              ].map(({ icon, val }) => (
                <div key={icon} className="flex items-start gap-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-rc-paper-2">
                    <Icon name={icon} size={13} color="var(--rc-muted)" />
                  </div>
                  <span className="pt-[5px] text-[12.5px] leading-snug text-rc-ink-soft">
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </DetailCard>

          {extras.intake && (
            <DetailCard>
              <SectionTitle>Candidate intake</SectionTitle>
              <div className="grid gap-[11px]">
                {intakeRows.map((r) => (
                  <div key={r.label} className="flex items-start gap-2.5 text-[12.5px]">
                    <span className="w-[108px] shrink-0 text-rc-muted-d">{r.label}</span>
                    <span className="leading-snug text-rc-ink-soft">{r.value}</span>
                  </div>
                ))}
              </div>
              {extras.intake.cvUrl && (
                <a
                  href={extras.intake.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3.5 inline-flex items-center gap-1.5 rounded-[7px] border border-rc-line px-3 py-2 text-xs font-semibold text-rc-ink"
                >
                  <Icon name="document" size={13} color="var(--rc-muted)" /> View CV / résumé
                </a>
              )}
            </DetailCard>
          )}

          {extras.notes.length > 0 && (
            <DetailCard>
              <SectionTitle>Internal notes</SectionTitle>
              {extras.notes.map((n, i) => (
                <div key={n.when} className={cn('py-3', i && 'border-t border-rc-line')}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-rc-ink">
                        <span className="text-[9px] font-bold text-white">{n.who.charAt(0)}</span>
                      </div>
                      <span className="text-xs font-semibold">{n.who}</span>
                    </div>
                    <span className="font-mono text-[11px] text-rc-muted-d">{n.when}</span>
                  </div>
                  <div className="pl-7 text-[12.5px] leading-[1.55] text-rc-ink-soft">{n.body}</div>
                </div>
              ))}
            </DetailCard>
          )}
        </div>
      )}
    </div>
  )
}
