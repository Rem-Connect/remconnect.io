import type { ReactNode } from 'react'
import { Highlight } from './Highlight'

export type Urgency = 'urgent' | 'new'
export type Filter = 'all' | 'urgent' | 'new'

export interface ScriptBlock {
  label: string
  /** JSX so personalised <Highlight> fields can be rendered inline. */
  body: ReactNode
}

export interface Lead {
  id: string
  name: string
  first: string
  company: string
  role: string
  industry: string
  teamSize: string
  budget: string
  timeline: string
  submitted: string
  urgency: Urgency
  tone: number
  script: ScriptBlock[]
}

export interface Stat {
  value: string
  label: string
}

export const STATS: Stat[] = [
  { value: '12', label: 'Pending recordings' },
  { value: '38', label: 'Sent this week' },
  { value: '64%', label: 'Watch rate' },
]

export const LEADS: Lead[] = [
  {
    id: 'maya',
    name: 'Maya Okonkwo',
    first: 'Maya',
    company: 'Lumen Logistics',
    role: 'Head of operations',
    industry: 'Logistics',
    teamSize: '35–50',
    budget: '$80k–120k',
    timeline: 'This quarter',
    submitted: '12 min ago',
    urgency: 'urgent',
    tone: 0,
    script: [
      {
        label: '01 · Opening',
        body: (
          <>
            Hi <Highlight>Maya</Highlight>, quick personal note from me at RemConnect — saw your
            team at <Highlight>Lumen Logistics</Highlight> just expanded into the Nairobi corridor,
            congrats on the move.
          </>
        ),
      },
      {
        label: '02 · Hook',
        body: (
          <>
            You mentioned on the form that{' '}
            <Highlight>turnover on your night-shift dispatch team has crept past 30%</Highlight> —
            that&apos;s the exact pattern we&apos;ve helped three other ops leads stabilise in under
            a quarter, without lifting base pay.
          </>
        ),
      },
      {
        label: '03 · Ask',
        body: (
          <>
            I put together a 4-minute breakdown of how we&apos;d approach it for a team your size —{' '}
            <Highlight>35–50 dispatchers</Highlight>. If it lands, grab any 20 minutes on my
            calendar this week and I&apos;ll walk you through the playbook.
          </>
        ),
      },
    ],
  },
  {
    id: 'arjun',
    name: 'Arjun Shrestha',
    first: 'Arjun',
    company: 'Northwind Care',
    role: 'VP people',
    industry: 'Healthcare',
    teamSize: '120+',
    budget: '$200k+',
    timeline: 'Next 30 days',
    submitted: '42 min ago',
    urgency: 'urgent',
    tone: 1,
    script: [
      {
        label: '01 · Opening',
        body: (
          <>
            Hi <Highlight>Arjun</Highlight>, recording this just for you — I saw{' '}
            <Highlight>Northwind Care</Highlight> is opening a second patient-intake centre, which
            is a big lift to take on at once.
          </>
        ),
      },
      {
        label: '02 · Hook',
        body: (
          <>
            On the form you flagged that{' '}
            <Highlight>
              you&apos;re scaling bilingual support and patient-intake simultaneously
            </Highlight>{' '}
            — that double-ramp is exactly where staffing usually breaks, and where we&apos;re
            strongest.
          </>
        ),
      },
      {
        label: '03 · Ask',
        body: (
          <>
            Here&apos;s a short look at how we&apos;d phase{' '}
            <Highlight>120 agents across two shifts</Highlight> without compliance gaps. Worth a
            20-minute call this week?
          </>
        ),
      },
    ],
  },
  {
    id: 'priya',
    name: 'Priya Ramanathan',
    first: 'Priya',
    company: 'Atlas Fintech',
    role: 'Founder',
    industry: 'Fintech',
    teamSize: '10–25',
    budget: '$40k–70k',
    timeline: 'Q4 launch',
    submitted: '3 hr ago',
    urgency: 'new',
    tone: 2,
    script: [
      {
        label: '01 · Opening',
        body: (
          <>
            Hi <Highlight>Priya</Highlight>, congrats on getting{' '}
            <Highlight>Atlas Fintech</Highlight> to launch readiness — recording this personally so
            it isn&apos;t just another templated reply.
          </>
        ),
      },
      {
        label: '02 · Hook',
        body: (
          <>
            You told us{' '}
            <Highlight>you need licensed customer-success agents for a Q4 launch</Highlight> — we
            keep a bench of finance-vetted agents precisely for launch windows like yours.
          </>
        ),
      },
      {
        label: '03 · Ask',
        body: (
          <>
            This clip shows how we&apos;d stand up <Highlight>15–20 agents to start</Highlight> and
            scale from there. Grab 20 minutes and I&apos;ll map it to your launch date.
          </>
        ),
      },
    ],
  },
  {
    id: 'tomas',
    name: 'Tomas Bergström',
    first: 'Tomas',
    company: 'Klippa Retail',
    role: 'COO',
    industry: 'Retail',
    teamSize: '25–40',
    budget: '$60k–90k',
    timeline: 'Before peak season',
    submitted: 'Yesterday',
    urgency: 'new',
    tone: 3,
    script: [
      {
        label: '01 · Opening',
        body: (
          <>
            Hi <Highlight>Tomas</Highlight>, quick note from RemConnect — I gather the last peak at{' '}
            <Highlight>Klippa Retail</Highlight> was a rough one for the service team.
          </>
        ),
      },
      {
        label: '02 · Hook',
        body: (
          <>
            You wrote that{' '}
            <Highlight>the holiday surge stretched your service team past breaking point</Highlight>{' '}
            — seasonal ramps are exactly what our flexible bench is built for.
          </>
        ),
      },
      {
        label: '03 · Ask',
        body: (
          <>
            Here&apos;s how we&apos;d cover <Highlight>25 agents, seasonal</Highlight> without you
            carrying the cost year-round. Worth 20 minutes before the next peak?
          </>
        ),
      },
    ],
  },
]
