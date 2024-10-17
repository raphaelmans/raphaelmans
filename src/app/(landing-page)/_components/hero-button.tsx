'use client'
import { ChevronRight } from 'lucide-react'
import React from 'react'
import { projectsSectionId } from './projects-section'
import { Button } from '@/components/ui/button'

const HeroButton = ({ text }: { text: string }) => {
  return (
    <Button
      size='lg'
      className='group w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto'
      onClick={() => {
        const projectsSection = document.getElementById(projectsSectionId)
        if (projectsSection) {
          projectsSection.scrollIntoView({ behavior: 'smooth' })
        }
      }}
    >
      {text}
      <ChevronRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
    </Button>
  )
}

export default HeroButton
