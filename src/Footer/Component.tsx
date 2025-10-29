import Link from 'next/link'
import { Container } from '@/components/container'
import { Gutter } from '@/components/gutter'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import type { Footer as FooterType } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'

export async function Footer() {
  const footerData: FooterType = (await getCachedGlobal('footer', 1)()) as FooterType

  const navItems = footerData?.navItems || []

  return (
    <>
      <footer className="mt-auto border-t border-border text-foreground">
        <Container className="flex flex-col gap-8 py-8 md:flex-row md:justify-between">
          <div className="flex w-1/3 gap-2">
            <Link className="flex items-center" href="/">
              <Logo />
            </Link>

            <p className="line-clamp-2 max-w-[12ch] text-balance text-sm font-thin">
              {footerData.slogan ?? 'We Rock'}
            </p>
          </div>

          <div className=" flex-1 shrink">
            <nav className="grid grid-cols-4 gap-x-4 gap-y-2">
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
          </div>

          <div className="grid gap-y-2">
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
