'use client'
import { init, last } from 'effect/Array'
import { pipe } from 'effect/Function'
import { motion } from 'motion/react'
import Link from 'next/link'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { O } from '@/libs/fp.helpers'
import type { Header as HeaderType } from '@/payload-types'
import { MobileMenuContent, MobileMenuTrigger } from '../MobileMenu'

export const HeaderNav = ({ data }: { data: HeaderType }) => {
  const navItems = data?.navItems || []

  const initial_items = pipe(
    init(navItems),
    O.getOrElse(() => []),
  )

  return (
    <>
      <MobileMenuContent>
        <div className="fixed start-6 top-6 flex aspect-square items-center justify-center text-black">
          <Logo />
        </div>

        <nav className="flex flex-1 flex-col justify-end p-4">
          <ul className="flex flex-col gap-4">
            <MobileMenuTrigger asChild>
              <motion.li className="odd:text-end">
                <Link
                  href="/"
                  className="font-heading text-6xl font-thin focus:outline-none focus-visible:underline focus-visible:outline-none sm:text-7xl dark:text-background"
                >
                  Home
                </Link>
              </motion.li>
            </MobileMenuTrigger>

            {initial_items.map(({ link }) => {
              return (
                <MobileMenuTrigger key={link.label} asChild>
                  <motion.li className="odd:text-end">
                    <CMSLink
                      {...link}
                      className="font-heading text-6xl font-thin focus:outline-none focus-visible:underline focus-visible:outline-none sm:text-7xl dark:text-background"
                      appearance="inline"
                    />
                  </motion.li>
                </MobileMenuTrigger>
              )
            })}
          </ul>
        </nav>
      </MobileMenuContent>

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
