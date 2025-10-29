import type { RequiredDataFromCollectionSlug } from 'payload'
import { Container } from '@/components/container'
import { RenderBlocks } from '../RenderBlocks'

export function LandingContactBlockComponent(props: RequiredDataFromCollectionSlug<'pages'>) {
  const { layout } = props

  return (
    <Container className="relative flex flex-col gap-10 overflow-hidden bg-[#F7F7F7] pb-[14vw] pt-[calc(96rem/16)] text-gray-950">
      <div className="wg-grid-1">
        <div className="col-span-6 flex flex-col gap-16">
          <div className="flex flex-col gap-2">
            <h2 className="z-2 not-sr-only absolute bottom-0 left-0 z-0 font-heading text-[19.5vw] leading-[1.4ex] text-[#DFDFDF]">
              CONTACT
            </h2>

            <p className="text-balance text-2xl">
              We work with a limited number of brands each season to ensure deep creative focus and
              full immersion. if you feel aligned with what we stand for we invite you to reach out
              and work with us.
            </p>
          </div>

          <div className="layout-form-grid relative z-10">
            <RenderBlocks blocks={layout} />
          </div>
        </div>
      </div>
    </Container>
  )
}
