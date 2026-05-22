export const ITEMS = [
  { id: 'monitor',   label: '2nd monitor',           desc: '1080p or better, for multi-tasking across tools',            icon: 'spreadsheet' },
  { id: 'pc',        label: 'PC / Laptop',           desc: 'Meets RemConnect specs · i5 / 8GB / 256GB min',             icon: 'code' },
  { id: 'router',    label: 'Router / Ethernet',     desc: 'Hard-wired ethernet preferred · ≥10 Mbps down',             icon: 'globe' },
  { id: 'powerbank', label: 'Heavy-duty power bank', desc: 'Backup during outages · min 30000 mAh / UPS',               icon: 'bolt' },
  { id: 'desk',      label: 'Proper desk',           desc: 'Dedicated workspace · no bed / couch',                      icon: 'briefcase' },
  { id: 'headset',   label: 'Headset',               desc: 'Noise-cancelling · USB or approved model',                  icon: 'headset' },
  { id: 'charger',   label: 'Charging station',      desc: 'Reliable charging for phone + power bank',                  icon: 'lightning' },
  { id: 'fire',      label: 'Mini fire extinguisher',desc: 'Safety requirement for home-office setup',                  icon: 'shield' },
]

export const DEMO_STATE: Record<string, { uploaded: boolean; verdict?: 'satisfactory' | 'needs-fix' | 'pending'; reviewer?: string; when?: string; note?: string }> = {
  monitor:   { uploaded: true,  verdict: 'satisfactory', reviewer: 'Ops · Mekdes', when: 'Apr 14' },
  pc:        { uploaded: true,  verdict: 'satisfactory', reviewer: 'Ops · Mekdes', when: 'Apr 14' },
  router:    { uploaded: true,  verdict: 'satisfactory', reviewer: 'Ops · Samuel', when: 'Apr 15' },
  powerbank: { uploaded: true,  verdict: 'needs-fix',    reviewer: 'Ops · Samuel', when: 'Apr 15', note: 'Capacity unclear in photo. Please retake showing label (mAh / Wh rating).' },
  desk:      { uploaded: true,  verdict: 'pending' },
  headset:   { uploaded: true,  verdict: 'satisfactory', reviewer: 'Ops · Mekdes', when: 'Apr 14' },
  charger:   { uploaded: false },
  fire:      { uploaded: false },
}

export const VERDICT = {
  satisfactory: { label: 'Satisfactory',   chip: 'good' as const, icon: 'check' },
  'needs-fix':  { label: 'Needs retake',   chip: 'bad'  as const, icon: 'info' },
  pending:      { label: 'Pending review', chip: 'neutral' as const, icon: 'clock' },
}
