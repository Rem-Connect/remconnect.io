'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import type { AdminUser } from '@/types/admin'
import { ADMINS } from '@/lib/admin-data'

const STEALTH_KEY = 'rc-stealth'

interface AdminContextValue {
  admins: AdminUser[]
  setAdmins: (admins: AdminUser[]) => void
  updateAdmin: (updated: AdminUser) => void
  /** Client-safe "stealth" view — global so it persists across the agents directory and detail pages. */
  stealth: boolean
  setStealth: (v: boolean) => void
  toggleStealth: () => void
}

const AdminContext = createContext<AdminContextValue>({
  admins: ADMINS,
  setAdmins: () => {},
  updateAdmin: () => {},
  stealth: false,
  setStealth: () => {},
  toggleStealth: () => {},
})

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [admins, setAdmins] = useState<AdminUser[]>(ADMINS)
  const [stealth, setStealthState] = useState(false)

  // Hydrate stealth from the previous session (avoids SSR/window issues by reading after mount).
  useEffect(() => {
    try {
      if (localStorage.getItem(STEALTH_KEY) === '1') setStealthState(true)
    } catch {
      /* localStorage unavailable — ignore */
    }
  }, [])

  const setStealth = (v: boolean) => {
    setStealthState(v)
    try {
      localStorage.setItem(STEALTH_KEY, v ? '1' : '0')
    } catch {
      /* localStorage unavailable — ignore */
    }
  }

  const toggleStealth = () => setStealth(!stealth)

  const updateAdmin = (updated: AdminUser) => {
    setAdmins(prev => prev.map(a => a.id === updated.id ? updated : a))
  }

  return (
    <AdminContext.Provider value={{ admins, setAdmins, updateAdmin, stealth, setStealth, toggleStealth }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  return useContext(AdminContext)
}
