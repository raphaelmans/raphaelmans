import HeroButton from './hero-button'
import HeroImage from './hero-image'

const heroContent = {
  name: 'Raphael Mansueto',
  description:
    'Passionate Full-Stack Developer focused on Front-End Engineering. Experienced in React, Next.js, and AI integration, I build scalable web applications and deliver seamless user experiences across industries.',
  tagline:
    'Intelligence-driven, creating reliable solutions focused on scalability and exceptional quality.',
  ctaText: 'Explore My Work',
}

export default function Hero() {
  return (
    <div className='relative overflow-hidden bg-background text-foreground'>
      <div className='container relative z-10 mx-auto flex min-h-screen items-center px-4 py-12 sm:px-6 sm:py-16 lg:px-8'>
        <div className='flex w-full flex-col items-center justify-between lg:flex-row'>
          <div className='max-w-3xl lg:max-w-2xl'>
            <h1 className='mb-4 text-3xl font-extrabold tracking-tight sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl'>
              <span className='block'>Hi, I'm</span>
              <span className='block text-primary'>{heroContent.name}</span>
            </h1>
            <p className='mb-6 text-base text-muted-foreground sm:mb-8 sm:text-lg md:text-xl'>
              {heroContent.description}
            </p>
            <p className='mb-8 text-xl font-semibold text-primary sm:mb-12 sm:text-2xl md:text-3xl'>
              {heroContent.tagline}
            </p>
            <HeroButton text={heroContent.ctaText} />
          </div>
          <HeroImage />
        </div>
      </div>
    </div>
  )
}
