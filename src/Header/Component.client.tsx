'use client'
import { useEffectEvent } from '@payloadcms/ui'
import Link from 'next/link'
import type React from 'react'
import { startTransition, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Container } from '@/components/container'
import { Logo } from '@/components/Logo/Logo'
import type { Header } from '@/payload-types'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { MobileMenu, MobileMenuTrigger } from './MobileMenu'
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
    <MobileMenu>
      <header className="sticky top-0 z-20" {...(theme ? { 'data-theme': theme } : {})}>
        <Container className="wg-grid-1 py-4 md:py-8">
          <Link href="/" className="col-span-3 flex justify-start md:relative md:col-span-4">
            <div className="text-white">
              <Logo className="h-12 w-12 md:h-12 md:w-12" />
            </div>
          </Link>

          <div className="col-span-3 hidden md:block"></div>

          <div className="flex justify-end md:col-span-5 md:hidden">
            {typeof window !== 'undefined'
              ? createPortal(
                <div className="fixed right-4 top-4 z-[11100] md:hidden">
                  <MobileMenuTrigger asChild>
                    <button type="button" className="icon-cross">
                      <span className="cross-circ"></span>
                      <span className="cross-circ"></span>
                      <span className="cross-circ"></span>
                      <span className="cross-circ"></span>
                      <span className="cross-line">
                        <span className="cross-line-1"></span>
                        <span className="cross-line-2"></span>
                      </span>
                    </button>
                  </MobileMenuTrigger>
                </div>,
                document.body,
              )
              : null}
          </div>

          <div className="hidden md:col-span-5 md:block">
            <HeaderNav data={data} />
          </div>
        </Container>
      </header>
    </MobileMenu>
  )
}
