'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { LEADS } from './data'
import type { Filter } from './data'
import { QueueList } from './QueueList'
import { LeadBrief } from './LeadBrief'

/**
 * Personalised video delivery — agent video queue.
 * Two screens on a single route: the qualified-lead queue and the
 * per-lead brief + recording flow, swapped with a directional transition.
 */
export function VideoQueue() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [filter, setFilter] = useState<Filter>('all')

  const selected = LEADS.find((l) => l.id === selectedId) ?? null

  return (
    <div className="mx-auto max-w-[1000px] px-8 pb-14 pt-7 font-sans text-rc-ink">
      <AnimatePresence mode="wait" initial={false}>
        {selected ? (
          <motion.div
            key="brief"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
          >
            <LeadBrief lead={selected} onBack={() => setSelectedId(null)} />
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
          >
            <QueueList filter={filter} setFilter={setFilter} onOpen={setSelectedId} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
