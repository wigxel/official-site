import type { RequiredDataFromCollectionSlug } from 'payload'
import { Container } from '@/components/container'
import { RenderBlocks } from '../RenderBlocks'

export function LandingContactBlockComponent(props: RequiredDataFromCollectionSlug<'pages'>) {
  const { layout } = props

  return (
    <Container
      id="contact-form"
      className="relative flex flex-col gap-10 overflow-hidden bg-[#F7F7F7] pb-[14vw] pt-[calc(96rem/16)] text-gray-950"
      style={{
        '--heading-color': '#DFDFDF',
      }}
    >
      <div className="wg-grid-1">
        <div className="col-span-6 flex flex-col gap-16">
          <div className="flex select-none flex-col gap-2">
            <h2 className="z-2 text-(--art-color) not-sr-only absolute bottom-0 left-0 top-[unset] z-0 hidden font-heading text-[19.5vw] leading-[1.4ex] md:block">
              CONTACT
            </h2>

            <h2
              data-scroll-section
              className="z-2 not-sr-only pointer-events-none absolute inset-0 z-0 flex flex-col justify-between font-heading text-[20vw] leading-[1.4ex] md:hidden"
            >
              <span
                data-scroll
                data-scroll-direction="horizontal"
                data-scroll-speed={-0.01}
                className="-ml-2 self-start"
              >
                Reach
              </span>
              <span
                data-scroll
                data-scroll-direction="horizontal"
                data-scroll-speed={0.01}
                className="self-end"
              >
                Out
              </span>
            </h2>

            <p className="text-pretty text-sm md:text-2xl">
              We work with a limited number of brands each season to ensure deep creative focus and
              full immersion.
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
