'use client'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { pipe } from 'effect/Function'
import { take, init, last } from 'effect/Array'
import { O } from '@/libs/fp.helpers'

export const HeaderNav = ({ data }: { data: HeaderType }) => {
  const navItems = data?.navItems || []
  const initial_items = pipe(
    init(navItems),
    O.getOrElse(() => []),
  )

  return (
    <nav className="flex gap-5 items-center">
      <div className='flex-1 flex gap-6'>
        {initial_items.map(({ link }) => {
          return <CMSLink key={link.label} {...link} className="font-thin text-base" appearance="link" />
        })}
      </div>

      {pipe(
        last(navItems),
        O.match({
          onSome: ({link}) => {
            return (
              <CMSLink
                key={link.label}
                {...link}
                className="font-thin last:ml-4 text-accent-foreground text-base"
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
