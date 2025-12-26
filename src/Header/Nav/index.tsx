'use client'
import { init, last } from 'effect/Array'
import { pipe } from 'effect/Function'
import { isNil } from 'lodash-es'
import { motion, stagger, type Variants } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useContext } from 'react'
import { CMSLink, useLink } from '@/components/Link'
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
  const ctx = useContext(MenuContext)

  return (
    <MobileMenuContent className="overflow-hidden text-black">
      <div className="absolute start-4 top-4 flex items-center justify-center text-sm tracking-[0.2ch] text-black">
        WIGXEL STUDIO
      </div>

      <nav className="flex flex-1 flex-col justify-center p-4 pt-[var(--header-height)]">
        <motion.ul
          variants={menuListVariant}
          initial="hide"
          whileInView={'show'}
          className="flex flex-col gap-4"
        >
          <MenuLink index={0} label="Home" url="/" />

          {initial_items.map(({ link }, index) => {
            return <MenuLink {...link} index={index + 1} key={link.label} />
          })}
        </motion.ul>
      </nav>

      <div className="flex items-end justify-between p-4 text-sm">
        <span>&copy; {new Date().getFullYear()}</span>

        <p className="flex flex-col items-end text-end text-xs uppercase tracking-[0.2ch]">
          <span>PH, Nigeria</span>
          <a href="https://maps.app.goo.gl/JqjS85YWRMQoNYRL9" target="_blank" rel="noreferrer">
            <span className="underline">4.85021, 6.97786</span>
          </a>
        </p>
      </div>

      <div className="wavyline">
        <div className="wavyline-content" />
      </div>
    </MobileMenuContent>
  )
}

const menuListVariant: Variants = {
  show: {
    transition: { delayChildren: stagger(0.2) },
  },
  hide: {
    transition: { delayChildren: 0 },
  },
}

const menuItemVariant: Variants = {
  hide: {
    x: 0,
    opacity: 100,
    transition: {
      delay: 0,
    },
  },
  show: {
    x: `var(--indent)`,
    // opacity: 100,
    transition: {
      ease: 'easeIn',
      delay: 0.4,
    },
  },
}

const MenuLink = React.forwardRef<
  React.ComponentRef<'a'>,
  { index: number; label: string } & React.ComponentProps<typeof CMSLink>
>(function MenuLink_({ index, ...link }, ref) {
  const pathname = usePathname()
  const link_props = useLink(link)

  const isActive = (path?: `/${string}`) => {
    if (isNil(path)) return false

    if (path.length > 1) {
      return pathname.startsWith(path) && pathname.includes(path)
    }

    return pathname === path
  }

  const link_is_active = isActive(`${link_props?.href}` as `/${string}`)

  return (
    <MobileMenuTrigger asChild>
      <motion.li
        variants={menuItemVariant}
        data-active={link_is_active}
        className={'odd:text-en mobile-nav-menu-item select-none'}
        style={{
          '--indent': `${index * 8}vw`,
        }}
      >
        <Link
          ref={ref}
          className={cn(
            'font-heading text-7xl font-thin focus:outline-none focus-visible:underline focus-visible:outline-none sm:text-7xl dark:text-background',
          )}
          href={link_props?.href ?? ''}
          {...link_props?.newTabProps}
        >
          {link_props?.label}
        </Link>
      </motion.li>
    </MobileMenuTrigger>
  )
})
