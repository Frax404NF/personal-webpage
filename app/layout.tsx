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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://frandiandika.dev'

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
  verification: {
    google: '568e1420fc072dee',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Frandi Andika',
    url: SITE_URL,
    jobTitle: 'Software Engineer',
    description: 'Full-stack software engineer building reliable web systems.',
    sameAs: [
      'https://github.com/Frax404NF',
      'https://www.linkedin.com/in/frandi-andika-30a505260/',
    ],
    knowsAbout: ['React', 'Next.js', 'Node.js', 'TypeScript', 'Google Cloud', 'Python'],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Universitas Sam Ratulangi',
    },
  }

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable}`}>
        {children}
      </body>
    </html>
  )
}
