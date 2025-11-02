'use client'
import { init, last } from 'effect/Array'
import { pipe } from 'effect/Function'
import { CMSLink } from '@/components/Link'
import { O } from '@/libs/fp.helpers'
import type { Header as HeaderType } from '@/payload-types'

export const HeaderNav = ({ data }: { data: HeaderType }) => {
  const navItems = data?.navItems || []

  const initial_items = pipe(
    init(navItems),
    O.getOrElse(() => []),
  )

  return (
    <nav className="flex items-center gap-5">
      <div className="flex flex-1 gap-6">
        {initial_items.map(({ link }) => {
          return (
            <CMSLink key={link.label} {...link} className="text-base font-thin" appearance="link" />
          )
        })}
      </div>

      {pipe(
        last(navItems),
        O.match({
          onSome: ({ link }) => {
            return (
              <CMSLink
                key={link.label}
                {...link}
                className="text-base font-thin text-accent-foreground last:ml-4"
                appearance="link"
              />
            )
          },
          onNone: () => null,
        }),
      )}
    </nav>
  )
}
