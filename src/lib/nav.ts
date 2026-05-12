import type { NavGroup } from '@/types'

export const NAV: NavGroup[] = [
  {
    group: 'Workspace',
    items: [
      { id: 'home',         label: 'Home',                icon: 'home' },
      { id: 'onboarding',   label: 'Recruit onboarding',  icon: 'clipboard', showWhen: ['recruit', 'assess'] },
      { id: 'assignment',   label: 'Current assignment',  icon: 'briefcase', showWhen: ['deployed'] },
      { id: 'opportunities',label: 'Opportunities',       icon: 'bolt', badge: 2 },
    ],
  },
  {
    group: 'Grow',
    items: [
      { id: 'training',       label: 'Training & courses', icon: 'grad-cap' },
      { id: 'roleplay',       label: 'AI role-play',       icon: 'robot' },
      { id: 'assessments',    label: 'Assessments',        icon: 'spreadsheet' },
      { id: 'performance',    label: 'Performance',        icon: 'activity', showWhen: ['deployed'] },
      { id: 'certifications', label: 'Certifications',     icon: 'award' },
    ],
  },
  {
    group: 'You',
    items: [
      { id: 'profile',          label: 'My profile',    icon: 'user' },
      { id: 'remote-setup',     label: 'Remote setup',  icon: 'home' },
      { id: 'client-onboarding',label: 'Preboarding',   icon: 'clipboard' },
      { id: 'earnings',         label: 'Earnings',      icon: 'wallet' },
      { id: 'community',        label: 'Community',     icon: 'megaphone' },
    ],
  },
  {
    group: 'Client view',
    items: [
      { id: 'client-view', label: 'View as client', icon: 'users' },
    ],
  },
]

export const ROUTE_MAP: Record<string, string> = {
  home:              '/',
  onboarding:        '/onboarding',
  assignment:        '/assignment',
  opportunities:     '/opportunities',
  training:          '/training',
  roleplay:          '/roleplay',
  assessments:       '/assessments',
  performance:       '/performance',
  certifications:    '/certifications',
  profile:           '/profile',
  'remote-setup':    '/remote-setup',
  'client-onboarding': '/preboarding',
  earnings:          '/earnings',
  community:         '/community',
  'client-view':     '/client-view',
}
