import { AdminTopbar } from '@/components/admin/AdminTopbar'
import { RolesPage } from '@/components/admin/RolesPage'

export default function RolesAndPermissionsPage() {
  return (
    <>
      <AdminTopbar crumb="Access control" title="Roles & permissions" />
      <RolesPage />
    </>
  )
}
