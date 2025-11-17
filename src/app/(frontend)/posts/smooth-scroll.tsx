'use client'

import { Slot } from '@radix-ui/react-slot'
import { type AnimationPlaybackControlsWithThen, animate } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { getCssVarInPx } from '@/libs/utils'

export function SmoothScroll({ el, children }: { el: string; children: React.ReactNode }) {
  const animationRef = useRef<AnimationPlaybackControlsWithThen>(null)

  const [isActive, setIsActive] = useState<boolean>(() => {
    // initial check: compare current location.hash to the el prop
    return typeof window !== 'undefined' ? window.location.hash === el : false
  })

  useEffect(() => {
    const controller = new AbortController()

    const handler = () => {
      setIsActive(window.location.hash === el)
    }

    window.addEventListener('hashchange', handler, { signal: controller.signal })

    handler()

    return () => {
      controller.abort()
    }
  }, [el])

  return (
    <Slot
      className={el}
      data-active={isActive ? 'true' : false}
      onClick={() => {
        const element = document.querySelector(el) as HTMLElement | null

        if (!element) return

        // optimistically mark as active before starting the animation
        setIsActive(true)

        const headerHeight = getCssVarInPx(document, '--header-height')

        const target = window.scrollY + element.getBoundingClientRect().top - headerHeight

        // stop any running animation
        if (animationRef.current && typeof animationRef.current.stop === 'function') {
          animationRef.current.stop()
        }

        // animate from current scroll position to target using framer-motion's animate util
        animationRef.current = animate(window.scrollY, target, {
          type: 'tween',
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
          onUpdate: (v) => {
            window.scrollTo(0, v)
          },
          onComplete: () => {
            // update the URL hash with the element's id after the animation completes
            if (element.id) {
              // fallback to setting hash if replaceState is not available for some reason
              location.hash = `#${element.id}`

              // revalidate active state after updating the hash
              setIsActive(window.location.hash === el)
            }
          },
        })
      }}
    >
      {children}
    </Slot>
  )
}
