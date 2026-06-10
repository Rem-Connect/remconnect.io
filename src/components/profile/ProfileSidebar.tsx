import { Icon } from '@/components/ui/Icon'
import { Chip } from '@/components/ui/Chip'
import { SkillRadar } from '@/components/ui/SkillRadar'
import type { AgentProfile } from '@/types/profile'

interface ProfileSidebarProps {
  profile: AgentProfile
}

/** Presentational right-hand sidebar: skill radar, languages, certifications. */
export function ProfileSidebar({ profile }: ProfileSidebarProps) {
  return (
    <div className="flex flex-col gap-4">
      <section className="rounded-md border border-rc-line bg-white p-[18px]">
        <div className="mb-2.5 text-sm font-semibold">Skill radar</div>
        <SkillRadar size={200} color="var(--rc-blue)" axes={profile.skillAxes} />
      </section>

      <section className="rounded-md border border-rc-line bg-white p-[18px]">
        <div className="mb-2.5 text-sm font-semibold">Languages</div>
        {profile.languages.map((lang, i) => (
          <div
            key={lang.name}
            className={`flex items-center justify-between py-[5px] text-[13px] ${
              i < profile.languages.length - 1 ? 'border-b border-rc-line' : ''
            }`}
          >
            <span>{lang.name}</span>
            <Chip className="text-[10px]">{lang.level}</Chip>
          </div>
        ))}
      </section>

      <section className="rounded-md border border-rc-line bg-white p-[18px]">
        <div className="mb-2.5 text-sm font-semibold">Certifications</div>
        <div className="mb-2 text-[11px] font-semibold text-rc-muted">RemConnect</div>
        {profile.certsRemconnect.map((c) => (
          <div key={c.id} className="flex items-center gap-2 py-1.5">
            <Icon name="award" size={14} color="var(--rc-blue)" />
            <div className="flex-1 text-xs">{c.title}</div>
            <Chip variant="good" className="text-[10px]">
              ✓
            </Chip>
          </div>
        ))}
        <div className="mt-2.5 mb-2 text-[11px] font-semibold text-rc-muted">Other</div>
        {profile.certsOther.map((c) => (
          <div key={c.title} className="flex items-center gap-2 py-1.5">
            <Icon name="award" size={14} color="var(--rc-muted)" />
            <div className="flex-1 text-xs">{c.title}</div>
            <Chip variant="neutral" className="text-[10px]">
              From resume
            </Chip>
          </div>
        ))}
      </section>
    </div>
  )
}
