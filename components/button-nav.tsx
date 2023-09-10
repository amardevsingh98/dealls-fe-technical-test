"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button, ButtonProps } from '@/components/ui/button'

interface ButtonNavProps extends ButtonProps {
  href: string
  children: React.ReactNode
  className?: string
}

export default function ButtonNav({ children, href, className, variant, disabled, ...rest }: ButtonNavProps) {
  const currentRoute = usePathname()
  const isActive = currentRoute === href

  return (
    <Link 
      href={href}
      style={{ pointerEvents: disabled ? 'none' : 'auto' }}
    >
      <Button
        {...rest} 
        variant={variant ? variant : isActive ? 'secondary' : 'ghost'} 
        className={className}
      >
        {children}
      </Button>
    </Link>
  )
}
