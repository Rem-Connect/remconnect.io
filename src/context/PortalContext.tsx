'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import type { AgentStatus } from '@/types'

interface PortalContextValue {
  status: AgentStatus
  setStatus: (s: AgentStatus) => void
  acceptedClient: string
  setAcceptedClient: (c: string) => void
}

const PortalContext = createContext<PortalContextValue>({
  status: 'recruit',
  setStatus: () => {},
  acceptedClient: '',
  setAcceptedClient: () => {},
})

export function PortalProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatusState] = useState<AgentStatus>('recruit')
  const [acceptedClient, setAcceptedClientState] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('rc-status') as AgentStatus
    if (saved) setStatusState(saved)
    const client = localStorage.getItem('rc-accepted-client') || ''
    setAcceptedClientState(client)
  }, [])

  const setStatus = (s: AgentStatus) => {
    setStatusState(s)
    localStorage.setItem('rc-status', s)
  }

  const setAcceptedClient = (c: string) => {
    setAcceptedClientState(c)
    localStorage.setItem('rc-accepted-client', c)
  }

  return (
    <PortalContext.Provider value={{ status, setStatus, acceptedClient, setAcceptedClient }}>
      {children}
    </PortalContext.Provider>
  )
}

export function usePortal() {
  return useContext(PortalContext)
}
