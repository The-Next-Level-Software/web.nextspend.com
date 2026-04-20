import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'NextSpend - Control Every Rupee with Confidence',
  description: 'Smart personal finance management app with income tracking, expense analytics, budgeting tools, and multi-profile support.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: 'Next Spend Logo/favicon.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: 'Next Spend Logo/favicon.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: 'Next Spend Logo/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: 'Next Spend Logo/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
