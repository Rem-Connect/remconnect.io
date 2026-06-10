import type { SampleAgent, AgentProfileExtras } from '@/types/admin'
import type { NetworkAgent } from '@/types/network'
import { SAMPLE_AGENTS, AGENT_EXTRAS } from '@/lib/admin-data'
import { NET_AGENTS } from '@/lib/network-data'

/**
 * Data-access layer for admin agents. Components read agents through these async
 * accessors instead of importing the mock modules directly; swapping in a real API
 * later means changing only this file.
 */

export async function getSampleAgent(id: string): Promise<SampleAgent | undefined> {
  return SAMPLE_AGENTS.find((a) => a.id === id)
}

export async function getAgentExtras(id: string): Promise<AgentProfileExtras> {
  return AGENT_EXTRAS[id] ?? AGENT_EXTRAS['__default']
}

export async function getNetworkAgent(id: string): Promise<NetworkAgent | undefined> {
  return NET_AGENTS.find((n) => n.id === id)
}
