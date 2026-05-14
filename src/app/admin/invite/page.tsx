import { AdminTopbar } from '@/components/admin/AdminTopbar'
import { InviteAdmin } from '@/components/admin/InviteAdmin'

export default function InviteAdminPage() {
  return (
    <>
      <AdminTopbar crumb="Access control" title="Invite admin" />
      <InviteAdmin />
    </>
  )
}
