import { Icon } from '@/components/ui/Icon'
import type { SampleAgent, AgentProfileExtras } from '@/types/admin'
import { DetailCard, FieldGroupLabel } from './parts'

interface ContractTabProps {
  agent: SampleAgent
  extras: AgentProfileExtras
}

export function ContractTab({ agent, extras }: ContractTabProps) {
  const rateBreakdown = [
    {
      label: 'Agent pay',
      rate: extras.payRate,
      bar: 'bg-rc-muted',
      text: 'text-rc-muted',
      pct: 40,
    },
    {
      label: 'RemConnect margin',
      rate: extras.margin,
      bar: 'bg-rc-blue',
      text: 'text-rc-blue',
      pct: 60,
    },
  ]

  return (
    <div className="grid gap-5">
      {/* Margin highlight */}
      <DetailCard
        className="border-rc-ink-5 text-white"
        style={{ background: 'linear-gradient(135deg, var(--rc-ink), var(--rc-ink-5))' }}
      >
        <div className="flex items-center gap-7">
          <div className="text-center">
            <div className="font-mono text-[42px] font-bold leading-none text-white">
              {extras.margin}
            </div>
            <div className="mt-1 text-[11px] uppercase tracking-[0.08em] text-white/50">
              Gross margin
            </div>
          </div>
          <div className="h-[60px] w-px bg-white/10" />
          <div className="grid grid-cols-2 gap-x-7 gap-y-1.5">
            <div>
              <div className="mb-0.5 text-[10px] text-white/50">Pay rate</div>
              <div className="font-mono text-lg font-bold text-white">{extras.payRate}</div>
            </div>
            <div>
              <div className="mb-0.5 text-[10px] text-white/50">Bill rate</div>
              <div className="font-mono text-lg font-bold text-white">{extras.billRate}</div>
            </div>
            <div>
              <div className="mb-0.5 text-[10px] text-white/50">Contract</div>
              <div className="text-xs text-white/80">{extras.contractType}</div>
            </div>
            <div>
              <div className="mb-0.5 text-[10px] text-white/50">Employer</div>
              <div className="text-xs text-white/80">{extras.employer}</div>
            </div>
          </div>
        </div>
      </DetailCard>

      {/* Rate breakdown */}
      <DetailCard>
        <FieldGroupLabel>Rate breakdown</FieldGroupLabel>
        <div className="mb-4">
          {rateBreakdown.map(({ label, rate, bar, text, pct }) => (
            <div key={label} className="mb-2 flex items-center gap-3">
              <div className="w-[120px] shrink-0 text-xs text-rc-muted">{label}</div>
              <div className="h-2 flex-1 overflow-hidden rounded-[4px] bg-rc-paper-2">
                <div className={`h-full rounded-[4px] ${bar}`} style={{ width: `${pct}%` }} />
              </div>
              <div className={`w-20 shrink-0 text-right font-mono text-xs font-semibold ${text}`}>
                {rate}
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-lg bg-rc-paper-4 p-3 text-xs text-rc-muted">
          Bill rate of {extras.billRate} charged to client. Agent receives {extras.payRate}.
          Difference covers platform, benefits, and ops costs.
        </div>
      </DetailCard>

      {/* Key dates & contact */}
      <div className="grid grid-cols-2 gap-4">
        <DetailCard>
          <FieldGroupLabel>Key dates</FieldGroupLabel>
          {[
            { label: 'Started at RemConnect', value: extras.started },
            {
              label: 'Deployed since',
              value: extras.deployedSince !== '—' ? extras.deployedSince : 'Not yet deployed',
            },
            {
              label: 'Current assignment',
              value: agent.status === 'deployed' ? agent.client : 'Unassigned',
            },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex justify-between border-b border-rc-paper-2 py-[7px] text-[12.5px]"
            >
              <span className="text-rc-muted">{label}</span>
              <span className="font-medium">{value}</span>
            </div>
          ))}
        </DetailCard>
        <DetailCard>
          <FieldGroupLabel>Contact &amp; compliance</FieldGroupLabel>
          {[
            { icon: 'mail', val: extras.email },
            { icon: 'phone', val: extras.phone },
            { icon: 'clock', val: extras.hours },
          ].map(({ icon, val }) => (
            <div key={icon} className="flex items-center gap-2 border-b border-rc-paper-2 py-1.5">
              <Icon name={icon} size={13} color="var(--rc-muted)" />
              <span className="text-[12.5px]">{val}</span>
            </div>
          ))}
        </DetailCard>
      </div>
    </div>
  )
}
