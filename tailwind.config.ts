import type { Config } from 'tailwindcss'

/**
 * Tailwind v4 is CSS-first: the design tokens (colors, fonts, radii, shadows)
 * are the SINGLE SOURCE OF TRUTH in `src/app/globals.css` under `@theme`.
 *
 * This file is NOT loaded by the build (there is no `@config` directive in the
 * CSS, and `@tailwindcss/postcss` reads `@theme` directly). It is kept only so
 * tooling that expects a config path can find one. Do NOT redefine tokens here —
 * add them to the `@theme` block in globals.css instead.
 */
const config: Config = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}'],
}

export default config
