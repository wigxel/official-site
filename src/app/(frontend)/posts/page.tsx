import configPromise from '@payload-config'
import type { Metadata } from 'next/types'
import { getPayload } from 'payload'
import { CollectionArchive } from '@/components/CollectionArchive'
import { Container } from '@/components/container'
import type { Category } from '@/payload-types'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

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

      <Container className="grid grid-cols-1 grid-rows-1 gap-5 md:grid-cols-5 md:gap-0">
        <section>
          <div className="static mb-24 flex flex-col gap-6 md:sticky md:top-[var(--header-height)] md:mb-0">
            <h1 className="page-heading-1">Archives</h1>

            <nav className="sticky flex flex-row md:static md:flex-col md:divide-none md:border-none">
              <span className="inline-block px-2 text-base text-white first:ps-0 last:pe-0 md:px-0">
                All
              </span>
              {categories_.map((e) => {
                return (
                  <span
                    key={e.slug}
                    className="inline-block px-2 text-base text-white/[0.5] first:ps-0 last:pe-0 md:px-0"
                  >
                    {e.title}
                  </span>
                )
              })}
            </nav>
          </div>
        </section>

        <section className="flex flex-col gap-24 border-foreground md:col-span-4">
          <TopArticles />
          {categories_.map((e) => {
            return <CategoryCollectionArchive category={e} key={e.id} />
          })}
        </section>
      </Container>
    </div>
  )
}

async function TopArticles() {
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

  return (
    <div className="flex flex-col items-start gap-5">
      <div className="w-full md:px-8">
        <h2 className={articleHeadingClass}>Recent</h2>
      </div>

      <CollectionArchive posts={posts.docs} />
    </div>
  )
}

const articleHeadingClass =
  'w-full border-b text-end md:text-start border-white/[0.8] font-medium text-3xl font-heading md:border-none md:text-[calc(42rem/16)]'

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
    <div className="flex flex-col items-start gap-5">
      <div className="w-full px-0 md:px-8">
        <h2 className={articleHeadingClass}>{category.title}</h2>
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
    title: `Payload Website Template Posts`,
  }
}
