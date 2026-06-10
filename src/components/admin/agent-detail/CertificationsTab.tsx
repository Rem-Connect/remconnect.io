import { Icon } from '@/components/ui/Icon'
import type { SampleAgent, AgentProfileExtras } from '@/types/admin'
import { DetailCard, FieldGroupLabel, StatBox } from './parts'

interface CertificationsTabProps {
  agent: SampleAgent
  extras: AgentProfileExtras
}

export function CertificationsTab({ agent, extras }: CertificationsTabProps) {
  const hasEducation = Boolean(extras.education && extras.education !== '—')

  return (
    <div className="grid gap-5">
      <div className="grid grid-cols-3 gap-3">
        <StatBox
          label="Total certs"
          value={String(agent.certs)}
          sub="RemConnect verified"
          accent={agent.certs >= 4 ? 'var(--rc-good)' : undefined}
        />
        <StatBox
          label="Status"
          value={
            agent.certs >= 4
              ? 'Fully certified'
              : agent.certs >= 2
                ? 'In progress'
                : 'Getting started'
          }
          sub=""
        />
        <StatBox
          label="Education"
          value={hasEducation ? '✓' : '—'}
          sub={hasEducation ? 'degree on file' : 'none on file'}
        />
      </div>

      {agent.certs === 0 ? (
        <DetailCard className="bg-rc-paper-4 px-6 py-10 text-center">
          <Icon name="award" size={32} color="var(--rc-line-2)" />
          <div className="mt-3.5 text-[15px] font-medium text-rc-muted">No certifications yet</div>
          <div className="mx-auto mt-2 max-w-[340px] text-[12.5px] text-rc-muted-d">
            Certifications are earned by completing RemConnect training modules and passing
            assessments.
          </div>
        </DetailCard>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {extras.certifications.map((c) => (
            <div
              key={c.t}
              className="flex items-start gap-3.5 rounded-md border border-rc-line bg-white p-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-rc-good/20 bg-rc-good/10">
                <Icon name="award" size={18} color="var(--rc-good)" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[13.5px] font-semibold text-rc-ink">{c.t}</div>
                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  <span className="rounded-[3px] bg-rc-good/10 px-[7px] py-0.5 text-[10px] font-semibold text-rc-good">
                    RemConnect verified
                  </span>
                  <span className="font-mono text-[11px] text-rc-muted-d">{c.d}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {hasEducation && (
        <DetailCard>
          <FieldGroupLabel>Education</FieldGroupLabel>
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-rc-paper-2">
              <Icon name="grad-cap" size={18} color="var(--rc-muted)" />
            </div>
            <div>
              <div className="text-[13.5px] font-medium text-rc-ink">{extras.education}</div>
              <div className="mt-[3px] text-[11.5px] text-rc-muted-d">On file · unverified</div>
            </div>
          </div>
        </DetailCard>
      )}
    </div>
  )
}
