'use client'

import { useState } from 'react'
import { Icon } from '@/components/ui/Icon'
import { Chip } from '@/components/ui/Chip'
import { Sparkline } from '@/components/ui/Sparkline'

const FX = 170
const PAYOUTS = [
  { client: 'Northwind Retail', period: 'Apr 21–27', hours: 40, rate: 5.8,  currency: 'USD', status: 'paid' },
  { client: 'Northwind Retail', period: 'Apr 14–20', hours: 38, rate: 5.8,  currency: 'USD', status: 'paid' },
  { client: 'Apex Insurance',   period: 'Apr 7–13',  hours: 30, rate: 4.9,  currency: 'USD', status: 'paid' },
  { client: 'Lumen Telecom',    period: 'Mar 31–Apr 6', hours: 40, rate: 995, currency: 'ETB', status: 'paid' },
  { client: 'Lumen Telecom',    period: 'Mar 24–30',  hours: 40, rate: 995, currency: 'ETB', status: 'processing' },
]

function fmt(amount: number, currency: string, showIn?: string) {
  const inUSD = currency === 'USD' ? amount : amount / FX
  const inETB = currency === 'ETB' ? amount : amount * FX
  if (!showIn || showIn === currency) {
    return `${currency === 'USD' ? '$' : 'ETB '}${amount.toFixed(currency === 'USD' ? 2 : 0)}`
  }
  if (showIn === 'USD') return `$${inUSD.toFixed(2)}`
  return `ETB ${inETB.toFixed(0)}`
}

export default function EarningsPage() {
  const [display, setDisplay] = useState<'native' | 'USD' | 'ETB'>('native')

  const usdTotal = PAYOUTS.filter(p => p.currency === 'USD' && p.status === 'paid').reduce((acc, p) => acc + p.hours * p.rate, 0)
  const etbTotal = PAYOUTS.filter(p => p.currency === 'ETB' && p.status === 'paid').reduce((acc, p) => acc + p.hours * p.rate, 0)

  return (
    <div style={{ padding: '28px 32px 48px', maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-family-serif)', fontSize: 34, fontWeight: 400, letterSpacing: '-0.02em', margin: 0 }}>Earnings</h1>
          <div style={{ color: '#5a6072', fontSize: 14, marginTop: 4 }}>Payout currency is assigned by RemConnect management per engagement.</div>
        </div>
        <div style={{ display: 'flex', gap: 4, background: '#f3f1ea', padding: 4, borderRadius: 8 }}>
          {(['native', 'USD', 'ETB'] as const).map(d => (
            <button key={d} onClick={() => setDisplay(d)} style={{ padding: '6px 12px', fontSize: 12, borderRadius: 6, border: 'none', cursor: 'pointer', fontWeight: display === d ? 500 : 400, background: display === d ? '#0b1220' : 'transparent', color: display === d ? '#fff' : '#5a6072' }}>
              {d === 'native' ? 'Native' : d}
            </button>
          ))}
        </div>
      </div>

      {/* FX banner */}
      <div style={{ background: 'rgba(29,111,214,0.06)', border: '1px solid rgba(29,111,214,0.18)', borderRadius: 8, padding: '10px 16px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
        <Icon name="info" size={14} color="#1d6fd6" />
        <span>Fixed rate: <b>$1 USD = {FX} ETB</b> · Payout currency is assigned by RemConnect management, not by the client.</span>
      </div>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 12, padding: '18px 20px' }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#5a6072', marginBottom: 6 }}>USD earnings</div>
          <div style={{ fontFamily: 'var(--font-family-serif)', fontSize: 32, letterSpacing: '-0.02em' }}>${usdTotal.toFixed(2)}</div>
          <div style={{ fontSize: 11, color: '#5a6072', marginTop: 4 }}>Wise account · {(usdTotal * FX).toFixed(0)} ETB equiv.</div>
          <Sparkline data={[180, 220, 232, 248, usdTotal]} color="#1d6fd6" width={140} height={24} style={{ marginTop: 12 }} />
        </div>
        <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 12, padding: '18px 20px' }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#5a6072', marginBottom: 6 }}>ETB earnings</div>
          <div style={{ fontFamily: 'var(--font-family-serif)', fontSize: 32, letterSpacing: '-0.02em' }}>ETB {etbTotal.toFixed(0)}</div>
          <div style={{ fontSize: 11, color: '#5a6072', marginTop: 4 }}>CBE account · ${(etbTotal / FX).toFixed(2)} USD equiv.</div>
          <Sparkline data={[38000, 41000, 39800, etbTotal]} color="#3f6b4e" width={140} height={24} style={{ marginTop: 12 }} />
        </div>
        <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 12, padding: '18px 20px' }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#5a6072', marginBottom: 6 }}>Total (USD equiv.)</div>
          <div style={{ fontFamily: 'var(--font-family-serif)', fontSize: 32, letterSpacing: '-0.02em' }}>${(usdTotal + etbTotal / FX).toFixed(2)}</div>
          <div style={{ fontSize: 11, color: '#2f8d5c', marginTop: 4 }}>+12% vs last month</div>
          <Sparkline data={[350, 420, 390, 460, usdTotal + etbTotal / FX]} color="#0b1220" width={140} height={24} style={{ marginTop: 12 }} />
        </div>
      </div>

      {/* Payout history */}
      <div style={{ background: '#fff', border: '1px solid #e3e0d2', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e3e0d2', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: 'var(--font-family-serif)', fontSize: 20, letterSpacing: '-0.02em' }}>Payout history</div>
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 12px', borderRadius: 6, border: '1px solid #e3e0d2', background: 'transparent', fontSize: 12, cursor: 'pointer' }}>
            <Icon name="download" size={12} /> Export CSV
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 120px 80px 100px 100px 100px 90px', padding: '10px 20px', background: '#f3f1ea', borderBottom: '1px solid #e3e0d2', fontSize: 10, color: '#5a6072', fontWeight: 600 }}>
          <div>Client</div><div>Period</div><div>Hours</div><div>Rate</div><div>Gross</div><div>Currency</div><div>Status</div>
        </div>
        {PAYOUTS.map((p, i) => {
          const gross = p.hours * p.rate
          const displayGross = display === 'native' ? fmt(gross, p.currency) : fmt(gross, p.currency, display)
          return (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.4fr 120px 80px 100px 100px 100px 90px', padding: '14px 20px', borderBottom: i < PAYOUTS.length - 1 ? '1px solid #e3e0d2' : 'none', alignItems: 'center', fontSize: 13 }}>
              <div style={{ fontWeight: 500 }}>{p.client}</div>
              <div style={{ fontSize: 12, color: '#5a6072', fontFamily: 'monospace' }}>{p.period}</div>
              <div style={{ fontFamily: 'monospace' }}>{p.hours}h</div>
              <div style={{ fontFamily: 'monospace', fontSize: 12 }}>{p.currency === 'USD' ? `$${p.rate}/hr` : `ETB ${p.rate}/hr`}</div>
              <div style={{ fontFamily: 'monospace', fontWeight: 600 }}>{displayGross}</div>
              <Chip variant={p.currency === 'USD' ? 'default' : 'good'} style={{ fontSize: 10 }}>{p.currency}</Chip>
              <Chip variant={p.status === 'paid' ? 'good' : 'warn'} style={{ fontSize: 10 }}>{p.status}</Chip>
            </div>
          )
        })}
      </div>
    </div>
  )
}
