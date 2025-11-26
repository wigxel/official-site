'use client'
import { useEffect, useRef, useState } from 'react'
import { cn, scrollTo } from '@/libs/utils'

export function ArticleContext({
  headings,
}: {
  headings: Array<{
    id: string
    title: string
  }>
}) {
  const [activeHeadingId, setActiveHeadingId] = useState<string | null>(null)
  const headingRefs = useRef<{ [key: string]: number }>({})

  useEffect(() => {
    headingRefs.current = {}
    const headings = Array.from(document.querySelectorAll('h2')).map((el, index) => ({
      el,
      id: String(index),
    }))

    headings.forEach((heading) => {
      headingRefs.current[heading.id] = heading.el.offsetTop
    })

    const handleScroll = () => {
      const scrollY = window.scrollY
      const twentyPercentOfViewportHeight = window.innerHeight * 0.2

      let currentActiveId: string | null = null
      for (const heading of headings) {
        const offsetTop = headingRefs.current[heading.id]

        if (offsetTop !== undefined) {
          if (scrollY + twentyPercentOfViewportHeight >= offsetTop) {
            currentActiveId = heading.id
          } else {
            // Assuming headings are in order, once we pass a heading,
            // the previous one (if any) is the active one, or it's none yet.
            break
          }
        }
      }
      setActiveHeadingId(currentActiveId)
    }

    window.addEventListener('scroll', handleScroll)
    // Call once on mount to set initial active heading
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [headings])

  const handleLinkClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, id: string) => {
    e.preventDefault()
    const offset = headingRefs.current[id]

    if (offset !== undefined) {
      scrollTo({ offset })
    }
  }

  return (
    <aside className="top-[var(--header-height)] hidden w-1/4 shrink flex-col gap-4 md:sticky md:flex">
      <h4 className="pt-4 text-xs uppercase tracking-widest text-gray-300">Quick Glance</h4>

      <div className="group/root relative">
        <ul
          role="status"
          className="pointer-events-none flex select-none flex-col gap-3 group-hover/root:opacity-0"
        >
          {headings.map((e, index) => {
            const isActive = String(index) === activeHeadingId

            return (
              <li
                key={e.id}
                className={cn('group flex flex-col gap-px', {
                  'text-foreground opacity-60': !isActive,
                })}
                data-active={isActive}
              >
                <span className="flex items-center gap-1 text-sm tabular-nums">
                  <span className="transition-default inline-block w-4 border-b-2 border-foreground opacity-50 group-data-[active=true]:w-6 group-data-[active=true]:opacity-100" />
                </span>
              </li>
            )
          })}
        </ul>

        <ul className="transition-default bg-background/80 absolute left-0 top-0 z-20 flex max-w-[30ch] flex-col gap-3 text-pretty opacity-0 group-hover/root:opacity-100">
          {headings.map((e, index) => {
            const isActive = String(index) === activeHeadingId

            return (
              <li
                key={e.id}
                className={cn('group flex flex-col gap-px', {
                  'text-foreground opacity-60': !isActive,
                })}
                data-active={isActive}
                onClick={(event) => handleLinkClick(event, String(index))}
              >
                <span
                  className={cn(
                    'cursor-pointer text-sm hover:underline',
                    isActive ? 'text-gray-200' : 'text-foreground opacity-60',
                  )}
                >
                  {e.title ?? 'No Content'}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </aside>
  )
}
