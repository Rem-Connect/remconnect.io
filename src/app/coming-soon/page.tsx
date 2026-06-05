import type { Metadata } from 'next'
import ComingSoon from './ComingSoon'

export const metadata: Metadata = {
  title: 'RemConnect — Coming Soon',
  description:
    'RemConnect trains, certifies and places remote support agents on global teams. Something great is on the way.',
  robots: { index: false, follow: false },
}

export default function ComingSoonPage() {
  return <ComingSoon />
}
