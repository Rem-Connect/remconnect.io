import type { AgentProfile } from '@/types/profile'
import { AGENT_PROFILE_FIXTURE } from '@/lib/fixtures/profile'

/**
 * Data-access layer. Components call these async accessors instead of importing
 * fixtures directly. Today they return mock data; swapping in a real API (fetch +
 * `'use cache'`/`cacheLife`) later requires changing only this file.
 */
export async function getAgentProfile(): Promise<AgentProfile> {
  return AGENT_PROFILE_FIXTURE
}
