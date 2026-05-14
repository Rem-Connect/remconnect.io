import { AdminTopbar } from '@/components/admin/AdminTopbar'
import { AgentDirectory } from '@/components/admin/AgentDirectory'

export default function AgentDirectoryPage() {
  return (
    <>
      <AdminTopbar crumb="People" title="Agent directory" />
      <AgentDirectory />
    </>
  )
}
