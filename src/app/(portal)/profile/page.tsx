import { getAgentProfile } from '@/lib/data/profile'
import { ProfileHero } from '@/components/profile/ProfileHero'
import { ProfileTabs } from '@/components/profile/ProfileTabs'

export default async function ProfilePage() {
  const profile = await getAgentProfile()

  return (
    <div className="mx-auto max-w-7xl px-8 pt-7 pb-12">
      <ProfileHero profile={profile} />
      <ProfileTabs profile={profile} />
    </div>
  )
}
