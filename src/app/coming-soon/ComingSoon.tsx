'use client'

import { useEffect, useState } from 'react'

// Placeholder launch date — 3 months from the current project date (2026-06-05).
const LAUNCH_DATE = new Date('2026-09-05T09:00:00Z')

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number }

function getTimeLeft(): TimeLeft {
  const diff = Math.max(0, LAUNCH_DATE.getTime() - Date.now())
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

const pad = (n: number) => String(n).padStart(2, '0')

export default function ComingSoon() {
  // Null until mounted so server and client render identically (no hydration mismatch).
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    setTimeLeft(getTimeLeft())
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    // Not wired to a backend — just acknowledge locally.
    console.log('Notify request:', email)
    setSubmitted(true)
  }

  const units: [string, number][] = timeLeft
    ? [
        ['Days', timeLeft.days],
        ['Hours', timeLeft.hours],
        ['Minutes', timeLeft.minutes],
        ['Seconds', timeLeft.seconds],
      ]
    : [
        ['Days', 0],
        ['Hours', 0],
        ['Minutes', 0],
        ['Seconds', 0],
      ]

  return (
    <main className="cs-root">
      <style>{CS_STYLES}</style>

      {/* Ambient floating background shapes */}
      <div className="cs-bg" aria-hidden="true">
        <span className="cs-blob cs-blob-1" />
        <span className="cs-blob cs-blob-2" />
        <span className="cs-blob cs-blob-3" />
        <span className="cs-grid" />
      </div>

      <section className="cs-content">
        <div className="cs-badge cs-in cs-d1">
          <span className="cs-dot" />
          RemConnect · launching soon
        </div>

        {/* Brand */}
        <div className="cs-brand cs-in cs-d2">
          <span className="cs-logo">
            <span className="cs-logo-glow" />
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M5.5 5.5a9 9 0 0 0 0 13M18.5 5.5a9 9 0 0 1 0 13M3 12h2M19 12h2" />
            </svg>
          </span>
          <span className="cs-wordmark">
            Rem<span className="cs-word-accent">Connect</span>
          </span>
        </div>

        <h1 className="cs-headline cs-in cs-d3">
          We&apos;re building
          <br />
          <span className="cs-headline-accent">something great.</span>
        </h1>

        <p className="cs-sub cs-in cs-d4">
          The platform that trains, certifies and places remote support agents on
          global teams — paid in USD, working from their own setup. A new way to
          build a career from home is almost here.
        </p>

        {/* Countdown */}
        <div className="cs-countdown cs-in cs-d5" role="timer" aria-label="Time until launch">
          {units.map(([label, value]) => (
            <div className="cs-unit" key={label}>
              <span className="cs-unit-num">{pad(value)}</span>
              <span className="cs-unit-label">{label}</span>
            </div>
          ))}
        </div>

        {/* Email capture */}
        <div className="cs-capture cs-in cs-d6">
          {submitted ? (
            <p className="cs-thanks" role="status">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              Thanks — we&apos;ll let you know the moment we launch.
            </p>
          ) : (
            <form className="cs-form" onSubmit={handleSubmit} noValidate>
              <input
                className="cs-input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                aria-label="Email address"
              />
              <button className="cs-btn" type="submit">
                Notify me
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="cs-footer cs-in cs-d7">
        © 2025 RemConnect. All rights reserved.
      </footer>
    </main>
  )
}

const CS_STYLES = `
.cs-root {
  position: relative;
  min-height: 100dvh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px 28px;
  background:
    radial-gradient(120% 120% at 50% -10%, #16223c 0%, #0b1220 55%, #070b15 100%);
  color: #faf9f6;
  font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
  text-align: center;
}

/* ── Background ── */
.cs-bg { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
.cs-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(70px);
  opacity: 0.55;
  will-change: transform;
}
.cs-blob-1 {
  width: 460px; height: 460px;
  top: -120px; left: -100px;
  background: radial-gradient(circle, #1d6fd6 0%, rgba(29,111,214,0) 70%);
  animation: cs-float 13s ease-in-out infinite;
}
.cs-blob-2 {
  width: 540px; height: 540px;
  bottom: -180px; right: -140px;
  background: radial-gradient(circle, #0b4fa8 0%, rgba(11,79,168,0) 70%);
  animation: cs-float 17s ease-in-out infinite reverse;
}
.cs-blob-3 {
  width: 320px; height: 320px;
  top: 40%; left: 55%;
  background: radial-gradient(circle, #7cb3f5 0%, rgba(124,179,245,0) 70%);
  opacity: 0.3;
  animation: cs-float 11s ease-in-out infinite;
}
.cs-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(124,179,245,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(124,179,245,0.05) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(circle at 50% 40%, #000 0%, transparent 72%);
  -webkit-mask-image: radial-gradient(circle at 50% 40%, #000 0%, transparent 72%);
}

@keyframes cs-float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50%      { transform: translate(28px, -34px) scale(1.06); }
}

/* ── Content ── */
.cs-content {
  position: relative;
  z-index: 1;
  max-width: 720px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cs-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 14px;
  border-radius: 999px;
  border: 1px solid rgba(124,179,245,0.22);
  background: rgba(124,179,245,0.06);
  color: #b8cdf0;
  font-size: 12.5px;
  font-weight: 500;
  letter-spacing: 0.02em;
  margin-bottom: 30px;
}
.cs-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: #4ad07f;
  box-shadow: 0 0 0 0 rgba(74,208,127,0.55);
  animation: cs-ping 1.8s ease-out infinite;
}
@keyframes cs-ping {
  0%   { box-shadow: 0 0 0 0 rgba(74,208,127,0.5); }
  70%  { box-shadow: 0 0 0 9px rgba(74,208,127,0); }
  100% { box-shadow: 0 0 0 0 rgba(74,208,127,0); }
}

.cs-brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 26px;
}
.cs-logo {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 50px; height: 50px;
  border-radius: 14px;
  background: linear-gradient(150deg, #1d6fd6, #0b4fa8);
  color: #fff;
  box-shadow: 0 10px 30px rgba(29,111,214,0.4);
}
.cs-logo-glow {
  position: absolute; inset: -6px;
  border-radius: 18px;
  background: radial-gradient(circle, rgba(29,111,214,0.7), transparent 70%);
  z-index: -1;
  animation: cs-pulse-glow 2.6s ease-in-out infinite;
}
@keyframes cs-pulse-glow {
  0%, 100% { opacity: 0.45; transform: scale(0.92); }
  50%      { opacity: 0.9;  transform: scale(1.12); }
}
.cs-wordmark {
  font-family: "Syne", ui-sans-serif, system-ui, sans-serif;
  font-weight: 800;
  font-size: 30px;
  letter-spacing: -0.01em;
}
.cs-word-accent { color: #7cb3f5; }

.cs-headline {
  font-family: "Syne", ui-sans-serif, system-ui, sans-serif;
  font-weight: 800;
  font-size: clamp(38px, 8vw, 70px);
  line-height: 1.02;
  letter-spacing: -0.02em;
  margin: 0 0 22px;
}
.cs-headline-accent {
  background: linear-gradient(100deg, #7cb3f5 0%, #1d6fd6 50%, #b8cdf0 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.cs-sub {
  max-width: 540px;
  font-size: clamp(15px, 2.4vw, 17px);
  line-height: 1.6;
  color: #9fb0cc;
  margin: 0 0 40px;
}

/* ── Countdown ── */
.cs-countdown {
  display: flex;
  gap: 12px;
  margin-bottom: 40px;
}
.cs-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  min-width: 78px;
  padding: 16px 10px;
  border-radius: 16px;
  border: 1px solid rgba(124,179,245,0.14);
  background: rgba(18,26,43,0.6);
  backdrop-filter: blur(8px);
}
.cs-unit-num {
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: clamp(26px, 5vw, 34px);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: #fff;
  line-height: 1;
}
.cs-unit-label {
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #7d8aac;
}

/* ── Email capture ── */
.cs-capture { width: 100%; max-width: 440px; min-height: 52px; }
.cs-form {
  display: flex;
  gap: 8px;
  padding: 6px;
  border-radius: 14px;
  border: 1px solid rgba(124,179,245,0.18);
  background: rgba(18,26,43,0.6);
  backdrop-filter: blur(8px);
}
.cs-input {
  flex: 1;
  min-width: 0;
  border: none;
  background: transparent;
  color: #faf9f6;
  font-size: 15px;
  padding: 0 14px;
  outline: none;
}
.cs-input::placeholder { color: #6b7a96; }
.cs-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  border: none;
  border-radius: 10px;
  padding: 12px 20px;
  font-size: 14.5px;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(150deg, #1d6fd6, #0b4fa8);
  box-shadow: 0 8px 22px rgba(29,111,214,0.35);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  white-space: nowrap;
}
.cs-btn:hover { transform: translateY(-1px); box-shadow: 0 12px 28px rgba(29,111,214,0.45); }
.cs-btn:active { transform: translateY(0); }

.cs-thanks {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  margin: 0;
  padding: 14px 18px;
  border-radius: 14px;
  border: 1px solid rgba(74,208,127,0.3);
  background: rgba(74,208,127,0.08);
  color: #8fe3b1;
  font-size: 14.5px;
  font-weight: 500;
}

/* ── Footer ── */
.cs-footer {
  position: relative;
  z-index: 1;
  margin-top: 56px;
  font-size: 12.5px;
  color: #5d6a85;
  letter-spacing: 0.02em;
}

/* ── Entrance animation ── */
.cs-in { opacity: 0; animation: cs-rise 0.7s cubic-bezier(0.16,1,0.3,1) both; }
@keyframes cs-rise {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
.cs-d1 { animation-delay: 60ms; }
.cs-d2 { animation-delay: 150ms; }
.cs-d3 { animation-delay: 240ms; }
.cs-d4 { animation-delay: 340ms; }
.cs-d5 { animation-delay: 440ms; }
.cs-d6 { animation-delay: 540ms; }
.cs-d7 { animation-delay: 660ms; }

/* ── Responsive ── */
@media (max-width: 520px) {
  .cs-countdown { gap: 8px; }
  .cs-unit { min-width: 0; flex: 1; padding: 14px 4px; }
  .cs-form { flex-direction: column; }
  .cs-input { padding: 12px 14px; text-align: center; }
  .cs-btn { justify-content: center; padding: 13px 20px; }
}

@media (prefers-reduced-motion: reduce) {
  .cs-blob, .cs-logo-glow, .cs-dot { animation: none !important; }
  .cs-in { animation: none !important; opacity: 1 !important; transform: none !important; }
}
`
