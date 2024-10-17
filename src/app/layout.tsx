import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ScrollArea } from '@/components/ui/scroll-area'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

const websiteURL = 'https://www.raphaelmansueto.com'
const ogImageURL = 'https://www.raphaelmansueto.com/og'
export const metadata: Metadata = {
  title: 'Raphael Mansueto - Full-Stack Developer',
  description:
    'Building innovative, scalable solutions that enhance digital experiences and drive growth',
  openGraph: {
    title: 'Raphael Mansueto - Full-Stack Developer',
    description:
      'Building innovative, scalable solutions that enhance digital experiences and drive growth',
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
      'Building innovative, scalable solutions that enhance digital experiences and drive growth',
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
      <body className={`${inter.className} ${inter.variable} antialiased`}>
        <ScrollArea className='h-screen w-screen'>{children}</ScrollArea>
      </body>
    </html>
  )
}
