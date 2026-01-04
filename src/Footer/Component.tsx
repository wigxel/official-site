import Link from 'next/link'
import { Container } from '@/components/container'
import { Gutter } from '@/components/gutter'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { safeArray } from '@/libs/data.helpers'
import { Arr, pipe } from '@/libs/fp.helpers'
import type { Footer as FooterType } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'

export async function Footer() {
  const footerData: FooterType = (await getCachedGlobal('footer', 1)()) as FooterType

  const navItems = footerData?.navItems || []

  return (
    <>
      <footer className="mt-auto border-t border-border text-foreground">
        <Container className="flex flex-col gap-8 py-8 md:flex-row md:justify-between">
          <div className="flex items-center gap-2 md:w-1/3">
            <Link className="flex items-center" href="/">
              <Logo />
            </Link>
            <p className="line-clamp-2 max-w-[12ch] text-balance text-sm font-thin leading-[2.2ex]">
              {footerData.slogan ?? 'We Rock'}
            </p>
          </div>

          <div className="flex-1 shrink">
            <nav className="hidden grid-cols-2 gap-x-4 gap-y-2 md:grid md:grid-cols-4">
              {navItems.map(({ link }, i) => {
                return (
                  <CMSLink
                    className="text-foreground/60 text-xs font-thin uppercase tracking-wider hover:text-accent-foreground"
                    key={i}
                    {...link}
                  />
                )
              })}
            </nav>
            <nav className="grid grid-cols-2 gap-x-4 gap-y-2">
              {pipe(
                Object.groupBy(navItems, (e) => (e.link.newTab ? 'internal' : 'external')),
                (e) => {
                  const arr = []
                  const inner = safeArray(e.internal)
                  const outer = safeArray(e.external)
                  const longest = Math.max(inner.length, outer.length)

                  for (let x = 0; x < longest; x++) {
                    if (x in outer) arr.push(outer[x])
                    if (x in inner) arr.push(inner[x])
                  }

                  return arr
                },
                Arr.map(({ link }, i) => {
                  return (
                    <CMSLink
                      className="text-foreground/60 text-xs font-thin uppercase tracking-wider hover:text-accent-foreground"
                      key={i}
                      {...link}
                    />
                  )
                }),
              )}
            </nav>
          </div>

          <div className="flex gap-2 gap-y-2 md:grid">
            <div className="text-foreground/60 text-xs font-thin uppercase tracking-wider hover:text-accent-foreground">
              &copy;
            </div>
            <div className="text-foreground/60 text-xs font-thin uppercase tracking-wider hover:text-accent-foreground">
              {new Date().getFullYear()}
            </div>
          </div>

          {/*<div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <ThemeSelector />
        </div>>*/}
        </Container>
      </footer>

      <Gutter
        breakpoints={[
          {
            type: 'stretch',
            columns: 12,
            gutter: 20,
            margin: 0,
            maxWidth: 1640,
          },
        ]}
      />
    </>
  )
}
