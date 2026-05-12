'use client'

import { PortalProvider } from '@/context/PortalContext'
import { AppSidebar } from '@/components/layout/AppSidebar'
import { AppTopbar } from '@/components/layout/AppTopbar'

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalProvider>
      <div style={{ display: 'flex', minHeight: '100vh', background: '#f4f4ee' }}>
        <AppSidebar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <AppTopbar />
          <main style={{ flex: 1 }}>
            {children}
          </main>
        </div>
      </div>
    </PortalProvider>
  )
}
