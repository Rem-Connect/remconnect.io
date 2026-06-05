import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Domain-based routing.
 *
 * remconnect.io / www.remconnect.io  → silently rewritten to /coming-soon
 *                                      (URL stays as-is, no redirect)
 * everything else (e.g. *.vercel.app, localhost) → passes through untouched
 *
 * Note: In Next.js 16 the `middleware` file convention was deprecated and
 * renamed to `proxy` (see node_modules/next/dist/docs/.../version-16.md →
 * "`middleware` to `proxy`"). This file is the current, non-deprecated
 * equivalent of the requested `middleware.ts`. Because this project uses a
 * `src/` directory, it lives at `src/proxy.ts` so it sits alongside `app`.
 */

const COMING_SOON_HOSTS = new Set(['remconnect.io', 'www.remconnect.io'])

export function proxy(request: NextRequest) {
  // Host header can include a port (e.g. "remconnect.io:443"); strip it.
  const host = (request.headers.get('host') ?? '').split(':')[0].toLowerCase()

  if (COMING_SOON_HOSTS.has(host)) {
    const url = request.nextUrl.clone()
    url.pathname = '/coming-soon'
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  // Run on every path except static assets, image optimization, favicon and
  // API routes — so assets still load correctly on the public domain too.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
