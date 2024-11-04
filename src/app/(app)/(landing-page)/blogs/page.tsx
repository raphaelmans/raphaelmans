import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { getPayload } from 'payload'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import configPromise from '@/payload.config'
import { typeGuardUtils } from '@/common/utils'

type PaginationProps = {
  currentPage: number
  totalPages: number
}

async function getBlogPosts(page: number, limit: number) {
  const payload = await getPayload({
    config: configPromise,
  })

  const posts = await payload.find({
    collection: 'blog',
    limit,
    page,
  })

  return posts
}

function Pagination({ currentPage, totalPages }: PaginationProps) {
  return (
    <div className='mt-auto flex justify-center space-x-2'>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
        <Button
          asChild
          variant='outline'
          className={cn({
            'border-primary': pageNumber === currentPage,
          })}
          key={pageNumber}
        >
          <Link href={`/blogs?page=${pageNumber}`}>{pageNumber}</Link>
        </Button>
      ))}
    </div>
  )
}

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page, 10) : 1
  const limit = 6
  const blogPosts = await getBlogPosts(page, limit)

  const posts = blogPosts.docs
  const totalPages = blogPosts.totalDocs

  return (
    <div className='mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 pb-5 pt-20'>
      <h1 className='mb-8 text-4xl font-bold'>Blog Posts</h1>
      <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {posts.map(post => (
          <Link key={post.id} href={`/blogs/${post.id}`} className='block'>
            <div className='overflow-hidden rounded-lg bg-white shadow-md transition-transform duration-300 hover:scale-105'>
              <Image
                src={
                  post.featuredImage && typeGuardUtils.isMedia(post.featuredImage)
                    ? `${post.featuredImage.sizes?.thumbnail?.url}`
                    : ''
                }
                alt={post.title}
                width={400}
                height={200}
                className='h-48 w-full object-cover'
              />
              <div className='p-4'>
                <h2 className='mb-2 text-xl font-semibold'>{post.title}</h2>
                {post.publishedDate && (
                  <p className='mb-2 text-sm text-gray-600'>
                    {format(new Date(post.publishedDate), 'MMMM d, yyyy')}
                  </p>
                )}
                <p className='mb-4 text-gray-700'>{post.summary}</p>
                <div className='flex flex-wrap gap-2'>
                  {post.tags?.map(tag => (
                    <span key={tag.tag} className='rounded-full bg-gray-200 px-2 py-1 text-xs'>
                      {tag.tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  )
}
