function Check() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}
function Cross() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

export default function MethodTrust() {
  return (
    <section className="lp-method" data-screen-label="Why trust us">
      <div className="lp-method-grid-bg" />
      <div className="lp-method-inner">
        <div className="lp-method-head">
          <h2 className="lp-h2 reveal">
            We only win when <em>you</em> get hired.
          </h2>
          <p className="lp-lede reveal d1" style={{ marginTop: '18px' }}>
            We don&apos;t charge agents a single birr to join. Employers pay us — so our incentive is simply to get you
            trained, placed, and thriving.
          </p>
        </div>
        <div className="lp-mbento">
          <div className="lp-mcard will-never reveal">
            <div className="lp-wn">
              <div className="lp-wn-col will">
                <div className="lp-wn-head">
                  <span className="ic">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  <h4>We will always</h4>
                </div>
                <ul>
                  <li>
                    <span className="mk">
                      <Check />
                    </span>
                    Train and certify you for free.
                  </li>
                  <li>
                    <span className="mk">
                      <Check />
                    </span>
                    Pay you in full, USD or ETB, on time.
                  </li>
                  <li>
                    <span className="mk">
                      <Check />
                    </span>
                    Give you a real contract and a coach.
                  </li>
                  <li>
                    <span className="mk">
                      <Check />
                    </span>
                    Only succeed when you stay hired.
                  </li>
                </ul>
              </div>
              <div className="lp-wn-col never">
                <div className="lp-wn-head">
                  <span className="ic">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </span>
                  <h4>We will never</h4>
                </div>
                <ul>
                  <li>
                    <span className="mk">
                      <Cross />
                    </span>
                    <span>Charge application or placement fees.</span>
                  </li>
                  <li>
                    <span className="mk">
                      <Cross />
                    </span>
                    <span>Take a cut of your monthly wage.</span>
                  </li>
                  <li>
                    <span className="mk">
                      <Cross />
                    </span>
                    <span>Sell your data or share your profile.</span>
                  </li>
                  <li>
                    <span className="mk">
                      <Cross />
                    </span>
                    <span>Leave you to chase cold applications.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="lp-mcard dark reveal d1">
            <div className="lp-mstat">
              <div className="v">
                $<span data-count="0">0</span>
              </div>
              <div className="l">Platform fees to you, ever</div>
            </div>
          </div>

          <div className="lp-mcard reveal">
            <div className="lp-mstat">
              <div className="v tnum">
                <span data-count="480">0</span>
                <span className="suf">+</span>
              </div>
              <div className="l">Professionals trained &amp; placed</div>
            </div>
          </div>

          <div className="lp-mcard will-never reveal d1">
            <div className="lp-mquote">
              <span className="qm">&quot;</span>
              <p>
                RemConnect didn&apos;t just get me a job — they built the skills that keep clients asking for me by name.
              </p>
              <div className="at">Liya D.</div>
              <div className="ar">Voice Support · with RemConnect 14 months</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
