'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type React from 'react'
import { useEffect, useState } from 'react'
import { Container } from '@/components/container'
import { Logo } from '@/components/Logo/Logo'
import type { Header } from '@/payload-types'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const _pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
     
  }, [setHeaderTheme])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
     
  }, [headerTheme, theme])

  return (
    <header className="sticky top-0 z-20" {...(theme ? { 'data-theme': theme } : {})}>
      <Container className="wg-grid-1 py-8">
        <Link href="/" className="col-span-4 flex justify-start">
          <div>
          <Logo className="invert dark:invert-0" />
          </div>
        </Link>
        <div className="col-span-3"></div>
        <div className="col-span-5">
          <HeaderNav data={data} />
        </div>
      </Container>
    </header>
  )
}
