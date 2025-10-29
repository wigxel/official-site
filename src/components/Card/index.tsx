'use client'
import Link from 'next/link'
import type React from 'react'
import { Media } from '@/components/Media'
import { AuthorInfo, PostInfo } from '@/heros/PostHero'
import type { Post } from '@/payload-types'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'

export type CardPostData = Pick<
  Post,
  | 'slug'
  | 'categories'
  | 'meta'
  | 'title'
  | 'populatedAuthors'
  | 'authors'
  | 'publishedAt'
  | 'postType'
>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, title: titleFromProps } = props

  const { slug, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <article
      ref={ref => card.register(ref)}
      className={cn(
        'bg-background border-border rounded-lg overflow-hidden hover:cursor-pointer',
        className,
      )}
    >
      <div className="relative w-full ">
        {!metaImage && <div className="">No image</div>}
        {metaImage && typeof metaImage !== 'string' && <Media resource={metaImage} size="33vw" />}
      </div>

      <div className="py-6">
        {props.doc && (
          <div className="mb-2 text-xs">
            <PostInfo post={props.doc} />
          </div>
        )}

        {titleToUse && (
          <div className="prose line-clamp-2 w-11/12 !leading-[2.6ex]">
            <h3>
              <Link className="not-prose" href={href}
                ref={ref => link.register(ref)}
              >
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}

        {description && (
          <div className="mt-2 line-clamp-2 w-11/12 text-base font-normal opacity-70">
            {description && <p>{sanitizedDescription}</p>}
          </div>
        )}

        {props.doc ? (
          <div className="mt-4">
            <AuthorInfo post={props.doc} />{' '}
          </div>
        ) : null}
      </div>
    </article>
  )
}
