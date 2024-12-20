import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

const websiteURL = 'https://www.raphaelmansueto.com'
const ogImageURL = 'https://www.raphaelmansueto.com/og'
export const metadata: Metadata = {
  title: 'Raphael Mansueto - Full-Stack Developer',
  description:
    'Intelligence-driven, creating reliable solutions focused on scalability and exceptional quality.',
  openGraph: {
    title: 'Raphael Mansueto - Full-Stack Developer',
    description:
      'Intelligence-driven, creating reliable solutions focused on scalability and exceptional quality.',
    url: websiteURL,
    siteName: 'Raphael Mansueto',
    images: [
      {
        url: ogImageURL,
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raphael Mansueto - Full-Stack Developer',
    description:
      'Intelligence-driven, creating reliable solutions focused on scalability and exceptional quality.',
    images: [ogImageURL],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} ${inter.variable} antialiased`}>{children}</body>
    </html>
  )
}
