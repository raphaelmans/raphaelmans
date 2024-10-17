'use client'

import { motion } from 'framer-motion'
import HeroButton from './hero-button'

const heroContent = {
  name: 'Raphael Mansueto',
  description:
    'Passionate Full-Stack Developer focused on Front-End Engineering. Experienced in React, Next.js, and AI integration, I build scalable web applications and deliver seamless user experiences across industries.',
  tagline:
    'Building innovative, scalable solutions that enhance digital experiences and drive growth.',
  ctaText: 'Explore My Work',
}

export default function Hero() {
  return (
    <div className='relative overflow-hidden bg-background text-foreground'>
      <div className='container relative z-10 mx-auto flex min-h-screen items-center px-4 py-12 sm:px-6 sm:py-16 lg:px-8'>
        <div className='max-w-3xl'>
          <motion.h1
            className='mb-4 text-3xl font-extrabold tracking-tight sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span
              className='block'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Hi, I'm
            </motion.span>
            <motion.span
              className='block text-primary'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {heroContent.name}
            </motion.span>
          </motion.h1>
          <motion.p
            className='mb-6 text-base text-muted-foreground sm:mb-8 sm:text-lg md:text-xl'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {heroContent.description}
          </motion.p>
          <motion.p
            className='mb-8 text-xl font-semibold text-primary sm:mb-12 sm:text-2xl md:text-3xl'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {heroContent.tagline}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <HeroButton text={heroContent.ctaText} />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
