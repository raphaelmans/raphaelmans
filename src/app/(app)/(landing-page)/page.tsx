import React from 'react'
import type { PaginatedDocs } from 'payload'
import Hero from './_components/hero-section'
import BlogSection from './_components/blogs-section'
import ProjectsSection from './_components/projects-section'
import { APIBaseResponse } from '@/lib/schemas'
import { Blog } from '@/payload-types'
import { API_BASE_URL } from '@/common/constants'

export default async function LandingPage() {
  const res = await fetch(API_BASE_URL + '/blogs')

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const data: APIBaseResponse<PaginatedDocs<Blog>> = await res.json()
  return (
    <React.Fragment>
      <Hero />
      <ProjectsSection className='py-4 md:min-h-screen lg:py-16' />
      <BlogSection className='py-4 md:min-h-screen lg:py-16' data={data.data} />
    </React.Fragment>
  )
}
