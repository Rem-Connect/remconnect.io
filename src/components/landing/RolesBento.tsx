function LevelIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M4 20V10M10 20V4M16 20v-7M22 20v-3" />
    </svg>
  )
}

export default function RolesBento() {
  return (
    <div className="lp-band lp-band-warm">
      <section className="lp-section" id="salaries" data-screen-label="Roles">
        <div style={{ maxWidth: '760px', marginBottom: '48px' }}>
          <div className="lp-index reveal">
            <span>01</span>
            <span className="ln" />
            <b>Is there a role for you?</b>
          </div>
          <h2 className="lp-h2 reveal d1">
            Real roles, real <em>growth.</em>
          </h2>
          <p className="lp-lede reveal d2" style={{ marginTop: '20px' }}>
            Six support disciplines, all fully remote. Each is a genuine career path — with training, coaching and a
            clear way up. Pick the one that fits how you like to work.
          </p>
        </div>

        <div className="lp-roles-bento">
          {/* Feature */}
          <article className="lp-role feature reveal">
            <div className="lp-role-head">
              <span className="lp-role-icon big">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 14v-3a9 9 0 0 1 18 0v3" />
                  <rect x="2.5" y="14" width="5" height="7" rx="1.6" />
                  <rect x="16.5" y="14" width="5" height="7" rx="1.6" />
                  <path d="M21 18v1a3 3 0 0 1-3 3h-4" />
                </svg>
              </span>
              <span className="lp-role-tag">
                <span className="d" />
                Most placements
              </span>
            </div>
            <h3>Customer Support</h3>
            <p>
              Front-line help across chat, email and phone for consumer brands. The most common first placement and the
              broadest path into the field.
            </p>
            <div className="lp-role-chips">
              <span className="lp-role-chip">Live chat</span>
              <span className="lp-role-chip">Email</span>
              <span className="lp-role-chip">Phone</span>
              <span className="lp-role-chip">De-escalation</span>
            </div>
            <div className="lp-role-foot">
              <div className="lp-role-level">
                <span className="ll">
                  <LevelIcon />
                  Entry-friendly · no experience needed
                </span>
                <div className="lp-role-band" data-fill="34">
                  <span />
                </div>
              </div>
              <span className="lp-role-demand">
                <span className="d" />
                In demand
              </span>
            </div>
            <div className="lp-role-stack group">
              <img
                className="bg lp-img"
                src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Support team at work"
              />
              <img
                className="ov lp-img"
                src="https://images.pexels.com/photos/256150/pexels-photo-256150.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Support console interface"
              />
            </div>
          </article>

          {/* Small cards */}
          <article className="lp-role reveal">
            <div className="lp-role-head">
              <span className="lp-role-icon">
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.7 6.3a4 4 0 0 0-5.66 5.66l-6.3 6.3a1.5 1.5 0 0 0 0 2.12l.88.88a1.5 1.5 0 0 0 2.12 0l6.3-6.3a4 4 0 0 0 5.66-5.66l-2.47 2.47-2.83-2.83 2.6-2.6Z" />
                </svg>
              </span>
              <span className="lp-role-num">02</span>
            </div>
            <h3>Technical Support</h3>
            <p>Troubleshoot software and hardware for SaaS and telecom clients.</p>
            <div className="lp-role-chips">
              <span className="lp-role-chip">Troubleshooting</span>
              <span className="lp-role-chip">SaaS</span>
              <span className="lp-role-chip">Telecom</span>
            </div>
            <div className="lp-role-foot">
              <div className="lp-role-level">
                <span className="ll">
                  <LevelIcon />
                  Intermediate
                </span>
                <div className="lp-role-band" data-fill="62">
                  <span />
                </div>
              </div>
              <span className="lp-role-demand">
                <span className="d" />
                In demand
              </span>
            </div>
          </article>

          <article className="lp-role reveal d1">
            <div className="lp-role-head">
              <span className="lp-role-icon">
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4.5" width="18" height="16.5" rx="2" />
                  <path d="M8 2.5v4M16 2.5v4M3 10h18M8 14h4M8 17.5h7" />
                </svg>
              </span>
              <span className="lp-role-num">03</span>
            </div>
            <h3>Virtual Assistant</h3>
            <p>Inbox, scheduling, research and admin support for busy teams.</p>
            <div className="lp-role-chips">
              <span className="lp-role-chip">Inbox</span>
              <span className="lp-role-chip">Scheduling</span>
              <span className="lp-role-chip">Research</span>
            </div>
            <div className="lp-role-foot">
              <div className="lp-role-level">
                <span className="ll">
                  <LevelIcon />
                  Entry-friendly
                </span>
                <div className="lp-role-band" data-fill="38">
                  <span />
                </div>
              </div>
              <span className="lp-role-demand">
                <span className="d" style={{ background: 'var(--rc-warn)' }} />
                <span style={{ color: 'var(--rc-warn)' }}>Steady</span>
              </span>
            </div>
          </article>

          <article className="lp-role reveal">
            <div className="lp-role-head">
              <span className="lp-role-icon">
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17l6-6 4 4 8-8" />
                  <path d="M21 7v5h-5" />
                </svg>
              </span>
              <span className="lp-role-num">04</span>
            </div>
            <h3>Sales Development</h3>
            <p>Outbound outreach, lead qualification and CRM hygiene for B2B.</p>
            <div className="lp-role-chips">
              <span className="lp-role-chip">Outreach</span>
              <span className="lp-role-chip">CRM</span>
              <span className="lp-role-chip">Qualification</span>
            </div>
            <div className="lp-role-foot">
              <div className="lp-role-level">
                <span className="ll">
                  <LevelIcon />
                  Intermediate
                </span>
                <div className="lp-role-band" data-fill="58">
                  <span />
                </div>
              </div>
              <span className="lp-role-demand">
                <span className="d" />
                Growing
              </span>
            </div>
          </article>

          <article className="lp-role reveal d1">
            <div className="lp-role-head">
              <span className="lp-role-icon">
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16v12H8l-4 4V4Z" />
                  <path d="M8 9h8M8 12.5h5" />
                </svg>
              </span>
              <span className="lp-role-num">05</span>
            </div>
            <h3>Live Chat &amp; Email</h3>
            <p>Async written support and help-desk coverage across time zones.</p>
            <div className="lp-role-chips">
              <span className="lp-role-chip">Live chat</span>
              <span className="lp-role-chip">Email</span>
              <span className="lp-role-chip">Help desk</span>
            </div>
            <div className="lp-role-foot">
              <div className="lp-role-level">
                <span className="ll">
                  <LevelIcon />
                  Entry-friendly
                </span>
                <div className="lp-role-band" data-fill="45">
                  <span />
                </div>
              </div>
              <span className="lp-role-demand">
                <span className="d" />
                In demand
              </span>
            </div>
          </article>

          {/* Wide bottom */}
          <article className="lp-role wide reveal">
            <div className="lp-role-head">
              <span className="lp-role-icon">
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="5" />
                  <path d="M9 12.5 8 22l4-2.2L16 22l-1-9.5" />
                </svg>
              </span>
              <span className="lp-role-tag" style={{ color: 'var(--rc-amber-ink)' }}>
                Leadership track
              </span>
            </div>
            <div className="lp-role-inner">
              <div>
                <h3>QA &amp; Team Lead</h3>
                <p>
                  Score calls, coach agents and run cohorts as you grow into leadership — where many RemConnect agents
                  are two years from now.
                </p>
                <div className="lp-role-foot">
                  <div className="lp-role-level">
                    <span className="ll">
                      <LevelIcon />
                      Advanced · grown from within
                    </span>
                    <div className="lp-role-band" data-fill="95">
                      <span />
                    </div>
                  </div>
                  <span className="lp-role-demand">
                    <span className="d" style={{ background: 'var(--rc-amber)' }} />
                    <span style={{ color: 'var(--rc-amber-ink)' }}>By invitation</span>
                  </span>
                </div>
              </div>
              <ul className="lp-role-bullets">
                <li>Call calibration &amp; scoring</li>
                <li>1:1 agent coaching</li>
                <li>Cohort onboarding</li>
                <li>Agent → senior → lead</li>
              </ul>
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}
