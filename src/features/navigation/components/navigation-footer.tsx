import Link from 'next/link'
import { Github, Linkedin, Mail } from 'lucide-react'

const contactLinks = [
  { name: 'GitHub', icon: Github, href: 'https://github.com/raphaelmans' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/raphaelmansueto' },
  { name: 'Email', icon: Mail, href: 'mailto:raphaelmansueto@gmail.com' },
]

export default function NavigationFooter() {
  return (
    <footer className='border-t bg-background'>
      <div className='container mx-auto px-4 py-8'>
        <div className='flex flex-col items-center justify-center space-y-4'>
          <div className='flex space-x-4'>
            {contactLinks.map(link => (
              <Link
                key={link.name}
                href={link.href}
                target='_blank'
                rel='noopener noreferrer'
                className='text-muted-foreground transition-colors hover:text-primary'
                aria-label={`Contact via ${link.name}`}
              >
                <link.icon className='h-6 w-6' />
              </Link>
            ))}
          </div>
          <p className='text-sm text-muted-foreground'>
            © {new Date().getFullYear()} Your Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
