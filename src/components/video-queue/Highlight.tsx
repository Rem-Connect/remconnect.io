import type { ReactNode } from 'react'

/**
 * A personalised field inside an AI-generated script — name, company, or a
 * detail the lead submitted. Visually distinguished so the agent knows exactly
 * what to verify before recording.
 */
export function Highlight({ children }: { children: ReactNode }) {
  return (
    <span className="rounded bg-rc-blue/10 px-1 font-medium text-rc-blue-deep [-webkit-box-decoration-break:clone] [box-decoration-break:clone]">
      {children}
    </span>
  )
}
