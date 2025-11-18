import config from '@payload-config'
import { range } from 'effect/Array'
import { getPayload, RequiredDataFromCollectionSlug } from 'payload'
import { Container } from '@/components/container'
import { Media } from '@/components/Media'
import { safeArray } from '@/libs/data.helpers'
import { O, pipe } from '@/libs/fp.helpers'
import { expectMedia } from '@/libs/payload/factories/media'
import type { Service, WigxelCrafts } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { Skiper47 } from './carousel'

export async function CraftsBlockComponent({
  subHeading,
  services: originalServices,
}: WigxelCrafts) {
  const payload = await getPayload({ config })
  const services = safeArray(originalServices)
    .map((e) => e.service)
    .filter((e) => e)

  return (
    <div data-scroll-target className="max-w-full overflow-hidden">
      <Container className="pt-[calc(160rem/16)]">
        <div className="flex flex-col md:w-min">
          <h2 className="heading-1 whitespace-nowrap">Our Crafts</h2>

          <p className="text-start text-sm md:text-end md:text-base">{subHeading}</p>
        </div>
      </Container>

      <div className="relative mt-[calc(60rem/16)] flex h-[680px] justify-between md:mt-[calc(120rem/16)]">
        <Skiper47
          images={range(0, 2).flatMap(() => services)}
          // .map((e) => expectMedia(e.image))
          // .map((e) =>
          //   pipe(
          //     e,
          //     O.map((e) => ({ src: getMediaUrl(e.url), alt: e.alt })),
          //     O.getOrNull,
          //   ),
          // )
          // .filter((e) => e)}
        />
      </div>

      {/*<div className="relative mt-[calc(60rem/16)] flex h-[680px] justify-between md:mt-[calc(120rem/16)]">
        <div
          data-scroll
          data-scroll-direction="horizontal"
          data-scroll-sticky
          data-scroll-spped={0.6}
          className="left-0 top-0 flex gap-x-[10vw] md:absolute"
        >
          {services.docs.map((e) => {
            return <ServiceEntry key={e.id} entry={e} />
          })}
        </div>
      </div>*/}
    </div>
  )
}
