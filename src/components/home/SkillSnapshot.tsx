import { SkillRadar } from '@/components/ui/SkillRadar'

const AXES = [
  { k: 'English',      v: 82 },
  { k: 'Empathy',      v: 74 },
  { k: 'Product',      v: 58 },
  { k: 'Systems',      v: 66 },
  { k: 'Voice',        v: 70 },
  { k: 'Written chat', v: 88 },
]

export function SkillSnapshot() {
  return (
    <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, padding: 20, boxShadow: '0 1px 2px rgba(11,18,32,0.06)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <div style={{ fontWeight: 600, fontSize: 14 }}>Skill radar</div>
        <span style={{ fontSize: 11, color: '#5a6072', fontWeight: 600 }}>Updated today</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0' }}>
        <SkillRadar size={220} color="var(--rc-blue)" axes={AXES} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#5a6072', marginTop: 4 }}>
        <span>Composite <b style={{ color: '#0b1220' }}>74</b> / 100</span>
        <span style={{ color: '#2f8d5c' }}>+4 this week</span>
      </div>
    </div>
  )
}
