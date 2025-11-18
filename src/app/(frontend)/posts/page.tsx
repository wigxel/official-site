import configPromise from '@payload-config'
import { intersperse } from 'effect/Array'
import type { Metadata } from 'next/types'
import { getPayload } from 'payload'
import { Card } from '@/components/Card'
import { CollectionArchive } from '@/components/CollectionArchive'
import { Container } from '@/components/container'
import {
  SmartHoverContent,
  SmartHoverItem,
  SmartHoverRoot,
  SmartHoverTracker,
} from '@/components/smart-hover'
import { slugify } from '@/libs/utils'
import type { Category } from '@/payload-types'
import PageClient from './page.client'
import { SmoothScroll } from './smooth-scroll'

export const dynamic = 'force-static'
export const revalidate = 600

const ARTICLE_ID = `top-articles`

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const categories = await payload.find({
    collection: 'categories',
    select: {
      slug: true,
      title: true,
      parent: true,
    },
  })

  const categories_ = categories.docs

  return (
    <div className="md:py-24">
      <PageClient />

      <Container className="wg-grid-1 md:gap-0">
        <aside className="col-span-4">
          <div className="mb-24 flex flex-col gap-6 md:sticky md:top-[var(--header-height)] md:mb-0">
            <h1 className="page-heading-1">Archives</h1>
            <nav className="hidden flex-row gap-3 md:static md:flex md:flex-col md:divide-none md:border-none">
              <SmoothScroll el={`#${ARTICLE_ID}`}>
                <li className="inline-block cursor-pointer px-2 text-base text-white/[0.5] first:ps-0 last:pe-0 data-[active=true]:text-white md:px-0">
                  All
                </li>
              </SmoothScroll>
              {categories_.map((e) => {
                return (
                  <SmoothScroll key={e.slug} el={`#${slugify(e.title)}`}>
                    <li className="inline-block cursor-pointer px-2 text-base text-white/[0.5] first:ps-0 last:pe-0 data-[active=true]:text-white md:px-0">
                      {e.title}
                    </li>
                  </SmoothScroll>
                )
              })}
            </nav>
          </div>
        </aside>

        <section className="col-span-full flex flex-col gap-24 border-foreground md:col-span-8 xl:max-w-screen-2xl">
          <TopArticlesLayout1 />
          {categories_.map((e) => {
            return <CategoryCollectionArchive category={e} key={e.id} />
          })}
        </section>
      </Container>

      <MobilePostCategory entries={categories_} />
    </div>
  )
}

function MobilePostCategory({
  entries: categories_,
}: {
  entries: {
    id: number
    title: string
    slug?: string | null | undefined
    parent?: ((number | null) | Category) | undefined
  }[]
}) {
  return (
    <SmartHoverRoot events={['click']}>
      <Container className="wg-grid-1 sticky inset-x-0 bottom-0 z-20 mt-12 bg-black">
        <SmartHoverContent className="col-span-full flex justify-center border-t border-white text-center text-sm md:hidden">
          <SmartHoverTracker className="left-0 flex items-start justify-center border-none">
            <span
              className="transition-default box-content inline-block aspect-square h-2 -translate-y-1 rotate-45 rounded-none !bg-orange-500"
              style={{ boxShadow: '0 0 0 2px black, 0 0 0 4px white' }}
            />
          </SmartHoverTracker>

          <SmoothScroll el={`#${ARTICLE_ID}`}>
            <SmartHoverItem>
              <li className="transition-default inline-block cursor-pointer px-2 py-4 text-center opacity-50 data-[active=true]:opacity-100 md:px-0">
                All
              </li>
            </SmartHoverItem>
          </SmoothScroll>

          {categories_.map((e) => {
            return (
              <SmoothScroll key={e.slug} el={`#${slugify(e.title)}`}>
                <SmartHoverItem>
                  <li className="transition-default inline-block cursor-pointer px-2 py-4 text-center opacity-50 data-[active=true]:opacity-100 md:px-0">
                    {e.title}
                  </li>
                </SmartHoverItem>
              </SmoothScroll>
            )
          })}
        </SmartHoverContent>
      </Container>
    </SmartHoverRoot>
  )
}

async function TopArticlesLayout1() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    depth: 2,
    limit: 3,
    overrideAccess: true,
    select: {
      title: true,
      slug: true,
      publishedAt: true,
      postType: true,
      categories: true,
      meta: true,
      authors: true,
      populatedAuthors: true,
    },
  })

  if (posts.docs.length === 0) {
    return
  }

  const [first, ...rest] = posts.docs

  return (
    <div className="flex flex-col items-start gap-5">
      <div className="">
        <h2 id={ARTICLE_ID} className={articleHeadingClass}>
          <span>Top</span>
          <span>&nbsp;</span>
          <span>Articles</span>
        </h2>
      </div>

      <div className="px-0">
        <div className="grid grid-cols-4 gap-8 sm:grid-cols-8 lg:grid-cols-12 lg:gap-8 xl:gap-x-8">
          <div className="col-span-full md:col-span-6">
            <Card className="h-full" doc={first} relationTo="posts" showCategories />
          </div>

          <div className="col-span-full flex flex-col gap-4 border-y border-white/[0.2] py-12 md:col-span-6 md:border-none md:py-0">
            {rest.map((result) => {
              if (typeof result === 'object' && result !== null) {
                return (
                  <div className="col-span-4" key={result.id}>
                    <Card
                      className="h-full"
                      viewMode="landscape"
                      doc={result}
                      relationTo="posts"
                      showCategories
                    />
                  </div>
                )
              }

              return null
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

const articleHeadingClass =
  'w-full text-end md:text-start border-white/[0.8] justify-between md:justify-start flex font-medium text-3xl font-sans md:border-none md:text-[calc(32rem/16)]'

async function CategoryCollectionArchive({
  category,
}: {
  category: Pick<Category, 'id' | 'title'>
}) {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    depth: 2,
    limit: 12,
    overrideAccess: true,
    select: {
      title: true,
      slug: true,
      publishedAt: true,
      postType: true,
      categories: true,
      meta: true,
      authors: true,
      populatedAuthors: true,
    },
    where: {
      categories: {
        in: [category.id],
      },
    },
  })

  if (posts.totalDocs === 0) {
    return null
  }

  return (
    <div className="flex flex-col items-start gap-5 border-b border-white/[0.2] md:border-none">
      <div className="w-full">
        <h2 id={`${slugify(category.title)}`} className={articleHeadingClass}>
          {intersperse(
            category.title
              .split(' ')
              .map((e, index) => [e, index])
              .map(([e, index]) => <span key={index}>{e}</span>),
            <span>&nbsp;</span>,
          )}
        </h2>
      </div>

      <CollectionArchive posts={posts.docs} />
      {/*<div className="container">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>*/}
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Archives',
    description: 'Wigxel articles on principles on Design and Engineering for better UX',
  }
}
