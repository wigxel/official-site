import configPromise from '@payload-config'
import type { Metadata } from 'next/types'
import { getPayload } from 'payload'
import React from 'react'
import { CollectionArchive } from '@/components/CollectionArchive'
import { Container } from '@/components/container'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
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
    <div className="pt-24 pb-24">
      <PageClient />

      <Container className="grid grid-cols-5 grid-rows-1">
        <section>
          <div className="sticky top-0 gap-6 flex-col flex">
            <div className="prose dark:prose-invert max-w-none">
              <h1>Archives</h1>
            </div>

            <nav className="flex flex-col">
              {categories_.map((e) => {
                return (
                  <span key={e.slug} className="text-base">
                    {e.title}
                  </span>
                )
              })}
            </nav>
          </div>
        </section>

        <section className="col-span-4 flex flex-col gap-24 border-foreground">
          {categories_.map((e) => {
            return <CategoryCollectionArchive category={e} key={e.id} />
          })}
        </section>
      </Container>
    </div>
  )
}

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
      <div className="px-8">
        <h2 className="font-heading font-medium text-[calc(42rem/16)]">{category.title}</h2>
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
