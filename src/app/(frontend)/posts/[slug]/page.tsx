import configPromise from '@payload-config'
import type { SerializedHeadingNode } from '@payloadcms/richtext-lexical'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import { cache } from 'react'
import { Container } from '@/components/container'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import RichText from '@/components/RichText'
import { PostHero } from '@/heros/PostHero'
import { safeStr, serialNo } from '@/libs/data.helpers'
import type { Post } from '@/payload-types'
import { generateMeta } from '@/utilities/generateMeta'
import { cn } from '@/utilities/ui'
import PageClient from './page.client'
import { ArticleContext } from './quick-glance'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = posts.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function PostPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = `/posts/${slug}`
  const post = await queryPostBySlug({ slug })

  if (!post) return <PayloadRedirects url={url} />

  return (
    <article className="pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <PostHero post={post} />

      <Container className="mt-12 items-start md:mt-[calc(72rem/16)] md:flex lg:gap-12">
        <ArticleContext headings={Array.from(readHeadings(post.content))} />

        <div className="w-full flex-1 shrink-0 border-foreground md:max-w-[70ch]">
          <div className="flex flex-col items-center gap-4">
            <RichText className="mx-auto max-w-3xl" data={post.content} enableGutter={false} />
          </div>

          {/*{post.relatedPosts && post.relatedPosts.length > 0 && (
            <RelatedPosts
              className="mt-12 max-w-[52rem] lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
              docs={post.relatedPosts.filter(
                (post) => typeof post === "object",
              )}
            />
          )}*/}
        </div>

        <div className="w-1/4 shrink"></div>
      </Container>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const post = await queryPostBySlug({ slug })

  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

function* readHeadings(content: Post['content']) {
  for (const entry of content.root.children) {
    if (entry.tag === 'h2') {
      const first = findChild(entry as SerializedHeadingNode, 'text').next()

      yield {
        id: crypto.randomUUID(),
        title: safeStr(first.value),
      }
    }
  }
}

function* findChild(entry: SerializedHeadingNode, type: 'text') {
  for (const child of entry.children) {
    if (child.type === type) {
      // @ts-expect-error
      yield child.text as string
    }
  }
}
