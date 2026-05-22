// Deterministic placeholder portrait URLs for agents without a real photo on file.
// i.pravatar.cc has 70 placeholder portraits (?img=1..70). Same ID → same portrait.

function hashId(id: string): number {
  let h = 0
  for (let i = 0; i < id.length; i++) {
    h = (h * 31 + id.charCodeAt(i)) >>> 0
  }
  return h
}

export function getAgentPhoto(id: string, size = 200): string {
  const idx = (hashId(id) % 70) + 1
  return `https://i.pravatar.cc/${size}?img=${idx}`
}

export function isExternalPhoto(src: string): boolean {
  return src.startsWith('http://') || src.startsWith('https://')
}
