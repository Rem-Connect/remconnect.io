import type { Metadata } from 'next'
import './landing.css'
import LandingNav from '@/components/landing/LandingNav'
import Hero from '@/components/landing/Hero'
import RoleMarquee from '@/components/landing/RoleMarquee'
import RolesBento from '@/components/landing/RolesBento'
import HowItWorks from '@/components/landing/HowItWorks'
import ApplicationWindow from '@/components/landing/ApplicationWindow'
import WhatYouGet from '@/components/landing/WhatYouGet'
import VideoWalkthrough from '@/components/landing/VideoWalkthrough'
import SuccessStories from '@/components/landing/SuccessStories'
import MethodTrust from '@/components/landing/MethodTrust'
import Requirements from '@/components/landing/Requirements'
import FAQ from '@/components/landing/FAQ'
import FinalCTA from '@/components/landing/FinalCTA'
import LandingFooter from '@/components/landing/LandingFooter'
import LandingScripts from '@/components/landing/LandingScripts'

export const metadata: Metadata = {
  title: 'RemConnect — Build a remote support career from Ethiopia',
  description:
    'We train you, certify you, and place you on a support team at a US or international company — paid in USD or ETB, working from your own remote setup. Free to apply, free to train.',
}

export default function LandingPage() {
  return (
    <div className="lp-page">
      <LandingNav />
      <Hero />
      <RoleMarquee />
      <RolesBento />
      <HowItWorks />
      <ApplicationWindow />
      <WhatYouGet />
      <VideoWalkthrough />
      <SuccessStories />
      <MethodTrust />
      <Requirements />
      <FAQ />
      <FinalCTA />
      <LandingFooter />
      <LandingScripts />
    </div>
  )
}
