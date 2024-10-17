'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

type Project = {
  id: string
  title: string
  description: string
  imageUrl: string
  technologies: string[]
  githubUrl: string
  liveUrl: string
}

const projects: Project[] = [
  {
    id: '1',
    title: 'AI-Powered Task Manager',
    description:
      'A smart task management application that uses AI to prioritize and categorize tasks, enhancing productivity and time management. This project showcases the integration of machine learning algorithms with a user-friendly interface, providing personalized task recommendations and insights into work patterns.',
    imageUrl: '/placeholder.svg?height=400&width=600',
    technologies: ['React', 'Node.js', 'OpenAI API', 'MongoDB'],
    githubUrl: 'https://github.com/yourusername/ai-task-manager',
    liveUrl: 'https://ai-task-manager.example.com',
  },
  {
    id: '2',
    title: 'Blockchain Voting System',
    description:
      'A secure and transparent voting system built on blockchain technology, ensuring the integrity and immutability of election results. This project demonstrates the application of decentralized ledger technology in creating a tamper-proof voting mechanism, potentially revolutionizing the way we conduct elections.',
    imageUrl: '/placeholder.svg?height=400&width=600',
    technologies: ['Solidity', 'Ethereum', 'Web3.js', 'React'],
    githubUrl: 'https://github.com/yourusername/blockchain-voting',
    liveUrl: 'https://blockchain-voting.example.com',
  },
  {
    id: '3',
    title: 'Real-time Collaborative Code Editor',
    description:
      'An online code editor that allows multiple users to collaborate in real-time, with features like syntax highlighting and version control. This project showcases the implementation of WebSocket technology for real-time updates, along with a robust backend system to handle concurrent editing and version management.',
    imageUrl: '/placeholder.svg?height=400&width=600',
    technologies: ['Next.js', 'Socket.io', 'Monaco Editor', 'PostgreSQL'],
    githubUrl: 'https://github.com/yourusername/collab-code-editor',
    liveUrl: 'https://collab-code-editor.example.com',
  },
]

export const projectsSectionId = 'projects'

const MotionCard = motion(Card)
const MotionImage = motion(Image)

export default function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className='py-16' id={projectsSectionId} ref={ref}>
      <div className='container mx-auto px-4'>
        <motion.h2
          className='mb-12 text-center text-4xl font-bold text-foreground'
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Featured Projects
        </motion.h2>
        <div className='space-y-16'>
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`flex flex-col items-center gap-8 lg:flex-row ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className='w-full lg:w-1/2'>
                <div className='relative aspect-video'>
                  <MotionImage
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className='rounded-lg object-cover shadow-lg'
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
                  />
                </div>
              </div>
              <div className='w-full lg:w-1/2'>
                <MotionCard
                  className='h-full'
                  initial={{ x: index % 2 === 0 ? 50 : -50, opacity: 0 }}
                  animate={isInView ? { x: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
                >
                  <CardHeader>
                    <CardTitle className='text-2xl font-semibold'>{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='mb-4 text-muted-foreground'>{project.description}</p>
                    <div className='mb-4 flex flex-wrap gap-2'>
                      {project.technologies.map(tech => (
                        <Badge key={tech} variant='secondary'>
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className='flex justify-start gap-4'>
                    <Button asChild variant='outline'>
                      <Link href={project.githubUrl} target='_blank' rel='noopener noreferrer'>
                        <Github className='mr-2 h-4 w-4' />
                        GitHub
                      </Link>
                    </Button>
                    <Button asChild>
                      <Link href={project.liveUrl} target='_blank' rel='noopener noreferrer'>
                        <ExternalLink className='mr-2 h-4 w-4' />
                        Live Demo
                      </Link>
                    </Button>
                  </CardFooter>
                </MotionCard>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
