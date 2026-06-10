'use client'

import { useState } from 'react'
import { Icon } from '@/components/ui/Icon'
import { Chip } from '@/components/ui/Chip'

type ResumeState = 'idle' | 'parsing' | 'done'

const EXTRACTED_FIELDS = [
  { field: 'School', value: 'Addis Ababa University', confidence: 97 },
  { field: 'Degree', value: 'BSc Computer Science', confidence: 94 },
  { field: 'GPA (optional)', value: '3.4', confidence: 91 },
  {
    field: 'Skills',
    value: 'Zendesk, Salesforce, English, Spanish, Arabic, Amharic',
    confidence: 88,
  },
  { field: 'Experience', value: '2 roles extracted', confidence: 92 },
  { field: 'Certifications', value: 'TOEFL, Google CX', confidence: 85 },
]

function confidenceVariant(confidence: number) {
  if (confidence >= 90) return 'good' as const
  if (confidence >= 70) return 'warn' as const
  return 'bad' as const
}

/** Interactive resume-import widget (simulated parse). Client component. */
export function ResumeImporter() {
  const [state, setState] = useState<ResumeState>('idle')
  const [progress, setProgress] = useState(0)

  const simulateParse = () => {
    setState('parsing')
    setProgress(0)
    const tick = () => {
      setProgress((p) => {
        if (p >= 100) {
          setState('done')
          return 100
        }
        setTimeout(tick, 60)
        return p + 4
      })
    }
    tick()
  }

  return (
    <div className="rounded-md border border-rc-line bg-white p-5">
      <div className="mb-3.5 flex items-center gap-2">
        <Icon name="upload" size={16} color="var(--rc-blue)" />
        <div className="text-sm font-semibold">Resume import</div>
        <Chip className="ml-auto text-[10px]">AI-powered</Chip>
      </div>

      {state === 'idle' && (
        <button
          type="button"
          onClick={simulateParse}
          className="flex w-full cursor-pointer items-center gap-3.5 rounded-md border-[1.5px] border-dashed border-rc-line bg-rc-paper-2 p-5 text-left transition-colors hover:border-rc-blue hover:bg-rc-blue/5"
        >
          <div
            className="flex h-12 w-12 items-center justify-center rounded-md"
            style={{ background: 'linear-gradient(135deg, var(--rc-blue), var(--rc-blue-soft))' }}
          >
            <Icon name="upload" size={22} color="#fff" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold">Upload your resume (PDF or DOCX)</div>
            <div className="mt-0.5 text-xs text-rc-muted">
              AI will auto-fill education, experience, skills, and certifications.
            </div>
          </div>
          <span className="rounded-sm bg-rc-ink px-3.5 py-[9px] text-[13px] font-medium text-rc-paper">
            Choose file
          </span>
        </button>
      )}

      {state === 'parsing' && (
        <div className="rounded-md border border-rc-line bg-white p-[18px]">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-rc-blue/10">
              <Icon name="bolt" size={16} color="var(--rc-blue)" />
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-medium">Parsing resume…</div>
              <div className="mt-0.5 text-[11px] text-rc-muted">
                Extracting education · experience · skills · certifications
              </div>
            </div>
            <div className="font-mono text-xs text-rc-blue">{progress}%</div>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-rc-paper-2">
            <div
              className="h-full transition-[width] duration-150"
              // Width is driven by state — dynamic value, inline per the styling standard.
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, var(--rc-blue), var(--rc-blue-soft))',
              }}
            />
          </div>
        </div>
      )}

      {state === 'done' && (
        <div className="rounded-md border border-rc-line bg-rc-paper-2 p-4">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-rc-good">
              <Icon name="check" size={14} color="#fff" />
            </div>
            <div className="text-sm font-semibold">Resume parsed</div>
            <Chip variant="good" className="ml-auto text-[10px]">
              6 fields extracted
            </Chip>
          </div>
          {EXTRACTED_FIELDS.map((f) => (
            <div
              key={f.field}
              className="flex items-center gap-2.5 border-b border-rc-line py-1.5 text-[13px]"
            >
              <div className="w-[120px] text-[11px] font-semibold text-rc-muted">{f.field}</div>
              <div className="flex-1">{f.value}</div>
              <Chip variant={confidenceVariant(f.confidence)} className="text-[10px]">
                {f.confidence}%
              </Chip>
            </div>
          ))}
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => setState('idle')}
              className="cursor-pointer rounded-sm border border-rc-line bg-transparent px-3 py-[7px] text-xs font-medium"
            >
              Replace file
            </button>
            <button
              type="button"
              className="flex-1 cursor-pointer rounded-sm bg-rc-ink px-3 py-[7px] text-xs font-medium text-rc-paper"
            >
              Approve &amp; apply to profile
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
