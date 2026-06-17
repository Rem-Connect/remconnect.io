import { AdminProvider } from '@/context/AdminContext'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { requireStaff } from '@/lib/api/session'
import { logoutAction } from './actions'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireStaff()

  return (
    <AdminProvider>
      <div className="flex min-h-screen bg-rc-paper-2">
        <AdminSidebar
          userName={session.email ?? 'Admin'}
          userRole={session.role}
          signOut={logoutAction}
        />
        <div className="flex min-w-0 flex-1 flex-col overflow-x-hidden">
          <main className="flex-1 text-rc-ink">{children}</main>
        </div>
      </div>
    </AdminProvider>
  )
}
