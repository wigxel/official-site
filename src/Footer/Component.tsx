import Link from 'next/link'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import type { Footer as FooterData } from '@/payload-types'
// import { ThemeSelector } from "@/providers/Theme/ThemeSelector";
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Container } from '@/components/container'

export async function Footer() {
  const footerData: FooterData = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto border-t border-border text-foreground">
      <Container className="py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        <div className="w-1/3 flex gap-2">
          <Link className="flex items-center" href="/">
            <Logo />
          </Link>

          <p className="text-sm font-thin line-clamp-2 max-w-[12ch] text-balance">
            {footerData.slogan ?? 'We Rock'}
          </p>
        </div>

        <div className=" flex-1 shrink">
          <nav className="grid gap-x-4 gap-y-2 grid-cols-4">
            {navItems.map(({ link }, i) => {
              return (
                <CMSLink
                  className="tracking-wider text-foreground/60 hover:text-accent-foreground uppercase text-xs font-thin"
                  key={i}
                  {...link}
                />
              )
            })}
          </nav>
        </div>

        {/*<div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <ThemeSelector />
        </div>>*/}
      </Container>
    </footer>
  )
}
