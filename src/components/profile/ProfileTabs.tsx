'use client'

import { useState } from 'react'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import type { AgentProfile } from '@/types/profile'
import { ResumeImporter } from './ResumeImporter'
import { ExperienceList } from './ExperienceList'
import { ProfileSidebar } from './ProfileSidebar'

const TABS = [
  'Overview',
  'Experience',
  'Education',
  'Skills',
  'Portfolio',
  'Certifications',
] as const
type Tab = (typeof TABS)[number]

interface ProfileTabsProps {
  profile: AgentProfile
}

/** Tab navigation + content. Client component — owns the active-tab state. */
export function ProfileTabs({ profile }: ProfileTabsProps) {
  const [tab, setTab] = useState<Tab>('Overview')

  return (
    <>
      <div className="mb-6 flex gap-1 border-b border-rc-line">
        {TABS.map((t) => {
          const active = tab === t
          return (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                '-mb-px cursor-pointer rounded-t-sm border px-4 py-2 text-[13px]',
                active
                  ? 'border-rc-line border-b-white bg-white font-medium text-rc-ink'
                  : 'border-transparent font-normal text-rc-muted',
              )}
            >
              {t}
            </button>
          )
        })}
      </div>

      {tab === 'Overview' ? (
        <div className="grid grid-cols-[1fr_320px] gap-6">
          <div className="flex flex-col gap-5">
            <ResumeImporter />
            <ExperienceList experience={profile.experience} />
          </div>
          <ProfileSidebar profile={profile} />
        </div>
      ) : (
        <div className="py-[60px] text-center text-sm text-rc-muted">
          <Icon name="user" size={40} color="var(--rc-line)" />
          <div className="mt-3">{tab} content coming soon</div>
        </div>
      )}
    </>
  )
}
