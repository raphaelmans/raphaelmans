import React from 'react'
import type { PaginatedDocs } from 'payload'
import { getPayload } from 'payload'
import Hero from './_components/hero-section'
import BlogSection from './_components/blogs-section'
import ProjectsSection from './_components/projects-section'
import { APIBaseResponse } from '@/lib/schemas'
import { Blog } from '@/payload-types'
import configPromise from '@/payload.config'

export const revalidate = 3600 // Revalidate every hour

export default async function LandingPage() {
  const payload = await getPayload({
    config: configPromise,
  })

  const blogs = await payload.find({
    collection: 'blog',
  })

  const data: APIBaseResponse<PaginatedDocs<Blog>> = {
    data: blogs,
  }

  return (
    <React.Fragment>
      <Hero />
      <ProjectsSection className='py-4 md:min-h-screen lg:py-16' />
      <BlogSection className='py-4 md:min-h-screen lg:py-16' data={data.data} />
    </React.Fragment>
  )
}
