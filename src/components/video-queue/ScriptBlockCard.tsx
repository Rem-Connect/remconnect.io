'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Icon } from '@/components/ui/Icon'
import type { ScriptBlock } from './data'

interface ScriptBlockCardProps {
  block: ScriptBlock
  index: number
}

/**
 * A script block — read-only by default (white surface). The agent clicks the
 * edit toggle (top-right) to make it editable and tweak details before recording.
 * `block.body` is a module-level constant, so its element reference is stable
 * across renders and React preserves in-place edits when toggling modes.
 */
export function ScriptBlockCard({ block, index }: ScriptBlockCardProps) {
  const [editing, setEditing] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!editing || !ref.current) return
    const el = ref.current
    el.focus()
    // Drop the caret at the end of the text.
    const sel = window.getSelection()
    const range = document.createRange()
    range.selectNodeContents(el)
    range.collapse(false)
    sel?.removeAllRanges()
    sel?.addRange(range)
  }, [editing])

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.08 + index * 0.06, ease: 'easeOut' }}
      className="group relative"
    >
      <div
        ref={ref}
        contentEditable={editing}
        suppressContentEditableWarning
        spellCheck={false}
        onBlur={() => setEditing(false)}
        className={`rounded-r-md border border-l-2 border-rc-line border-l-rc-blue py-3.5 pl-4 pr-24 text-[15px] leading-[1.7] text-rc-ink outline-none transition-colors ${
          editing ? 'cursor-text bg-rc-paper-2 ring-1 ring-rc-blue/40' : 'bg-white'
        }`}
      >
        {block.body}
      </div>

      {/* Top-right: block label + edit / done toggle */}
      <div className="absolute right-2.5 top-2.5 flex items-center gap-2">
        <span className="select-none text-[10px] font-semibold uppercase tracking-wider text-rc-muted-d/80">
          {block.label}
        </span>
        <motion.button
          type="button"
          // Keep the editable div focused so its blur doesn't fight the toggle.
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => setEditing((v) => !v)}
          whileTap={{ scale: 0.9 }}
          aria-label={editing ? 'Done editing' : 'Edit block'}
          title={editing ? 'Done' : 'Edit'}
          className={`inline-flex h-6 w-6 items-center justify-center rounded-sm border transition-all ${
            editing
              ? 'border-rc-blue/30 bg-rc-blue/10 text-rc-blue'
              : 'border-rc-line bg-white text-rc-muted opacity-0 group-hover:opacity-100 focus-visible:opacity-100'
          }`}
        >
          <Icon name={editing ? 'check' : 'edit'} size={13} />
        </motion.button>
      </div>
    </motion.div>
  )
}
