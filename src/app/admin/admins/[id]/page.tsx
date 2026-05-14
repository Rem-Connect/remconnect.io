'use client'

import { use } from 'react'
import { AdminTopbar } from '@/components/admin/AdminTopbar'
import { AdminProfile } from '@/components/admin/AdminProfile'

export default function AdminProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return (
    <>
      <AdminTopbar crumb="Admin accounts" title="Admin profile" />
      <AdminProfile adminId={id} />
    </>
  )
}
