import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RemConnect Agent Portal',
  description: 'Your one-stop portal for training, onboarding, profile, and opportunities',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
