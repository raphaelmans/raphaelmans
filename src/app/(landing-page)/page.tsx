import React from 'react'
import Hero from './_components/hero-section'
import BlogSection from './_components/blogs-section'
import ProjectsSection from './_components/projects-section'

export default function LandingPage() {
  return (
    <>
      <Hero />
      <ProjectsSection />
      <BlogSection className='py-4 md:h-screen md:max-h-screen lg:py-16' />
    </>
  )
}
