'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

type Experience = {
  company: string
  location: string
  title: string
  period: string
  responsibilities: string[]
  skills: string[]
}

const experiences: Experience[] = [
  {
    company: 'Hustlewing',
    location: 'Illinois, US (Remote)',
    title: 'Lead Front-end Engineer',
    period: 'February 2023 – Present',
    responsibilities: [
      'Spearheaded the migration from Webflow to a fully scalable web application, designing the front-end architecture and driving a 300% increase in user base growth.',
      "Implemented advanced AI technologies, including OpenAI's LLM, to enhance functionality and introduce innovative platform features.",
      'Directed multiple major design overhauls and business-driven feature updates, effectively managing task boards, prioritizing development efforts, and facilitating cross-team communication to ensure smooth adaptation to evolving requirements and timely achievement of key milestones.',
    ],
    skills: ['React', 'Next.js', 'TypeScript', 'AI Integration', 'Project Management'],
  },
  {
    company: 'Outliant',
    location: 'Texas, US (Remote)',
    title: 'Full-Stack Developer',
    period: 'June 2022 – November 2022',
    responsibilities: [
      "Designed and implemented the front-end development of an innovative social media platform website, collaborating closely with the client's back-end team to define and implement key technical requirements.",
      'Assisted in maintaining front-end codebases and accelerated front-end projects that were lagging behind, ensuring timely delivery and adherence to quality standards.',
      'Specialized in building and optimizing form-intensive web applications and admin panels, enhancing overall usability and operational efficiency.',
    ],
    skills: ['Full-Stack Development', 'React', 'Node.js', 'API Integration', 'UI/UX Design'],
  },
  {
    company: 'Vibravid',
    location: 'Michigan, US (Remote)',
    title: 'Junior Software Engineer',
    period: 'June 2021 – March 2022',
    responsibilities: [
      "Resolved critical bugs, enhancing the functionality and reliability of the platform's user interface.",
      "Integrated APIs and blockchain libraries to enable cryptocurrency transactions, significantly improving the platform's user offerings and security.",
      "Developed a custom Telegram bot to manage Syscoin's social presence, enhancing customer engagement and facilitating airdrop giveaways.",
    ],
    skills: ['JavaScript', 'API Integration', 'Blockchain', 'Bot Development', 'Bug Fixing'],
  },
]

export default function WorkExperiencePage() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-background to-background/80'>
      <div className='container mx-auto px-4'>
        <div className='py-16 md:py-24'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='text-center'
          >
            <h1 className='mb-4 text-4xl font-bold text-primary md:text-5xl lg:text-6xl'>
              Work Experience
            </h1>
            <p className='mb-12 text-xl text-muted-foreground md:text-2xl'>
              Explore my professional journey and key achievements
            </p>
          </motion.div>
          <div className='space-y-12'>
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className='overflow-hidden border-primary/20 shadow-lg transition-shadow duration-300 hover:shadow-xl'>
                  <div className='h-2 w-full bg-primary'></div>
                  <CardHeader className='bg-muted/50'>
                    <CardTitle className='flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between'>
                      <div>
                        <h3 className='text-2xl font-semibold text-primary'>{exp.title}</h3>
                        <p className='text-lg text-muted-foreground'>{exp.company}</p>
                      </div>
                      <div className='text-sm text-muted-foreground'>
                        <p>{exp.location}</p>
                        <p className='font-medium'>{exp.period}</p>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='mt-4'>
                    <h4 className='mb-2 text-lg font-semibold'>Key Responsibilities:</h4>
                    <ul className='mb-4 list-disc space-y-2 pl-5'>
                      {exp.responsibilities.map((resp, idx) => (
                        <li key={idx} className='text-sm'>
                          {resp}
                        </li>
                      ))}
                    </ul>
                    <h4 className='mb-2 text-lg font-semibold'>Skills:</h4>
                    <div className='flex flex-wrap gap-2'>
                      {exp.skills.map((skill, idx) => (
                        <Badge key={idx} variant='secondary' className='text-xs'>
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
