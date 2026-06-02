export default function HowItWorks() {
  return (
    <div className="lp-band lp-band-blue">
      <section className="lp-section" id="how" data-screen-label="How it works">
        <div style={{ maxWidth: '760px', marginBottom: '48px' }}>
          <div className="lp-index reveal">
            <span>02</span>
            <span className="ln" />
            <b>The method</b>
          </div>
          <h2 className="lp-h2 reveal d1">Apply, train, get&nbsp;placed.</h2>
          <p className="lp-lede reveal d2" style={{ marginTop: '20px' }}>
            You bring the drive and the English; we build everything around that. Structured training, real coaching,
            and a placement waiting on the other side.
          </p>
        </div>
        <div className="lp-timeline">
          <div className="lp-tstep">
            <div className="lp-tnode">01</div>
            <div className="tag">Apply in 10 minutes</div>
            <h3>Upload your resume</h3>
            <p>
              Our AI scans your resume and auto-fills your profile. Take a short English and voice assessment — no
              upfront interview.
            </p>
          </div>
          <div className="lp-tstep">
            <div className="lp-tnode">02</div>
            <div className="tag">Train &amp; get certified</div>
            <h3>Learn the craft</h3>
            <p>
              Complete the curriculum — voice, written, de-escalation, tools — and earn certifications that carry to
              every assignment.
            </p>
          </div>
          <div className="lp-tstep">
            <div className="lp-tnode">03</div>
            <div className="tag">Start your first shift</div>
            <h3>Get placed with a client</h3>
            <p>
              Once you&apos;re bench-ready, opportunities land in your portal. Accept one, preboarding unlocks, and you
              go live in days.
            </p>
            <a className="lp-textlink" data-scroll="contact">
              Start your application
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
