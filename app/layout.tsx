import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
})

const SITE_URL = '..' //not deploy yet

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f7f5f2',
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Frandi Andika — Software Engineer',
  description:
    'Full-stack software engineer building reliable web systems. CS graduate, Bangkit Academy top 10%.',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'Frandi Andika — Software Engineer',
    description: 'Full-stack software engineer building reliable web systems.',
    url: SITE_URL,
    siteName: 'Frandi Andika',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'Frandi Andika — Software Engineer',
    description: 'Full-stack software engineer building reliable web systems.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable}`}>
        {children}
      </body>
    </html>
  )
}
