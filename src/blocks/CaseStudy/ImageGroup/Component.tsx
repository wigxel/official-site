import { ImageMedia } from '@/components/Media/ImageMedia'
import { safeArray } from '@/libs/data.helpers'
import { O } from '@/libs/fp.helpers'
import { safeReference } from '@/libs/utils'
import type { ImageGroupBlock } from '@/payload-types'
import { ComponentTag } from '../ComponentTag'

export function ImageGroupComponent(props: ImageGroupBlock) {
  return (
    <>
      <ComponentTag>#ImageGroup</ComponentTag>

      <div className="flex gap-2">
        {safeArray(props.images)
          .map((image) => safeReference(image.poster))
          .map((safe_poster, index) => {
            if (O.isNone(safe_poster)) {
              return (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: Nothing moving the waki
                  key={index}
                  className="flex aspect-[3/2] flex-1 shrink-0 items-center justify-center bg-gray-800"
                >
                  <span className="rounded-full bg-accent-foreground px-2 py-1 text-sm text-black">
                    No Image
                  </span>
                </div>
              )
            }

            const image_poster = safe_poster.value

            return (
              <ImageMedia
                key={image_poster.id}
                resource={image_poster}
                pictureClassName="w-full flex-1 shrink-0"
                imgClassName="w-full"
              />
            )
          })}
      </div>
    </>
  )
}
