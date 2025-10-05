'use client'
import { CMSLink } from '@/components/Link'
import type { Header as HeaderType } from '@/payload-types'

export const HeaderNav = ({ data }: { data: HeaderType }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="flex gap-5 items-center">
      {navItems.map(({ link }, i) => {
        if (link.label.toLowerCase() === 'work with us') {
          return (
            <CMSLink
              key={i}
              {...link}
              className="font-thin last:ml-4 text-accent-foreground text-base"
              appearance="link"
            />
          )
        }

        return <CMSLink key={i} {...link} className="font-thin text-base" appearance="link" />
      })}
    </nav>
  )
}
