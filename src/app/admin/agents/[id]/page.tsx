'use client'

import { use } from 'react'
import { AdminTopbar } from '@/components/admin/AdminTopbar'
import { AgentAdminProfile } from '@/components/admin/AgentAdminProfile'

export default function AgentProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return (
    <>
      <AdminTopbar crumb="Agent directory" title="Agent profile" />
      <AgentAdminProfile agentId={id} />
    </>
  )
}
