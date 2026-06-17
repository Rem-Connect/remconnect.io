import { notFound } from 'next/navigation'
import { AdminTopbar } from '@/components/admin/AdminTopbar'
import { AgentAdminProfile } from '@/components/admin/AgentAdminProfile'
import { getAdminAgent, getNetworkAgent } from '@/lib/data/agents'

export default async function AgentProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const record = await getAdminAgent(id)
  if (!record) notFound()
  const netAgent = await getNetworkAgent(id)

  return (
    <>
      <AdminTopbar crumb="Agent directory" title="Agent profile" />
      <AgentAdminProfile agent={record.agent} extras={record.extras} netAgent={netAgent} />
    </>
  )
}
