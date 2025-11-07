'use client'
import { useEffectEvent } from '@payloadcms/ui'
import Image from 'next/image'
import Link from 'next/link'
import type React from 'react'
import { startTransition, useEffect, useState } from 'react'
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

  const updateTheme = useEffectEvent(() => {
    startTransition(() => {
      setHeaderTheme(null)
      if (headerTheme && headerTheme !== theme) {
        setTheme(headerTheme)
      }
    })
  })
  useEffect(() => {
    updateTheme()
  }, [])

  return (
    <header className="sticky top-0 z-20" {...(theme ? { 'data-theme': theme } : {})}>
      <Container className="wg-grid-1 py-8">
        <Link href="/" className="col-span-3 flex justify-start md:col-span-4">
          <div>
            <Logo className="invert dark:invert-0" />
          </div>
        </Link>

        <div className="col-span-3 hidden md:block"></div>

        <div className="flex justify-end md:col-span-5 md:hidden">
          <button className="appearance-none" type="button">
            <Image
              src="/assets/menu-icon.svg"
              alt="Icons"
              className="aspect-[24.06/18] w-6"
              width={24.06}
              height={18}
            />
          </button>
        </div>

        <div className="hidden md:col-span-5 md:block">
          <HeaderNav data={data} />
        </div>
      </Container>
    </header>
  )
}
