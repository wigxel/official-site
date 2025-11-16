import type React from 'react'
import { Card, type CardPostData } from '@/components/Card'

export type Props = {
  posts: CardPostData[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts } = props

  return (
    <div className="grid grid-cols-4 gap-8 sm:grid-cols-8 lg:grid-cols-12 lg:gap-8 xl:gap-x-8">
      {posts?.map((result) => {
        if (typeof result === 'object' && result !== null) {
          return (
            // @ts-expect-error Nothing really needs to know the way
            <div className="col-span-4" key={result?.id}>
              <Card className="h-full" doc={result} relationTo="posts" showCategories showAuthors />
            </div>
          )
        }

        return null
      })}
    </div>
  )
}
