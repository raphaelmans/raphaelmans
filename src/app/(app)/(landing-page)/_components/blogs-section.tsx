'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { PaginatedDocs } from 'payload'
import { format } from 'date-fns/format'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Blog } from '@/payload-types'
import { typeGuardUtils } from '@/common/utils'
import { appRouter, createUrl } from '@/common/routes'
const MotionCard = motion(Card)
const MotionImage = motion(Image)

export default function BlogSection({
  className,
  data,
}: {
  className?: string
  data: PaginatedDocs<Blog>
}) {
  const ref = useRef<HTMLDivElement>(null!)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className={cn('flex flex-col items-center justify-center', className)}>
      <div className='container mx-auto px-4'>
        <motion.h2
          className='mb-8 text-center text-4xl font-bold text-primary'
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Latest Blog Posts
        </motion.h2>
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {data.docs.map((post, index) => (
            <MotionCard
              key={post.id}
              className='flex h-full flex-col'
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className='relative h-48 w-full'>
                <MotionImage
                  src={
                    typeGuardUtils.isMedia(post.featuredImage)
                      ? (post.featuredImage.sizes?.card?.url ?? '')
                      : ''
                  }
                  alt={post.title}
                  fill
                  className='rounded-t-lg object-cover'
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                />
              </div>
              <CardHeader>
                <CardTitle className='line-clamp-2 text-xl font-semibold'>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className='mb-2 line-clamp-3 text-muted-foreground'
                  dangerouslySetInnerHTML={{ __html: post.content_html ?? 'N/A' }}
                ></div>
                <div className='flex justify-between text-sm text-muted-foreground'>
                  <span>{format(new Date(post.createdAt), 'MMM d, yyyy')}</span>
                  <span>{typeGuardUtils.isUser(post.author) ? post.author.name : 'N/A'}</span>
                </div>
              </CardContent>
              <CardFooter className='mt-auto'>
                <Button asChild className='w-full'>
                  <Link href={createUrl(appRouter.blogBySlug, { params: { slug: post.id } })}>
                    Read More <ArrowRight className='ml-2 h-4 w-4' />
                  </Link>
                </Button>
              </CardFooter>
            </MotionCard>
          ))}
        </div>
        <motion.div
          className='mt-12 text-center'
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Button asChild variant='outline' size='lg'>
            <Link href='/blog'>
              View All Posts <ArrowRight className='ml-2 h-4 w-4' />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
