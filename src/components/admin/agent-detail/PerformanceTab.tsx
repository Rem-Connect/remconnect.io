import { Icon } from '@/components/ui/Icon'
import { Chip } from '@/components/ui/Chip'
import { ScoreRing } from '@/components/ui/ScoreRing'
import type { SampleAgent, AgentProfileExtras } from '@/types/admin'
import { DetailCard, FieldGroupLabel, SectionTitle, StatBox } from './parts'

interface PerformanceTabProps {
  agent: SampleAgent
  extras: AgentProfileExtras
}

function barColor(pct: number): string {
  if (pct >= 85) return 'var(--rc-good)'
  if (pct >= 70) return 'var(--rc-warn)'
  return 'var(--rc-bad)'
}

export function PerformanceTab({ agent, extras }: PerformanceTabProps) {
  const hasPerf = extras.qa > 0 || extras.csat !== null || extras.aht !== null

  const breakdown = [
    { label: 'Quality (QA)', pct: extras.qa || 0 },
    { label: 'Customer satisfaction', pct: extras.csat ? Math.round((extras.csat / 5) * 100) : 0 },
    { label: 'Certifications', pct: Math.min(100, agent.certs * 20) },
    { label: 'Experience', pct: Math.min(100, agent.years * 20) },
  ]

  return (
    <div className="grid gap-5">
      <div className="flex items-center justify-between">
        <SectionTitle>Performance overview</SectionTitle>
        {agent.score >= 90 ? (
          <Chip variant="good">
            <Icon name="award" size={11} /> Top performer
          </Chip>
        ) : agent.score >= 75 ? (
          <Chip variant="neutral">Strong performer</Chip>
        ) : agent.score > 0 ? (
          <Chip variant="neutral">Developing</Chip>
        ) : (
          <Chip variant="neutral">Not yet assessed</Chip>
        )}
      </div>

      {agent.score > 0 && (
        <DetailCard
          className="flex items-center gap-7"
          style={{ background: 'linear-gradient(135deg, #f4f7fc, #fff)' }}
        >
          <div className="shrink-0 text-center">
            <ScoreRing value={agent.score} size={90} />
            <div className="mt-1.5 text-[10px] uppercase tracking-[0.07em] text-rc-muted">
              Overall score
            </div>
          </div>
          <div className="flex-1">
            <div className="mb-3 text-[13px] text-rc-muted">
              Score reflects QA, CSAT, adherence, and certifications weighted by role.
            </div>
            {breakdown.map(({ label, pct }) => (
              <div key={label} className="mb-2">
                <div className="mb-[3px] flex justify-between text-[11px] text-rc-muted">
                  <span>{label}</span>
                  <span className="font-mono font-semibold">{pct > 0 ? `${pct}%` : '—'}</span>
                </div>
                <div className="h-[5px] overflow-hidden rounded-[3px] bg-rc-line">
                  <div
                    className="h-full rounded-[3px] transition-[width] duration-[400ms]"
                    style={{ width: `${pct}%`, background: barColor(pct) }}
                  />
                </div>
              </div>
            ))}
          </div>
        </DetailCard>
      )}

      <div className="grid grid-cols-4 gap-3">
        <StatBox
          label="QA score"
          value={extras.qa ? `${extras.qa}%` : '—'}
          sub={
            extras.qa >= 90
              ? 'Excellent'
              : extras.qa >= 75
                ? 'Good'
                : extras.qa > 0
                  ? 'Needs work'
                  : 'No data'
          }
          accent={
            extras.qa >= 90 ? 'var(--rc-good)' : extras.qa >= 75 ? 'var(--rc-warn)' : undefined
          }
        />
        <StatBox
          label="CSAT"
          value={extras.csat ? `${extras.csat} / 5` : '—'}
          sub={extras.csat ? 'avg customer rating' : 'No data yet'}
          accent={extras.csat && extras.csat >= 4.5 ? 'var(--rc-good)' : undefined}
        />
        <StatBox label="Avg handle time" value={extras.aht || '—'} sub="per contact" />
        <StatBox
          label="Experience"
          value={`${agent.years}y`}
          sub={agent.years >= 4 ? 'Senior' : agent.years >= 2 ? 'Mid-level' : 'Junior'}
        />
      </div>

      {!hasPerf && (
        <DetailCard className="bg-rc-paper-4 px-6 py-8 text-center">
          <Icon name="activity" size={28} color="var(--rc-line-2)" />
          <div className="mt-3 text-sm font-medium text-rc-muted">No performance data yet</div>
          <div className="mt-1 text-xs text-rc-muted-d">
            Metrics will appear once the agent is deployed and has completed their first QA review.
          </div>
        </DetailCard>
      )}

      <div className="grid grid-cols-2 gap-4">
        <DetailCard>
          <FieldGroupLabel>Role &amp; deployment</FieldGroupLabel>
          <div className="grid gap-2">
            {[
              { label: 'Current role', value: agent.role },
              {
                label: 'Status',
                value: agent.status.charAt(0).toUpperCase() + agent.status.slice(1),
              },
              { label: 'Client', value: agent.status === 'deployed' ? agent.client : 'Unassigned' },
              { label: 'Certifications', value: `${agent.certs} earned` },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex justify-between border-b border-rc-paper-2 py-1 text-[12.5px]"
              >
                <span className="text-rc-muted">{label}</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
        </DetailCard>
        <DetailCard>
          <FieldGroupLabel>Core strengths</FieldGroupLabel>
          <div className="flex flex-wrap gap-1.5">
            {agent.skills.slice(0, 4).map((s) => (
              <span
                key={s}
                className="rounded-[5px] border border-rc-good/20 bg-rc-good/10 px-2.5 py-1.5 text-xs text-rc-good-deep"
              >
                {s}
              </span>
            ))}
            {agent.langs.map((l) => (
              <span
                key={l}
                className="rounded-[5px] border border-rc-blue/20 bg-rc-blue/10 px-2.5 py-1.5 font-mono text-xs text-rc-blue-ink"
              >
                {l}
              </span>
            ))}
          </div>
        </DetailCard>
      </div>
    </div>
  )
}
