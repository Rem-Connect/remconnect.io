import { Icon } from '@/components/ui/Icon'
import { Chip } from '@/components/ui/Chip'

export function AICoachCard() {
  return (
    <div style={{
      background: 'linear-gradient(180deg, #fff 0%, #f8fbff 100%)',
      border: '1px solid #e3e0d2', borderRadius: 10,
      padding: 20, boxShadow: '0 1px 2px rgba(11,18,32,0.06)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: 'linear-gradient(135deg, #1d6fd6, #7cb3f5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="spark" size={14} color="#fff" />
        </div>
        <div style={{ fontWeight: 600, fontSize: 14 }}>AI Career Coach</div>
        <Chip style={{ marginLeft: 'auto', fontSize: 10 }}>Always on</Chip>
      </div>
      <div style={{ fontSize: 13, lineHeight: 1.55, color: '#2a2f3c', marginBottom: 14 }}>
        Your empathy scores jumped <b>+12</b> this week. To hit Bench-ready by Friday, I recommend two
        quick wins: <b>product-objection drills</b> (10 min) and one <b>recorded mock call</b>.
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
        {['Why this fits', 'Show my gaps', 'Plan my week'].map(t => (
          <button key={t} style={{
            padding: '5px 10px', fontSize: 11, borderRadius: 6, border: '1px solid #e3e0d2',
            background: 'transparent', cursor: 'pointer', color: '#0b1220', fontWeight: 500,
          }}>{t}</button>
        ))}
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: 10,
        background: '#f3f1ea', borderRadius: 8,
      }}>
        <Icon name="chat" size={14} color="#5a6072" />
        <input
          placeholder="Ask about your career path…"
          style={{ flex: 1, border: 'none', background: 'transparent', fontSize: 13, outline: 'none' }}
        />
        <button style={{
          padding: '5px 10px', fontSize: 11, borderRadius: 6,
          background: '#0b1220', color: '#faf9f6', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center',
        }}>
          <Icon name="arrow-right" size={11} color="#fff" />
        </button>
      </div>
    </div>
  )
}
