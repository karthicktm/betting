import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { DemoProvider } from '@/components/DemoContext'
import { Toaster } from '@/components/ui/toaster'
import DemoControllerWrapper from '@/components/DemoControllerWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BetSmart - AI Powered Betting Recommendations',
  description: 'Personalized horse racing betting recommendations powered by AI',
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
      { url: '/favicon.ico' }
    ],
    apple: [
      { url: '/apple-icon.png' }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DemoProvider>
          {children}
          <DemoControllerWrapper />
          <Toaster />
        </DemoProvider>
      </body>
    </html>
  )
}