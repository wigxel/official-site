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
  viewMode?: 'stack' | 'landscape'
  relationTo?: 'posts'
  showCategories?: boolean
  showAuthors?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const {
    className,
    doc,
    relationTo,
    viewMode = 'stack',
    title: titleFromProps,
    showAuthors = false,
  } = props

  const { slug, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <article
      ref={(ref) => card.register(ref)}
      className={cn(
        'group overflow-hidden border-border bg-background hover:cursor-pointer',
        {
          'wg-grid-1': viewMode === 'landscape',
        },
        className,
      )}
    >
      <div
        className={cn('relative aspect-[318/250] w-full overflow-hidden', {
          'w-full': viewMode === 'stack',
          'col-span-2 md:col-span-6': viewMode === 'landscape',
        })}
      >
        {!metaImage && (
          <div className="flex aspect-[318/250] w-full items-center justify-center bg-gray-800 object-cover text-[10px]">
            <span className="text-accent-foreground opacity-50">NO COVER IMAGE</span>
          </div>
        )}

        {metaImage && typeof metaImage !== 'string' && (
          <Media
            resource={metaImage}
            size="33vw"
            imgClassName="aspect-[318/250] group-hover:scale-110 group-hover:rotate-[3deg] transition-default object-cover"
          />
        )}
      </div>

      <div
        className={cn('py-6', {
          'col-span-2 md:col-span-6': viewMode === 'landscape',
        })}
      >
        {props.doc && (
          <div
            className={cn('-mt-5 mb-2 flex text-xs', {
              // 'justify-start': viewMode === 'landscape',
              'justify-start': viewMode === 'stack',
            })}
          >
            <PostInfo post={props.doc} />
          </div>
        )}

        {titleToUse && (
          <div className="prose line-clamp-2 w-11/12 !leading-[2.6ex]">
            <h3 className="group-hover:underline">
              <Link className="not-prose" href={href} ref={(ref) => link.register(ref)}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}

        {description && (
          <div className="mt-2 line-clamp-2 w-11/12 text-sm font-normal opacity-70 md:text-sm">
            {description && <p>{sanitizedDescription}</p>}
          </div>
        )}

        {showAuthors && props.doc ? (
          <div className="mt-4">
            <AuthorInfo post={props.doc} />{' '}
          </div>
        ) : null}
      </div>
    </article>
  )
}
