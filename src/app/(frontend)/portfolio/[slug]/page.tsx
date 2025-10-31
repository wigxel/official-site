"use server"
import configPromise from '@payload-config'
import { capitalize } from 'effect/String'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { cache } from 'react'
import { PortfolioRenderBlocks, RenderBlocks } from '@/blocks/RenderBlocks'
import { Container } from '@/components/container'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { safeArray, safeStr } from '@/libs/data.helpers'

type Props = {
  params: Promise<{
    slug: string
  }>
}


const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'portfolios',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})


export default async function CaseStudy({ params: paramsPromise }: Props) {
  const { isEnabled: draft } = await draftMode()

  const { slug = 'home' } = await paramsPromise
  const url = `/${slug}`

  const page: RequiredDataFromCollectionSlug<'portfolios'> | null = await queryPageBySlug({
    slug,
  })

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { name, basic, layout } = page

  const siteIsLive = !draft;
  const portfolio = basic;

  console.log(basic);

  return (
    <section className="flex flex-col gap-[calc(100rem/16)]">
      <Container className="flex flex-col gap-[calc(32rem/16)]">
        <nav>
          <ul className="flex gap-2 text-muted-foreground">
            <li className="text-foreground">
              <Link prefetch href="/portfolio">Portfolio</Link>
            </li>
            /<li className="text-accent-foreground">{name}</li>
          </ul>
        </nav>

        <div className="wg-grid-1">
          <div className="col-span-6 flex flex-col gap-6">
            <h1 className="font-heading text-display-1 uppercase">{name}</h1>

            <p className="text-base">{portfolio.short_description}</p>

            {portfolio.url !== "#" ? (
              <a className="font-thin text-accent-foreground" target='_blank' rel='noreferrer noopener' href={portfolio.url}>
                Visit Live Site
              </a>
            ) : null}
          </div>
        </div>

        <div className="flex"></div>
      </Container>

      <Container className="flex flex-col gap-[calc(64rem/16)]">
        <div className="aspect-[1340/848] w-full rounded-lg bg-gray-800"></div>

        <div className="wg-grid-1">
          <div className="wg-grid-1 col-span-8 w-full leading-[2ex]">
            <div className="col-span-6 flex flex-col gap-2">
              <h2 className="opacity-70">Client</h2>
              <p>{portfolio.client}</p>
            </div>

            <div className="col-span-6 flex flex-col gap-2">
              <h2 className="opacity-70">Scope</h2>
              <p>
                {safeArray(portfolio.scope ?? [])
                  .map((e) => {
                    // @ts-expect-error No worries
                    return capitalize(safeStr(e?.service?.title, '--').toLowerCase())
                  })
                  .join(' + ')}
              </p>
            </div>

            <div className="col-span-6 flex flex-col gap-2">
              <h2 className="opacity-70">Project Type</h2>
              <p>{portfolio.project_type}</p>
            </div>

            <div className="col-span-6 flex flex-col gap-2">
              <h2 className="opacity-70">Sector</h2>
              <p>{portfolio.sector}</p>
            </div>
          </div>
        </div>
      </Container>


      <Container className="flex flex-col gap-[calc(100rem/16)]">
        <RenderBlocks blocks={layout} />

        <div className="aspect-[1340/873] w-full bg-gray-800" />
        <div className="wg-grid-1">
          <h2 className="col-span-4 font-heading text-display-1">Solution</h2>
          <p className="col-span-4 text-balance text-muted-foreground">
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
          <div className="col-span-4 flex flex-col gap-4 text-lg">
            <p className="col-span-4 w-full text-balance text-muted-foreground">
              Demi reached out to us with the need to grow her visibility. Her goal was to create an
              online presence where people could see everything she does professionally,
              establishing her work as a founder, speaker, author, podcaster and innovator. Her new
              book was also to be launched soon and she wanted to drive sales through her
              engagements.
            </p>
          </div>
          <div className="col-span-4" />
        </div>

        <div className="aspect-[1340/843] w-full bg-gray-800" />

        <div className="wg-grid-1">
          <div className="col-span-4" />
          <div className="col-span-4 flex flex-col gap-4">
            <p className="col-span-4 w-full text-center text-xl text-foreground">
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
          <div className="col-span-7 flex flex-col gap-8">
            <span className="text-accent-foreground">NEXT STEPS</span>

            <div className="flex flex-col gap-6">
              <h2 className="font-heading text-display-1 uppercase">
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
