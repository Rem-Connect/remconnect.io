import { AdminTopbar } from '@/components/admin/AdminTopbar'
import { AuditLog } from '@/components/admin/AuditLog'

export default function AuditLogPage() {
  return (
    <>
      <AdminTopbar crumb="Overview" title="Audit log" />
      <AuditLog />
    </>
  )
}
