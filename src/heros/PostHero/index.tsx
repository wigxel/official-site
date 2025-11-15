import Image from 'next/image'
import type React from 'react'
import { Container } from '@/components/container'
import { Media } from '@/components/Media'
import { DateParse } from '@/libs/date.helpers'
import { Arr, O, pipe } from '@/libs/fp.helpers'
import { expectMedia } from '@/libs/payload/factories/media'
import { safeReference } from '@/libs/utils'
import type { Post } from '@/payload-types'
import { formatAuthors } from '@/utilities/formatAuthors'
import { cn } from '@/utilities/ui'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { heroImage, description, title } = post

  return (
    <div className="relative flex items-end bg-gray-500">
      {/*<div className="col-start-1 col-span-1 md:col-start-2 md:col-span-2">
        <div className="uppercase text-sm mb-6">
          {categories?.map((category, index) => {
            if (typeof category === 'object' && category !== null) {
              const { title: categoryTitle } = category

              const titleToUse = categoryTitle || 'Untitled category'

              const isLast = index === categories.length - 1

              return (
                <React.Fragment key={index}>
                  {titleToUse}
                  {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                </React.Fragment>
              )
            }
            return null
          })}
        </div>
      </div>*/}

      {heroImage && typeof heroImage !== 'string' && (
        <Media fill priority imgClassName="z-10 object-cover" resource={heroImage} />
      )}

      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1/2 bg-gradient-to-r from-black to-transparent" />

      <Container className="relative z-20">
        <div className="flex aspect-[1340/500] w-full items-center p-[calc(115rem/16)] text-foreground">
          <div className="flex flex-col gap-6 font-medium lg:w-1/2">
            <div className="text-xs">
              <PostInfo post={post} />
            </div>

            <div className="flex flex-col gap-4">
              <hgroup className="mb-6 flex flex-col gap-3">
                <h1 className="text-balance text-6xl tracking-tight">{title}</h1>
                <p className="text-base">{description}</p>
              </hgroup>

              {/*Authors*/}
              <AuthorInfo post={post} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export function AuthorInfo({ post }: { post: Pick<Post, 'authors'> }) {
  const authors = pipe(
    Arr.ensure(post.authors),
    Arr.filterMap((author) => safeReference(author)),
  )

  const author_names = formatAuthors(authors.map((e) => ({ name: e.name })))
  const hasAuthors = authors && authors.length > 0 && author_names !== ''

  const avatarClassName = "aspect-square w-6 md:w-8 rounded-full border border-white/[0.16] bg-black/60 object-cover";

  const author_images = pipe(
    authors,
    Arr.filterMap((user) => expectMedia(user.avatar)),
    Arr.map((avatar) => {
      return (
        <Image
          key={`${avatar.id}`}
          alt={avatar?.alt ?? 'Author Image'}
          unoptimized
          src={avatar?.url ?? '/logo.svg'}
          className={avatarClassName}
          width={32}
          height={32}
        />
      )
    }),
  )

  return (
    <div className="flex flex-col gap-4 md:flex-row md:gap-16">
      {hasAuthors && (
        <div className="flex items-center gap-2 md:gap-4">
          <div
            className={cn('flex', {
              'pl-2 *:-mx-2': authors.length > 1,
            })}
          >
            {author_images.length ? (
              author_images
            ) : (
              <div className={avatarClassName} />
            )}
          </div>

          <div className="flex flex-col gap-1 text-sm">
            <p>{author_names}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export function PostInfo({ post }: { post: Pick<Post, 'postType' | 'publishedAt'> }) {
  const { postType, publishedAt } = post

  return (
    <div className="flex gap-2">
      {postType ? (
        <>
          <span className="capitalize text-brand-yellow-500">{postType ?? 'No Post Type'}</span>
          <span className="h-4 w-px bg-white/[0.5]" />
        </>
      ) : null}

      <span>
        {O.fromNullable(publishedAt).pipe(
          O.flatMap((date) => DateParse.format(date, 'MMM do, yyyy')),
          O.map((e) => <span key={'date-content'}>{e}</span>),
          O.getOrNull,
        )}
      </span>
    </div>
  )
}
