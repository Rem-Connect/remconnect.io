import { cn } from '@/lib/cn'

/** Tailwind class pairs (background + foreground) for each avatar tone. */
const TONES: string[] = [
  'bg-rc-blue text-white',
  'bg-rc-green text-white',
  'bg-rc-sky text-white',
  'bg-rc-blue-ink text-white',
  'bg-rc-blue-ink text-rc-blue-soft',
  'bg-rc-ink-3 text-rc-blue-soft',
]

interface AvatarProps {
  name?: string
  tone?: number
  size?: number
}

export function Avatar({ name = 'A', tone = 0, size = 32 }: AvatarProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full font-sans font-semibold tracking-[0.02em]',
        TONES[tone % TONES.length],
      )}
      // Size is a dynamic prop, so width/height/font-size stay inline per the styling standard.
      style={{ width: size, height: size, fontSize: size * 0.38 }}
    >
      {initials}
    </div>
  )
}
