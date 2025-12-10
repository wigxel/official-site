'use client'
import 'locomotive-scroll/dist/locomotive-scroll.css'
import { useEffectEvent } from '@payloadcms/ui'
import type LocomotiveScroll from 'locomotive-scroll'
import { throttle } from 'lodash-es'
import Link from 'next/link'
import React, { startTransition, useEffect, useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { createStore, useStore } from 'zustand'
import { Container } from '@/components/container'
import { Logo } from '@/components/Logo/Logo'
import { cn } from '@/libs/utils'
import type { Header } from '@/payload-types'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { MobileMenu, MobileMenuTrigger } from './MobileMenu'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

const headerSharedState = createStore<{ sticky: boolean }>()(() => {
  return { sticky: true }
})

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

  useObserveOffset()
  useLocomotive()

  useEffect(() => {
    updateTheme()
  }, [])

  return (
    <MobileMenu>
      <header className="sticky top-0 z-20" {...(theme ? { 'data-theme': theme } : {})}>
        <BackgroundDrop />

        <Container
          className={cn('wg-grid-1 transition-default relative z-20 items-center', {
            'py-4 md:py-4': true,
          })}
        >
          <div className="col-span-3 flex justify-start text-white md:relative md:col-span-4">
            <Link href="/" className="">
              <SmartLogo />
            </Link>
          </div>

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

function BackgroundDrop() {
  const state = useStore(headerSharedState)

  return (
    <div
      className={cn(
        'transition-default not-sr-only absolute inset-x-0 bottom-full top-0 z-10 items-center bg-background',
        {
          'bottom-0': state.sticky,
        },
      )}
    />
  )
}

function SmartLogo() {
  const store = useStore(headerSharedState)

  return (
    <Logo className="h-12 w-12 md:h-12 md:w-12" fillMode={store.sticky ? 'outline' : 'default'} />
  )
}

function useObserveOffset() {
  useLayoutEffect(() => {
    const throttleUpdate = throttle((prop: { sticky: boolean }) => {
      headerSharedState.setState(prop)
    }, 500)

    if (typeof window === 'undefined') return

    const getHeaderHeight = () => {
      const header = document.querySelector('header.sticky') ?? document.querySelector('header')
      return (header as HTMLElement | null)?.offsetHeight ?? 0
    }

    const onScrollOrResize = () => {
      const offset = window.pageYOffset ?? document.documentElement.scrollTop ?? 0
      const headerHeight = getHeaderHeight()

      // If the page offset is greater than the header height, use 'outline', otherwise 'default'
      throttleUpdate({ sticky: offset > headerHeight })
    }

    onScrollOrResize()
    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize)
    return () => {
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
    }
  }, [])
}

function useLocomotive() {
  const locoInstanceRef = React.useRef(null)

  useEffect(() => {
    const scrollRef = { current: document.body.querySelector('article') }

    let scroll: LocomotiveScroll | null = null
      ; (async () => {
        const el = scrollRef.current
        if (!el) return

        const LocomotiveScroll = (await import('locomotive-scroll')).default

        // Initialize Locomotive( )Scroll
        scroll = new LocomotiveScroll({})
      })()

    // Important: clean up on unmount
    return () => {
      scroll?.destroy?.()
      locoInstanceRef.current = null
    }
  }, [])
}
