import { AdminTopbar } from '@/components/admin/AdminTopbar'
import { AgentAdminProfile } from '@/components/admin/AgentAdminProfile'
import { getSampleAgent, getAgentExtras, getNetworkAgent } from '@/lib/data/agents'

export default async function AgentProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [agent, extras, netAgent] = await Promise.all([
    getSampleAgent(id),
    getAgentExtras(id),
    getNetworkAgent(id),
  ])

  return (
    <>
      <AdminTopbar crumb="Agent directory" title="Agent profile" />
      <AgentAdminProfile agent={agent} extras={extras} netAgent={netAgent} />
    </>
  )
}
