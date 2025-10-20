import { Container } from '@/components/container'

export default function CaseStudy() {
  const siteIsLive = true

  return (
    <section className="flex flex-col gap-[calc(100rem/16)]">
      <Container className="flex flex-col gap-[calc(32rem/16)]">
        <nav>
          <ul className="flex gap-2 text-muted-foreground">
            <li className="text-foreground">
              <a href="/portfolio">Portfolio</a>
            </li>
            /<li className="text-accent-foreground">Demi Samande</li>
          </ul>
        </nav>

        <div className="wg-grid-1">
          <div className="col-span-6 flex flex-col gap-6">
            <h1 className="font-heading uppercase text-display-1">Demi Samande</h1>

            <p className="text-base">
              A dynamic digital home for Demi Samande—author, founder, and visionary — crafted to
              inspire, connect, and empower Africa’s next generation of innovators.
            </p>

            {siteIsLive ? (
              <a className="text-accent-foreground font-thin" href="https://demisamande.com">
                Visit Live Site
              </a>
            ) : null}
          </div>
        </div>

        <div className="flex"></div>
      </Container>

      <Container className="flex flex-col gap-[calc(64rem/16)]">
        <div className="aspect-[1340/848] w-full bg-gray-800 rounded-lg"></div>

        <div className="wg-grid-1">
          <div className="wg-grid-1 col-span-8 leading-[2ex] w-full">
            <div className="flex flex-col gap-2 col-span-6">
              <h2 className="opacity-70">Client</h2>
              <p>Demi Samande</p>
            </div>

            <div className="flex flex-col gap-2 col-span-6">
              <h2 className="opacity-70">Scope</h2>
              <p>Branding + Web Design + Development</p>
            </div>

            <div className="flex flex-col gap-2 col-span-6">
              <h2 className="opacity-70">Project Type</h2>
              <p>Portfolio</p>
            </div>

            <div className="flex flex-col gap-2 col-span-6">
              <h2 className="opacity-70">Sector</h2>
              <p>Personal Branding</p>
            </div>
          </div>
        </div>
      </Container>

      <Container className="flex flex-col gap-[calc(100rem/16)]">
        <div className="wg-grid-1">
          <h2 className="font-heading text-display-1 col-span-4">
            The
            <br />
            Brief
          </h2>
          <p className="text-muted-foreground col-span-4 text-balance">
            Demi reached out to us with the need to grow her visibility. Her goal was to create an
            online presence where people could see everything she does professionally, establishing
            her work as a founder, speaker, author, podcaster and innovator. Her new book was also
            to be launched soon and she wanted to drive sales through her engagements.
          </p>
        </div>

        <div className="w-full aspect-[1340/873] bg-gray-800" />
        <div className="wg-grid-1">
          <h2 className="font-heading text-display-1 col-span-4">Solution</h2>
          <p className="text-muted-foreground col-span-4 text-balance">
            Demi reached out to us with the need to grow her visibility. Her goal was to create an
            online presence where people could see everything she does professionally, establishing
            her work as a founder, speaker, author, podcaster and innovator. Her new book was also
            to be launched soon and she wanted to drive sales through her engagements.
          </p>
        </div>

        <div className="wg-grid-1">
          <div className="col-span-6 aspect-[660/500] bg-blue-700"></div>
          <div className="col-span-6 aspect-[660/500] bg-orange-600"></div>
        </div>

        <div className="wg-grid-1">
          <div className="col-span-4" />
          <div className="flex flex-col gap-4 col-span-4 text-lg">
            <p className="text-muted-foreground col-span-4 text-balance w-full">
              Demi reached out to us with the need to grow her visibility. Her goal was to create an
              online presence where people could see everything she does professionally,
              establishing her work as a founder, speaker, author, podcaster and innovator. Her new
              book was also to be launched soon and she wanted to drive sales through her
              engagements.
            </p>
          </div>
          <div className="col-span-4" />
        </div>

        <div className="w-full aspect-[1340/843] bg-gray-800" />

        <div className="wg-grid-1">
          <div className="col-span-4" />
          <div className="flex flex-col gap-4 col-span-4">
            <p className="text-foreground col-span-4 text-xl text-center w-full">
              Overall, we were able to design a website that aligned with Demi expertise and
              professional taste, positioning her to the right audience and gaining visibility
            </p>
          </div>
          <div className="col-span-4" />
        </div>

        <div className="wg-grid-1">
          <div className="col-span-4 aspect-[433/500] bg-blue-700"></div>
          <div className="col-span-4 aspect-[433/500] bg-slate-700"></div>
          <div className="col-span-4 aspect-[433/500] bg-orange-600"></div>
        </div>
      </Container>

      <Container>
        <div className="wg-grid-1 !gap-11">
          <div className="flex flex-col col-span-7 gap-8">
            <span className="text-accent-foreground">NEXT STEPS</span>

            <div className="flex flex-col gap-6">
              <h2 className="text-display-1 font-heading uppercase">
                Majeurs
                <br />
                Holdings
              </h2>
            </div>
          </div>

          <div className="col-span-full aspect-[1340/275] bg-gray-800"></div>
        </div>
      </Container>
    </section>
  )
}
