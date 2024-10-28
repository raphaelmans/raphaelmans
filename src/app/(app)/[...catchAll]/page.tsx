'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFoundComponent() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-background text-foreground'>
      <div className='text-center'>
        <h1 className='mb-4 text-6xl font-bold text-primary'>404</h1>
        <h2 className='mb-6 text-3xl font-semibold'>Page Not Found</h2>
        <p className='mb-8 text-lg text-muted-foreground'>
          Oops! The page you're looking for doesn't exist.
        </p>
        <Button asChild size='lg'>
          <Link href='/' className='inline-flex items-center'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Go back home
          </Link>
        </Button>
      </div>
    </div>
  )
}
