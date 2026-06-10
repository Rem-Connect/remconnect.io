import type { AgentProfile } from '@/types/profile'

/**
 * Mock profile fixture. This is the kind of data a real backend will eventually
 * return; it is read only through the data-access layer (`src/lib/data/profile.ts`),
 * never imported directly by components.
 */
export const AGENT_PROFILE_FIXTURE: AgentProfile = {
  agentId: 'AD-2847',
  name: 'Liya Demeke',
  title: 'Voice & Written Support · Addis Ababa',
  location: 'Addis Ababa',
  tags: ['English (Fluent)', 'De-escalation', 'Zendesk', 'Voice Support'],
  skillComposite: 74,
  skillTrend: '+4 this week',
  experience: [
    {
      title: 'Customer Support Specialist',
      company: 'Global BPO Co.',
      period: 'Jan 2024 – Present',
      bullets: [
        'Handled 80+ tickets/day with 4.8 CSAT',
        'Trained 3 new agents on Zendesk workflow',
      ],
    },
    {
      title: 'Freelance Tech Support',
      company: 'Self-employed',
      period: 'Mar 2022 – Dec 2023',
      bullets: ['Remote IT support for 15+ small businesses', 'Configured VPNs and CRM systems'],
    },
  ],
  education: [
    { school: 'Addis Ababa University', degree: 'BSc Computer Science', gpa: '3.4', year: '2022' },
  ],
  skills: [
    'English (Fluent)',
    'Spanish (Intermediate)',
    'Arabic (Basic)',
    'Amharic (Native)',
    'Zendesk',
    'Salesforce',
    'De-escalation',
    'Multi-channel support',
  ],
  certsRemconnect: [
    { title: 'Voice Support Foundation', id: 'RC-VSF-2847', date: 'Apr 2026' },
    { title: 'De-escalation Certified', id: 'RC-DEC-1204', date: 'Mar 2026' },
  ],
  certsOther: [
    { title: 'TOEFL iBT (110)', issuer: 'ETS', date: 'Jan 2023' },
    { title: 'Google CX Basics', issuer: 'Google', date: 'Aug 2022' },
  ],
  skillAxes: [
    { k: 'English', v: 82 },
    { k: 'Empathy', v: 74 },
    { k: 'Product', v: 58 },
    { k: 'Systems', v: 66 },
    { k: 'Voice', v: 70 },
    { k: 'Written', v: 88 },
  ],
  languages: [
    { name: 'English', level: 'Fluent' },
    { name: 'Spanish', level: 'Intermediate' },
    { name: 'Arabic', level: 'Basic' },
    { name: 'Amharic', level: 'Native' },
  ],
}
