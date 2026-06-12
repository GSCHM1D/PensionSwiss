import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/Sidebar'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: { default: 'PensionPilot', template: '%s · PensionPilot' },
  description: 'Swiss 3-pillar pension dashboard — see everything in one place, know exactly what to do.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-slate-50 min-h-screen font-sans">
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 ml-64 p-8 min-h-screen">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
