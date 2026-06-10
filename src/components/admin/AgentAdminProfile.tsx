'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/context/AdminContext'
import { getAgentPhoto } from '@/lib/agent-photo'
import type { SampleAgent, AgentProfileExtras } from '@/types/admin'
import type { NetworkAgent } from '@/types/network'
import { AgentProfileHeader, type ProfileView } from './agent-detail/AgentProfileHeader'
import { OverviewTab } from './agent-detail/OverviewTab'
import { PerformanceTab } from './agent-detail/PerformanceTab'
import { NetworkTab } from './agent-detail/NetworkTab'
import { WorkHistoryTab } from './agent-detail/WorkHistoryTab'
import { CertificationsTab } from './agent-detail/CertificationsTab'
import { SkillsTab } from './agent-detail/SkillsTab'
import { ContractTab } from './agent-detail/ContractTab'
import '@/app/network.css'

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'performance', label: 'Performance' },
  { id: 'network', label: 'Network' },
  { id: 'history', label: 'Work History' },
  { id: 'certs', label: 'Certifications' },
  { id: 'skills', label: 'Skills & Tools' },
  { id: 'contract', label: 'Contract & Finance' },
]

interface AgentAdminProfileProps {
  agent: SampleAgent | undefined
  extras: AgentProfileExtras
  netAgent: NetworkAgent | undefined
}

export function AgentAdminProfile({ agent, extras, netAgent }: AgentAdminProfileProps) {
  const router = useRouter()
  const { stealth, setStealth } = useAdmin()
  const [tab, setTab] = useState('overview')

  if (!agent) {
    return <div className="p-[60px] text-center text-rc-muted">Agent not found.</div>
  }

  const photo = extras.photo || agent.photo || getAgentPhoto(agent.id, 200)
  const visibleTabs = TABS.filter((t) => !(stealth && t.id === 'contract'))

  const handleStealthToggle = (view: ProfileView) => {
    setStealth(view === 'stealth')
    if (view === 'stealth' && tab === 'contract') setTab('overview')
  }

  return (
    <div className="net-scope mx-auto max-w-[1180px] px-8 pt-6 pb-14">
      <AgentProfileHeader
        agent={agent}
        extras={extras}
        photo={photo}
        stealth={stealth}
        tab={tab}
        tabs={visibleTabs}
        onBack={() => router.push('/admin/agents')}
        onStealthToggle={handleStealthToggle}
        onTabChange={setTab}
      />

      <div className="rounded-b-md border border-t-0 border-rc-line bg-rc-paper p-6">
        {tab === 'overview' && <OverviewTab agent={agent} extras={extras} stealth={stealth} />}
        {tab === 'performance' && <PerformanceTab agent={agent} extras={extras} />}
        {tab === 'network' && (
          <NetworkTab
            extras={extras}
            netAgent={netAgent}
            onViewNetwork={() => router.push(`/admin/network/agents/${agent.id}`)}
          />
        )}
        {tab === 'history' && <WorkHistoryTab agent={agent} extras={extras} />}
        {tab === 'certs' && <CertificationsTab agent={agent} extras={extras} />}
        {tab === 'skills' && <SkillsTab agent={agent} extras={extras} />}
        {tab === 'contract' && !stealth && <ContractTab agent={agent} extras={extras} />}
      </div>
    </div>
  )
}
