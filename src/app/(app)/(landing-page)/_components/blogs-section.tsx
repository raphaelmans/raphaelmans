'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type BlogPost = {
  id: string
  title: string
  description: string
  date: string
  readTime: string
  imageUrl: string
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Front-End Development: Trends to Watch',
    description:
      'Explore the emerging trends shaping the future of front-end development, from AI-assisted coding to the rise of micro-frontends.',
    date: 'May 15, 2023',
    readTime: '5 min read',
    imageUrl: '/placeholder.svg?height=200&width=400',
  },
  {
    id: '2',
    title: 'Optimizing React Performance: Advanced Techniques',
    description:
      'Dive deep into advanced techniques for optimizing React applications, including code splitting, memoization, and efficient state management.',
    date: 'April 22, 2023',
    readTime: '8 min read',
    imageUrl: '/placeholder.svg?height=200&width=400',
  },
  {
    id: '3',
    title: 'Building Accessible Web Applications: A Comprehensive Guide',
    description:
      'Learn how to create web applications that are accessible to all users, covering ARIA attributes, keyboard navigation, and inclusive design principles.',
    date: 'March 10, 2023',
    readTime: '10 min read',
    imageUrl: '/placeholder.svg?height=200&width=400',
  },
]

const MotionCard = motion(Card)
const MotionImage = motion(Image)

export default function BlogSection({ className }: { className?: string }) {
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
          {blogPosts.map((post, index) => (
            <MotionCard
              key={post.id}
              className='flex h-full flex-col'
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className='relative h-48 w-full'>
                <MotionImage
                  src={post.imageUrl}
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
                <p className='mb-2 line-clamp-3 text-muted-foreground'>{post.description}</p>
                <div className='flex justify-between text-sm text-muted-foreground'>
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </CardContent>
              <CardFooter className='mt-auto'>
                <Button asChild className='w-full'>
                  <Link href={`/blog/${post.id}`}>
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
