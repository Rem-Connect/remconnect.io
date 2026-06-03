import { LANDING_STORIES } from '@/lib/landing-data'

const DELAYS = ['', 'd1', 'd2', 'd3', 'd4']

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
          Real RemConnect agents, really placed — {LANDING_STORIES.length} of the people who started exactly where you
          are now.
        </p>
      </div>

      <div className="lp-stories-scroll" id="lpStoriesScroll">
        {LANDING_STORIES.map((s, i) => (
          <article key={s.id} className={`lp-story reveal ${DELAYS[i] ?? ''}`.trim()} style={{ background: s.bg }}>
            <img
              src={s.photo}
              alt={s.name}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 22%' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(11,18,32,0.20) 0%, rgba(11,18,32,0.10) 32%, rgba(11,18,32,0.92) 100%)',
              }}
            />
            <div className="num">{String(i + 1).padStart(2, '0')}</div>
            <div className="body">
              <p className="q">&quot;{s.quote}&quot;</p>
              <div className="nm">{s.name}</div>
              <div className="rl">{s.role}</div>
              <div className="stat">
                {s.stats.map((st, j) => (
                  <div key={j}>
                    <div className="v tnum">{st.v}</div>
                    <div className="sl">{st.sl}</div>
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
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
