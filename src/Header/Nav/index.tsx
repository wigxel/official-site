'use client'
import { init, last } from 'effect/Array'
import { pipe } from 'effect/Function'
import { motion } from 'motion/react'
import Link from 'next/link'
import React from 'react'
import { CMSLink } from '@/components/Link'
import { O } from '@/libs/fp.helpers'
import { cn } from '@/libs/utils'
import type { Header as HeaderType } from '@/payload-types'
import { MenuContext, MobileMenuContent, MobileMenuTrigger } from '../MobileMenu'

export const HeaderNav = ({ data }: { data: HeaderType }) => {
  const navItems = data?.navItems || []

  const initial_items = pipe(
    init(navItems),
    O.getOrElse(() => []),
  )

  return (
    <>
      <MobileNav items={initial_items} />

      <nav className="flex items-center gap-5">
        <div className="flex flex-1 gap-6">
          {initial_items.map(({ link }) => {
            return (
              <CMSLink
                key={link.label}
                {...link}
                className="text-base font-thin"
                appearance="link"
              />
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
    </>
  )
}

function MobileNav({ items: initial_items }: { items: any[] }) {
  const ctx = React.useContext(MenuContext)

  return (
    <MobileMenuContent className="text-black">
      <div className="absolute start-4 top-4 flex items-center justify-center text-sm font-semibold text-black">
        WIGXEL STUDIO
      </div>

      <nav className="flex flex-1 flex-col justify-center p-4 pt-[var(--header-height)]">
        <ul className="flex flex-col gap-4">
          <MobileMenuTrigger asChild>
            <motion.li className="odd:text-">
              <Link
                href="/"
                className="font-heading text-7xl font-thin focus:outline-none focus-visible:underline focus-visible:outline-none sm:text-7xl dark:text-background"
              >
                Home
              </Link>
            </motion.li>
          </MobileMenuTrigger>

          {initial_items.map(({ link }, index) => {
            return (
              <MobileMenuTrigger key={link.label} asChild>
                <motion.li
                  className={cn('odd:text-en opacity-20', {
                    '': ctx.open,
                  })}
                  style={{ textIndent: (index + 1) * 20 }}
                >
                  <CMSLink
                    {...link}
                    className="font-heading text-7xl font-thin focus:outline-none focus-visible:underline focus-visible:outline-none sm:text-7xl dark:text-background"
                    appearance="inline"
                  />
                </motion.li>
              </MobileMenuTrigger>
            )
          })}
        </ul>
      </nav>

      <div className="flex items-end justify-between p-4 text-sm">
        <span>&copy; {new Date().getFullYear()}</span>

        <p className="flex flex-col items-end text-end">
          <span>Lagos, Nigeria</span>
          <span>4.844938, 6.974811</span>
        </p>
      </div>
    </MobileMenuContent>
  )
}
