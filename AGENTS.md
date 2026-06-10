<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Engineering Standards

These rules are mandatory for all new and modified code. They exist because the codebase is being refactored toward server-first, token-driven, modular architecture. When you touch a file, leave it better than you found it (boy-scout rule), but do not mass-rewrite unrelated code in an unrelated change.

Stack: **Next.js 16.2.6 · React 19 · Tailwind v4 · TypeScript (strict)**. Package manager: **npm**.

## Server vs Client Components

- **Server Components are the default. Do NOT add `'use client'` unless the component truly needs it** — i.e. it uses event handlers (`onClick`), state/effects (`useState`/`useEffect`), browser APIs (`localStorage`, `window`), or a client-only library.
- **Layouts and pages must stay Server Components** unless unavoidable. If a page needs one interactive widget, keep the page a Server Component and extract the interactive part into a small `'use client'` leaf component.
- Push `'use client'` as far down the tree as possible. A client boundary makes every imported child client too.
- Pass data from Server → Client via props (serializable), or pass a promise and read it with React's `use()` hook inside a `<Suspense>`.

## Next.js 16 conventions

Differs from older Next.js — verify in `node_modules/next/dist/docs/01-app/` before coding.

- `params` and `searchParams` are **Promises** — you must `await` them (or `use()` them): `const { id } = await params`.
- Caching is opt-in via the `'use cache'` directive + `cacheLife('hours'|'days'|…)` / `cacheTag()`; revalidate with `revalidateTag` / `revalidatePath`. Do not rely on the old implicit fetch cache.
- Wrap request-time/dynamic data in `<Suspense>`; uncached dynamic data read outside a Suspense boundary is a build error when Cache Components are on.
- Metadata: `export const metadata` (static) or `export async function generateMetadata()` (dynamic). No `<head>` hacks.
- Request interception lives in **`src/proxy.ts`** (this version's rename of `middleware.ts`) — do not recreate `middleware.ts`.
- Turbopack is the default bundler; do not add a webpack config.

## Styling — Tailwind utilities only

- **Use Tailwind utility classes with the `rc-*` design tokens. No inline `style={{}}` and no hardcoded hex/px colors.**
  - ✅ `className="bg-rc-ink text-rc-paper rounded-md shadow-md"`
  - ❌ `style={{ background: '#0b1220', color: '#faf9f6' }}`
- **The design tokens are defined ONCE** in the `@theme` block of `src/app/globals.css` (Tailwind v4 is CSS-first). To add or change a token, edit `@theme` there. `tailwind.config.ts` is a non-loaded stub — never redefine tokens in it.
- `style={{}}` is permitted ONLY for genuinely dynamic values that can't be a class: computed positions, measured sizes, animation values driven by `motion`. Prefer CSS variables (`var(--rc-*)`) over raw hex even there.
- Compose conditional classes with the `cn()` helper in `src/lib/cn.ts` (clsx + tailwind-merge). Variant-driven primitives use a typed `Record<Variant, string>` class map (see `src/components/ui/Button.tsx`).

## Components

- One component per file; **extract when a file exceeds ~200 lines or renders multiple distinct sections** (tabs, cards, panels become their own files).
- Presentational components receive typed props and must **not import data modules directly** — data comes in via props or from the data-access layer in a parent Server Component.
- Co-locate a component's sub-components in a folder; export the public surface via an `index.ts` barrel.
- Extend native element props where relevant: `interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}`.

## Data access

- Components never import raw mock/fixture files. All reads go through the typed async data-access layer in **`src/lib/data/*`** (e.g. `getApplicants()`), which currently returns fixtures from `src/lib/fixtures/*` and is the seam for a real backend later.
- Shared domain types live in `src/types/`. Server-only secrets are unprefixed env vars; anything sent to the browser must be `NEXT_PUBLIC_`-prefixed.

## TypeScript

- `strict` stays on. **No `any` / `as any`** (the codebase is currently at zero — keep it there). Prefer `unknown` + narrowing.
- Use discriminated unions / typed `Record`s for status→style maps instead of loose object lookups.

## Naming & structure

- `PascalCase` component files; folder name carries the domain — avoid redundant prefixes (`video-queue/Queue.tsx`, not `video-queue/VideoQueue.tsx`).
- Group by domain under `src/components/<domain>/`.

## Quality gates

Run before committing — enforced by the Husky pre-commit hook.

- `npm run typecheck` · `npm run lint` · `npm run format:check` · `npm test` must all pass.
- `npm run build` must succeed (catches Server/Client boundary and Suspense/caching violations).
- Pre-commit runs `lint-staged` (Prettier + ESLint --fix on staged files) then `typecheck`.

## Refactor in progress

This codebase is mid-migration to the standards above. The in-flight backlog and reference
exemplars are tracked in [REFACTOR.md](REFACTOR.md) — consult it before large changes, and when you
touch a not-yet-migrated file, bring it up to standard as part of your change.
