import { range } from 'effect/Array'
import { Container } from '@/components/container'
import { safeArray } from '@/libs/data.helpers'
import { Arr, O, pipe } from '@/libs/fp.helpers'
import { expectModel } from '@/libs/payload/factories/media'
import type { Service, WigxelCrafts } from '@/payload-types'
import { Skiper47 } from './carousel'

export function CraftsBlockComponent({
  subHeading,
  services: originalServices,
}: WigxelCrafts) {
  const services = safeArray(originalServices)
    .map((e) => e.service)
    .filter((e) => e)

  return (
    <div data-scroll-target className="max-w-full">
      <Container className="pt-[calc(160rem/16)]">
        <div className="flex flex-col md:w-min">
          <h2 className="heading-1 whitespace-nowrap">Our Crafts</h2>
        </div>
      </Container>

      <div className="relative mt-[calc(60rem/16)] flex justify-between md:mt-[calc(120rem/16)]">
        <Skiper47
          images={pipe(
            range(0, 2),
            Arr.flatMap(() => services),
            Arr.map((e) => expectModel<Service>(e)),
            O.all,
            O.getOrElse(() => []),
          )}
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
