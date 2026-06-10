'use client'

import { motion } from 'motion/react'

interface StatCardProps {
  value: string
  label: string
  index?: number
}

export function StatCard({ value, label, index = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06, ease: 'easeOut' }}
      className="rounded-md border border-rc-line bg-white px-4.5 py-4 shadow-sm"
    >
      <div className="font-serif text-3xl leading-none tracking-[-0.01em] text-rc-ink">{value}</div>
      <div className="mt-1 text-[11.5px] text-rc-muted">{label}</div>
    </motion.div>
  )
}
