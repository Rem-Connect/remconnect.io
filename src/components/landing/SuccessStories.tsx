export default function SuccessStories() {
  return (
    <section className="lp-stories" id="stories" data-screen-label="Success stories">
      <div className="lp-stories-head">
        <div>
          <div className="lp-index on-dark reveal">
            <span>04</span>
            <span className="ln" />
            <b>Success stories</b>
          </div>
          <h2 className="lp-h2 reveal d1">
            From application to <em>thriving.</em>
          </h2>
        </div>
        <p className="lp-lede reveal d2">
          Real agents, real placements — four of the people who started exactly where you are now.
        </p>
      </div>

      <div className="lp-stories-scroll" id="lpStoriesScroll">
        <article className="lp-story reveal" style={{ background: 'linear-gradient(160deg,#1d6fd6,#0c3a7a)' }}>
          <div className="num">01</div>
          <div className="face">L</div>
          <div className="body">
            <p className="q">
              &quot;Zero BPO experience to a full-time US voice role in six weeks. My coach ran me through every tough
              call before I went live.&quot;
            </p>
            <div className="nm">Liya D.</div>
            <div className="rl">Voice Support · Northwind Retail</div>
            <div className="stat">
              <div>
                <div className="v tnum">6 wks</div>
                <div className="sl">To first shift</div>
              </div>
              <div>
                <div className="v tnum">14 mo</div>
                <div className="sl">With RemConnect</div>
              </div>
            </div>
          </div>
        </article>
        <article className="lp-story reveal d1" style={{ background: 'linear-gradient(160deg,#3a4a66,#1a2338)' }}>
          <div className="num">02</div>
          <div className="face">D</div>
          <div className="body">
            <p className="q">
              &quot;English was my strength, but I&apos;d never worked a ticket queue. Weekly QA reviews put me at the
              top of my team in two months.&quot;
            </p>
            <div className="nm">Dagim K.</div>
            <div className="rl">Written Support · Apex Insurance</div>
            <div className="stat">
              <div>
                <div className="v">Top 5%</div>
                <div className="sl">Written QA</div>
              </div>
              <div>
                <div className="v">USD</div>
                <div className="sl">Paid monthly</div>
              </div>
            </div>
          </div>
        </article>
        <article className="lp-story reveal d2" style={{ background: 'linear-gradient(160deg,#0b4fa8,#0c3a7a)' }}>
          <div className="num">03</div>
          <div className="face">H</div>
          <div className="body">
            <p className="q">
              &quot;The de-escalation training is the real deal. Angry callers used to rattle me; now they&apos;re the
              calls I&apos;m best at.&quot;
            </p>
            <div className="nm">Hanna T.</div>
            <div className="rl">Hybrid Support · Lumen Telecom</div>
            <div className="stat">
              <div>
                <div className="v tnum">91</div>
                <div className="sl">Voice QA</div>
              </div>
              <div>
                <div className="v tnum">2</div>
                <div className="sl">Promotions</div>
              </div>
            </div>
          </div>
        </article>
        <article className="lp-story reveal d3" style={{ background: 'linear-gradient(160deg,#24507e,#0d1f3c)' }}>
          <div className="num">04</div>
          <div className="face">M</div>
          <div className="body">
            <p className="q">
              &quot;I started as an agent and now I coach a cohort of twelve. RemConnect gave me a path I couldn&apos;t
              find anywhere else in Addis.&quot;
            </p>
            <div className="nm">Mekdes A.</div>
            <div className="rl">Team Coach · mentors 12 agents</div>
            <div className="stat">
              <div>
                <div className="v tnum">12</div>
                <div className="sl">Agents mentored</div>
              </div>
              <div>
                <div className="v tnum">94</div>
                <div className="sl">Coaching score</div>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div className="lp-stories-nav">
        <button className="lp-snav" id="lpStoriesPrev" aria-label="Previous">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <button className="lp-snav primary" id="lpStoriesNext" aria-label="Next">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  )
}
