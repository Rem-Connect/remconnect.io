function Check() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

export default function Requirements() {
  return (
    <section className="lp-section" id="requirements" data-screen-label="Requirements">
      <div className="lp-reqs">
        <div>
          <div className="lp-index reveal">
            <span>05</span>
            <span className="ln" />
            <b>Before you apply</b>
          </div>
          <h2 className="lp-h2 reveal d1" style={{ fontSize: 'clamp(34px,4.2vw,52px)' }}>
            What you&apos;ll need to get started.
          </h2>
          <p className="lp-lede reveal d2" style={{ marginTop: '18px' }}>
            A short checklist. Don&apos;t tick every box yet? Apply anyway — we review every profile, and some gaps we
            help you close during training.
          </p>
          <button className="lp-btn lp-btn-dark reveal d3" style={{ marginTop: '28px' }}>
            Start my application
            <span className="pip">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        </div>
        <div className="lp-req-list">
          <div className="lp-req">
            <span className="check">
              <Check />
            </span>
            <div className="rtext">
              <h4>Reliable internet</h4>
              <p>A stable connection — 10 Mbps+ recommended.</p>
            </div>
          </div>
          <div className="lp-req">
            <span className="check">
              <Check />
            </span>
            <div className="rtext">
              <h4>A quiet workspace</h4>
              <p>Somewhere you can take calls without background noise.</p>
            </div>
          </div>
          <div className="lp-req">
            <span className="check">
              <Check />
            </span>
            <div className="rtext">
              <h4>A laptop or desktop</h4>
              <p>Windows or Mac, with a working headset and webcam.</p>
            </div>
          </div>
          <div className="lp-req">
            <span className="check">
              <Check />
            </span>
            <div className="rtext">
              <h4>Conversational English</h4>
              <p>Comfortable speaking and writing — we test and coach this.</p>
            </div>
          </div>
          <div className="lp-req">
            <span className="check">
              <Check />
            </span>
            <div className="rtext">
              <h4>~40 hrs / week availability</h4>
              <p>Most placements are full-time; some roles offer part-time.</p>
            </div>
            <span className="opt">Flexible</span>
          </div>
          <div className="lp-req">
            <span className="check">
              <Check />
            </span>
            <div className="rtext">
              <h4>Valid government ID</h4>
              <p>For verification and contracting once you&apos;re placed.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
