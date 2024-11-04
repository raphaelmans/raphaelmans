import { notFound } from 'next/navigation'
import Image from 'next/image'
import { format } from 'date-fns'
import { getPayload } from 'payload'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import configPromise from '@/payload.config'
import { typeGuardUtils } from '@/common/utils'
import { Button } from '@/components/ui/button'

async function getBlogPost(slug: string) {
  const payload = await getPayload({
    config: configPromise,
  })

  const blog = await payload.findByID({
    collection: 'blog',
    id: slug,
  })

  return blog
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className='mx-auto h-full w-full max-w-2xl flex-1 px-4 py-20'>
      <Button variant='ghost' className='mb-6 p-0' asChild>
        <Link href='/blog' aria-label='Back to blog posts'>
          <ArrowLeft className='mr-2 h-4 w-4' />
          Back to blog posts
        </Link>
      </Button>

      <h1 className='mb-4 text-4xl font-bold'>{post.title}</h1>
      {post.publishedDate && (
        <div className='mb-6 text-gray-600'>
          Published on {format(new Date(post.publishedDate), 'MMMM d, yyyy')}
        </div>
      )}
      <Image
        src={
          post.featuredImage && typeGuardUtils.isMedia(post.featuredImage)
            ? `${post.featuredImage.sizes?.card?.url}`
            : ''
        }
        alt={post.title}
        width={800}
        height={400}
        className='mb-6 h-64 w-full rounded-lg object-cover'
      />
      <div
        className='prose max-w-none'
        dangerouslySetInnerHTML={{ __html: post.content_html || '' }}
      />
      <div className='mt-8'>
        <h2 className='mb-2 text-xl font-semibold'>Tags</h2>
        <div className='flex flex-wrap gap-2'>
          {post.tags?.map(tag => (
            <span key={tag.tag} className='rounded-full bg-gray-200 px-2 py-1 text-sm'>
              {tag.tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}