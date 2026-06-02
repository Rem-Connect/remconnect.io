const FAQS = [
  {
    q: 'Is RemConnect really free for agents?',
    a: "Yes, completely. You never pay to apply, to train, or to get placed. We're paid by the employers who hire you, which means we only succeed when you do. Anyone asking you for a fee is not RemConnect.",
  },
  {
    q: 'How and when do I get paid?',
    a: "Once you're placed, you're paid on a fixed monthly cycle. You choose whether to be paid in USD or ETB, and your full wage reaches you — we never take a cut of what you earn.",
  },
  {
    q: 'Do I need prior call-center experience?',
    a: 'No. Most of our agents started with zero BPO experience. What matters is conversational English and a willingness to learn — our curriculum takes you from the fundamentals to client-ready.',
  },
  {
    q: 'What equipment do I need?',
    a: 'A laptop or desktop (Windows or Mac), a headset with a mic, a webcam, reliable internet, and a quiet space. A power backup helps given local outages, but isn’t required to apply.',
  },
  {
    q: "How long until I'm placed?",
    a: 'On average about six weeks — from application, through training and certification, to your first shift. The exact timing depends on your cohort and how quickly you complete the curriculum.',
  },
  {
    q: "What if I'm not placed right away?",
    a: 'You stay on the bench with continued coaching while we keep matching you to new openings — at no cost. Our placement rate is high, and we keep working with you until you’re live with a client.',
  },
]

export default function FAQ() {
  return (
    <section className="lp-section tight" id="faq" data-screen-label="FAQ">
      <div className="lp-faq">
        <div className="lp-faq-left">
          <h2 className="lp-h2">
            Questions?
            <br />
            We&apos;ve got answers.
          </h2>
          <p>Everything you need to know before you apply. Still unsure about something?</p>
          <a className="lp-btn lp-btn-light" href="#contact">
            Talk to our team
            <span className="pip">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </span>
          </a>
        </div>
        <div className="lp-faq-list">
          {FAQS.map((item, i) => (
            <div className="lp-faq-item" key={i}>
              <button className="lp-faq-q">
                {item.q}
                <span className="pm">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </button>
              <div className="lp-faq-a">
                <div className="lp-faq-a-inner">{item.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
