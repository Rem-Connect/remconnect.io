'use client'

import React, { createContext, useContext, useState } from 'react'
import type { AdminUser } from '@/types/admin'
import { ADMINS } from '@/lib/admin-data'

interface AdminContextValue {
  admins: AdminUser[]
  setAdmins: (admins: AdminUser[]) => void
  updateAdmin: (updated: AdminUser) => void
}

const AdminContext = createContext<AdminContextValue>({
  admins: ADMINS,
  setAdmins: () => {},
  updateAdmin: () => {},
})

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [admins, setAdmins] = useState<AdminUser[]>(ADMINS)

  const updateAdmin = (updated: AdminUser) => {
    setAdmins(prev => prev.map(a => a.id === updated.id ? updated : a))
  }

  return (
    <AdminContext.Provider value={{ admins, setAdmins, updateAdmin }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  return useContext(AdminContext)
}
