'use server'
import configPromise from '@payload-config'
import { intersperse } from 'effect/Array'
import { capitalize } from 'effect/String'
import { draftMode } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { cache } from 'react'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { Container } from '@/components/container'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { ImageMedia } from '@/components/Media/ImageMedia'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { safeArray, safeStr } from '@/libs/data.helpers'
import { O, pipe } from '@/libs/fp.helpers'
import { expectMedia } from '@/libs/payload/factories/media'
import { safeReference } from '@/libs/utils'

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
    depth: 2,
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

  const { name, next, basic: basicInfo, layout } = page

  const portfolio = basicInfo

  return (
    <section className="flex flex-col gap-[calc(100rem/16)]">
      {draft && <LivePreviewListener />}

      <Container className="flex flex-col gap-[calc(32rem/16)]">
        <nav>
          <ul className="flex gap-2 text-xs text-muted-foreground md:text-base">
            <li className="text-foreground/[0.5]">
              <Link prefetch href="/portfolio">
                Portfolio
              </Link>
            </li>
            /<li className="text-foreground">{name}</li>
          </ul>
        </nav>

        <div className="wg-grid-1 relative">
          <div className="col-span-6 flex flex-col gap-6">
            <h1 className="font-heading text-heading-3 uppercase md:text-display-1">{name}</h1>
            <p className="text-base">{portfolio.short_description}</p>

            {/*{pipe(
              O.fromNullable(portfolio.url),
              O.filter((url) => url !== '#'),
              O.map((url) => (
                <LineHover key="live-site">
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-thin text-accent-foreground"
                  >
                    Visit Live Site
                  </a>
                </LineHover>
              )),
              O.getOrElse(() => null),
            )}*/}

            {pipe(
              O.fromNullable(portfolio.url),
              O.filter((url) => url !== '#'),
              O.map((url) => (
                <a href={url} key={url} target="_blank" rel="noreferrer noopener">
                  <div className="absolute bottom-0 right-[12vw] translate-y-full overflow-hidden rounded-full">
                    <div className="group relative flex aspect-square w-[200px] items-center justify-center">
                      <div className="view-site-button absolute inset-6 flex -rotate-12 items-center justify-center rounded-full border-2 border-accent-foreground transition-all hover:-rotate-0">
                        <span className="text-[0.76rem] font-semibold text-foreground">
                          VISIT SITE
                        </span>
                      </div>

                      <Image
                        alt="View Live Website"
                        width={200}
                        height={200}
                        src={'/assets/curly-circle.svg'}
                        className="animate pointer-events-none absolute animate-spin running"
                        style={{ animationDuration: '20s' }}
                      />
                    </div>
                  </div>
                </a>
              )),
              O.getOrElse(() => null),
            )}
          </div>
        </div>

        <div className="flex"></div>
      </Container>

      <Container className="mb-24 flex flex-col gap-[calc(64rem/16)]">
        {pipe(
          expectMedia(basicInfo.cover_image),
          O.map((e) => (
            <ImageMedia
              key={e.id}
              resource={e}
              pictureClassName={'-mx-4 lg:mx-0 rounded-lg bg-gray-800'}
              imgClassName="w-full"
            />
          )),
          O.getOrElse(() => (
            <div className="-mx-4 aspect-[1340/600] rounded-lg bg-gray-900 lg:mx-0" />
          )),
        )}

        <div className="wg-grid-1">
          <div className="hidden md:col-span-7 md:block" />
          <div className="wg-grid-1 col-span-5 w-full leading-[2ex]">
            <div className="col-span-2 flex flex-col gap-2 md:col-span-6">
              <h2 className="opacity-70">Client</h2>
              <p>{portfolio.client}</p>
            </div>

            <div className="col-span-2 flex flex-col gap-2 md:col-span-6">
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

            <div className="col-span-2 flex flex-col gap-2 md:col-span-6">
              <h2 className="opacity-70">Project Type</h2>
              <p>{portfolio.project_type}</p>
            </div>

            <div className="col-span-2 flex flex-col gap-2 md:col-span-6">
              <h2 className="opacity-70">Sector</h2>
              <p>{portfolio.sector}</p>
            </div>
          </div>
        </div>
      </Container>

      <Container className="flex flex-col gap-10 md:gap-[calc(100rem/16)]">
        <RenderBlocks blocks={layout} />
      </Container>

      {pipe(
        safeReference(next),
        O.map((portfolio) => {
          return (
            <Container key={portfolio.id}>
              <div className="wg-grid-1 !gap-11">
                <div className="col-span-full flex flex-col gap-8 text-end">
                  <span className="tracking-wider text-accent-foreground">NEXT PROJECT</span>

                  <Link href={`/portfolio/${portfolio.slug}`} draggable={false}>
                    <div className="flex flex-col gap-6" style={{ perspective: '100vw' }}>
                      <h2
                        className="next-project-button cursor-pointer select-none text-balance font-heading uppercase leading-[2ex]"
                        style={{
                          fontSize: 'clamp(1.4rem,15vw, 9rem)',
                        }}
                      >
                        {(() => {
                          return pipe(portfolio.name.split(' '), intersperse(<br />))
                        })()}
                      </h2>
                    </div>
                  </Link>
                </div>

                <div className="col-span-full aspect-[1340/275] overflow-hidden">
                  {pipe(
                    expectMedia(portfolio.basic.cover_image),
                    O.map((media) => {
                      return (
                        <ImageMedia
                          key={media.id}
                          resource={media}
                          pictureClassName="aspect-[1340/275] bg-gray-800"
                          imgClassName="w-full"
                        />
                      )
                    }),
                    O.getOrElse(() => <div className="aspect-[1340/275] bg-gray-800" />),
                  )}
                </div>
              </div>
            </Container>
          )
        }),
        O.getOrNull,
      )}
    </section>
  )
}
