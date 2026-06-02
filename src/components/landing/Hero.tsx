export default function Hero() {
  return (
    <header className="lp-hero">
      <div className="lp-hero-bg">
        <img src="/assets/team-hero.png" alt="RemConnect agents working remotely in Addis Ababa" />
      </div>
      <div className="lp-hero-grain" />
      <div className="lp-hero-reveal">
        <span className="ln" />
        <span>RemConnect · Remote support careers</span>
      </div>

      <div className="lp-hero-chip">
        <span className="av">L</span>
        <span>
          <span className="nm">Liya D.</span>
          <span className="rl" style={{ display: 'block' }}>
            Voice &amp; Written · placed
          </span>
        </span>
        <span className="qa">
          <b className="tnum">94</b>
          <small>QA score</small>
        </span>
      </div>

      <div className="lp-hero-inner">
        <div className="lp-hero-content">
          <span className="lp-hero-eyebrow">
            <span className="d" />
            Now recruiting · cohort 14 starts in 2 weeks
          </span>
          <h1 className="lp-hero-h1">
            Build a career in global support, from <em>home</em>.
          </h1>
          <p className="lp-hero-sub">
            We train you, certify you, and place you on a team at a US or international company. You&apos;re paid in USD
            or ETB, working from your own remote setup — no cold applications, no agency shuffle.
          </p>
          <div className="lp-hero-cta">
            <button className="lp-btn lp-btn-blue">
              Apply for free
              <span className="pip">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </span>
            </button>
            <a className="lp-textlink on-dark" data-scroll="video">
              Watch how it works
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </a>
          </div>
          <div className="lp-hero-trust">
            <div className="lp-hero-avs">
              <span className="a" style={{ background: 'linear-gradient(135deg,#1d6fd6,#0c3a7a)' }}>L</span>
              <span className="a" style={{ background: 'linear-gradient(135deg,#3a4a66,#1a2338)' }}>D</span>
              <span className="a" style={{ background: 'linear-gradient(135deg,#0b4fa8,#0c3a7a)' }}>H</span>
              <span className="a" style={{ background: 'var(--rc-amber)' }}>+</span>
            </div>
            <div>
              <div className="v tnum">480+</div>
              <div className="l">Agents placed</div>
            </div>
            <div>
              <div className="v">USD / ETB</div>
              <div className="l">Paid your way</div>
            </div>
            <div>
              <div className="v tnum">6 wks</div>
              <div className="l">To placement</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
