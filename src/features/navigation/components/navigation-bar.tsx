'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const navigationItems = [
  { href: '/work-experience', label: 'Work Experience', variant: 'ghost' },
  { href: '/blogs', label: 'Blogs', variant: 'ghost' },
  { href: '/contact', label: 'Contact Me', variant: 'outline' },
] as const

const MotionLink = motion(Link)
const MotionButton = motion(Button)

function NavigationBar({ className }: { className?: string }) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'flex items-center justify-between bg-background/95 px-6 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        className,
      )}
    >
      <MotionLink
        href='/'
        className='text-2xl font-bold text-primary transition-colors hover:text-primary/80'
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        RM
      </MotionLink>
      <div className='hidden items-center space-x-4 md:flex'>
        {navigationItems.map(({ href, label, variant }, index) => (
          <MotionButton
            key={href}
            variant={variant}
            asChild
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
          >
            <Link
              href={href}
              className={cn(
                'transition-colors',
                variant === 'outline'
                  ? 'text-foreground hover:text-primary'
                  : 'text-foreground/80 hover:text-foreground',
              )}
            >
              {label}
            </Link>
          </MotionButton>
        ))}
      </div>
      <motion.div
        className='md:hidden'
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='icon'>
              <Menu className='h-5 w-5' />
              <span className='sr-only'>Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-[200px]'>
            {navigationItems.map(({ href, label }) => (
              <DropdownMenuItem key={href} asChild>
                <Link href={href} className='w-full'>
                  {label}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>
    </motion.nav>
  )
}

export default NavigationBar
