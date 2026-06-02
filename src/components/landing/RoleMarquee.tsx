export default function RoleMarquee() {
  const items = [
    'Customer Support',
    'Technical Support',
    'Virtual Assistant',
    'Sales Development',
    'Live Chat & Email',
    'QA & Coaching',
    'Back Office',
    'Account Management',
  ]
  return (
    <div className="lp-marquee" aria-hidden="true">
      <div className="lp-marquee-track">
        {items.map((it, i) => (
          <span className="it" key={`a-${i}`}>
            {it}
          </span>
        ))}
        {items.map((it, i) => (
          <span className="it" key={`b-${i}`}>
            {it}
          </span>
        ))}
      </div>
    </div>
  )
}
