import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        rc: {
          ink:       '#0b1220',
          'ink-2':   '#121a2b',
          'ink-3':   '#1a2338',
          'ink-4':   '#243150',
          paper:     '#faf9f6',
          'paper-2': '#f3f1ea',
          'paper-3': '#ecead9',
          line:      '#e3e0d2',
          muted:     '#5a6072',
          'muted-d': '#8b93a7',
          blue:      '#1d6fd6',
          'blue-soft':'#7cb3f5',
          'blue-ink': '#0c3a7a',
          'blue-deep':'#0b4fa8',
          green:     '#3f6b4e',
          red:       '#b54838',
          sky:       '#4a6b8a',
          good:      '#2f8d5c',
          warn:      '#c08a2a',
          bad:       '#b54838',
        },
      },
      fontFamily: {
        sans:  ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Instrument Serif', 'Times New Roman', 'serif'],
        mono:  ['JetBrains Mono', 'ui-monospace', 'Menlo', 'monospace'],
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(11,18,32,0.06), 0 1px 1px rgba(11,18,32,0.04)',
        md: '0 4px 12px rgba(11,18,32,0.08)',
        lg: '0 16px 40px rgba(11,18,32,0.12)',
      },
    },
  },
  plugins: [],
}

export default config
