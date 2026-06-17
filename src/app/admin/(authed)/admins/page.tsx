'use client'

import { useAdmin } from '@/context/AdminContext'
import { AdminTopbar } from '@/components/admin/AdminTopbar'
import { AdminAccounts } from '@/components/admin/AdminAccounts'

export default function AdminAccountsPage() {
  const { admins } = useAdmin()
  return (
    <>
      <AdminTopbar crumb="Access control" title="Admin accounts" />
      <AdminAccounts admins={admins} />
    </>
  )
}
