import React from 'react'
import type { PaginatedDocs } from 'payload'
import Hero from './_components/hero-section'
import BlogSection from './_components/blogs-section'
import ProjectsSection from './_components/projects-section'
import { APIBaseResponse } from '@/lib/schemas'
import { Blog } from '@/payload-types'

export default async function LandingPage() {
  const res = await fetch('http://localhost:3000/rm-api/blogs')
  const data: APIBaseResponse<PaginatedDocs<Blog>> = await res.json()
  return (
    <>
      <Hero />
      <ProjectsSection className='py-4 md:min-h-screen lg:py-16' />
      <BlogSection className='py-4 md:min-h-screen lg:py-16' data={data.data} />
    </>
  )
}
