'use client'

import { AdminProvider } from '@/context/AdminContext'
import { AdminSidebar } from '@/components/admin/AdminSidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <div style={{ display: 'flex', minHeight: '100vh', background: '#f4f2eb' }}>
        <AdminSidebar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflowX: 'hidden' }}>
          <main style={{ flex: 1 }}>
            {children}
          </main>
        </div>
      </div>
    </AdminProvider>
  )
}
