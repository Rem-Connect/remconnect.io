import type { Metadata } from 'next'
import LandingNav from '@/components/landing/LandingNav'
import Hero from '@/components/landing/Hero'
import RoleMarquee from '@/components/landing/RoleMarquee'
import StatsBar from '@/components/landing/StatsBar'
import RoleSalaries from '@/components/landing/RoleSalaries'
import HowItWorks from '@/components/landing/HowItWorks'
import OpenRoles from '@/components/landing/OpenRoles'
import WhatYouGet from '@/components/landing/WhatYouGet'
import VideoWalkthrough from '@/components/landing/VideoWalkthrough'
import SuccessStories from '@/components/landing/SuccessStories'
import Legitimacy from '@/components/landing/Legitimacy'
import Requirements from '@/components/landing/Requirements'
import FAQ from '@/components/landing/FAQ'
import FinalCTA from '@/components/landing/FinalCTA'
import LandingFooter from '@/components/landing/LandingFooter'

export const metadata: Metadata = {
  title: 'RemConnect — Remote work for Ethiopian professionals',
  description:
    "Apply free to remote roles with companies around the world. RemConnect connects Ethiopia's top professionals to global opportunities — vetted, fair, and fee-free.",
}

export default function LandingPage() {
  return (
    <main className="landing-root" style={{ overflowX: 'hidden', width: '100%', maxWidth: '100%' }}>
      <LandingNav />
      <Hero />
      <RoleMarquee />
      <StatsBar />
      <RoleSalaries />
      <HowItWorks />
      <OpenRoles />
      <WhatYouGet />
      <VideoWalkthrough />
      <SuccessStories />
      <Legitimacy />
      <Requirements />
      <FAQ />
      <FinalCTA />
      <LandingFooter />
    </main>
  )
}
