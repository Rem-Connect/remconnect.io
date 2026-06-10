import { Icon } from '@/components/ui/Icon'
import type { ProfileExperience } from '@/types/profile'

interface ExperienceListProps {
  experience: ProfileExperience[]
}

/** Presentational experience list (no client state). */
export function ExperienceList({ experience }: ExperienceListProps) {
  return (
    <div className="rounded-md border border-rc-line bg-white p-5">
      <div className="mb-3.5 text-sm font-semibold">Experience</div>
      {experience.map((e, i) => (
        <div
          key={e.title}
          className={i < experience.length - 1 ? 'mb-4 border-b border-rc-line pb-4' : ''}
        >
          <div className="flex items-start gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-rc-paper-2">
              <Icon name="briefcase" size={16} color="var(--rc-muted)" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">{e.title}</div>
              <div className="text-xs font-semibold text-rc-muted">
                {e.company} · {e.period}
              </div>
              <ul className="mt-2 list-disc pl-4 text-[13px] leading-relaxed text-rc-ink">
                {e.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
