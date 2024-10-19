import React from 'react'
import Hero from './_components/hero-section'
import BlogSection from './_components/blogs-section'
import ProjectsSection from './_components/projects-section'

export default function LandingPage() {
  return (
    <>
      <Hero />
      <ProjectsSection className='py-4 md:min-h-screen lg:py-16' />
      <BlogSection className='py-4 md:min-h-screen lg:py-16' />
    </>
  )
}
