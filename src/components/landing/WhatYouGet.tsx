import { LANDING_FEATURE_AGENT } from '@/lib/landing-data'

export default function WhatYouGet() {
  const f = LANDING_FEATURE_AGENT
  return (
    <section className="lp-section tight" id="why" data-screen-label="What you get">
      <div className="lp-getgrid">
        <div>
          <div className="lp-index reveal">
            <span>03</span>
            <span className="ln" />
            <b>What you get</b>
          </div>
          <h2 className="lp-h2 reveal d1" style={{ fontSize: 'clamp(36px,4.4vw,56px)' }}>
            More than a job. A profile that <em>follows you.</em>
          </h2>
          <div className="lp-benefits">
            <div className="lp-benefit reveal d1">
              <div className="bic">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <path d="m3 7 9-4 9 4-9 4-9-4Z" />
                  <path d="M7 9v5c0 1.5 2.5 3 5 3s5-1.5 5-3V9" />
                  <path d="M21 7v6" />
                </svg>
              </div>
              <div>
                <h4>Free training &amp; certification</h4>
                <p>The full curriculum at no cost. Certifications carry across every placement you take.</p>
              </div>
            </div>
            <div className="lp-benefit reveal d2">
              <div className="bic">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              </div>
              <div>
                <h4>Real pay, your currency</h4>
                <p>Competitive monthly pay in USD or ETB, on time, with no agency cut taken from your wage.</p>
              </div>
            </div>
            <div className="lp-benefit reveal d3">
              <div className="bic">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <path d="M9 12l2 2 4-4" />
                  <path d="M12 3 4 6v6c0 5 3.5 7.5 8 9 4.5-1.5 8-4 8-9V6Z" />
                </svg>
              </div>
              <div>
                <h4>Coaching &amp; a growing portfolio</h4>
                <p>Monthly QA reviews, a coach in your corner, and a transparent profile that grows from client to client.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lp-profile-stage reveal d2">
          <div className="lp-profile-glow" />
          <div className="lp-profile">
            <div className="lp-profile-top">
              <span className="lp-profile-chip">
                <span className="d" />
                {f.statusLine}
              </span>
              <div className="lp-profile-id">{f.idTag}</div>
              <div className="lp-profile-av">
                <img src={f.photo} alt={f.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit', display: 'block' }} />
              </div>
            </div>
            <div className="lp-profile-body">
              <div className="lp-profile-name">{f.name}</div>
              <div className="lp-profile-role">{f.role}</div>
              <div className="lp-profile-meta">
                {f.chips.map((c) => (
                  <span key={c.label} className={`rc-chip${c.good ? ' rc-chip-good' : ''}`}>{c.label}</span>
                ))}
              </div>
              <div className="lp-profile-skills">
                {f.skills.map((s) => (
                  <div className="lp-cs" key={s.l}>
                    <span className="lp-cs-l">{s.l}</span>
                    <span className="lp-cs-bar" data-skill={s.v}>
                      <span />
                    </span>
                    <span className="lp-cs-v tnum">{s.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
