import { AdminTopbar } from '@/components/admin/AdminTopbar'
import { AgentDirectory } from '@/components/admin/AgentDirectory'
import { getAgents } from '@/lib/data/agents'
import type { DirectoryStatus } from '@/types/admin'

const STATUSES: DirectoryStatus[] = ['ACTIVE', 'INACTIVE', 'PENDING']

function parseStatus(value: string | undefined): DirectoryStatus | undefined {
  return STATUSES.find((s) => s === value?.toUpperCase())
}

export default async function AgentDirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; page?: string }>
}) {
  const params = await searchParams
  const query = {
    q: params.q?.trim() || undefined,
    status: parseStatus(params.status),
    page: Math.max(1, Number(params.page) || 1),
  }
  const result = await getAgents(query)

  return (
    <>
      <AdminTopbar crumb="People" title="Agent directory" />
      <AgentDirectory
        agents={result.agents}
        meta={result.meta}
        query={{ q: query.q, status: query.status }}
        noAccess={result.noAccess}
        error={result.error}
      />
    </>
  )
}
