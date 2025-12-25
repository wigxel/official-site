import { range } from 'effect/Array'
import { Container } from '@/components/container'
import { Media } from '@/components/Media'
import { safeArray } from '@/libs/data.helpers'
import { O } from '@/libs/fp.helpers'
import { expectModel } from '@/libs/payload/factories/media'
import type { Collaboration, WigxelPartners } from '@/payload-types'

export async function PartnersBlockComponents(props: WigxelPartners) {
  const collabs = safeArray(props.items).map((e) => expectModel<Collaboration>(e.item))

  return (
    <Container className="flex flex-col gap-10 py-[calc(160rem/16)]">
      <section className="wg-grid-1">
        <div className="order-0 col-span-4 flex flex-col gap-6 md:col-span-5">
          <h2 className="heading-1 hidden w-min flex-col whitespace-nowrap text-start md:flex">
            <span
              className="translate-x-[24%] text-[0.6em] italic"
              style={{
                top: '28px',
                position: 'relative',
              }}
            >
              Our
            </span>
            <span className="relative leading-none">
              Great <span className="opacity-0">Wall</span>
              <span className="absolute bottom-0 translate-x-[-174%] translate-y-[16%] align-super text-[0.6em] italic">
                Wall
              </span>
            </span>

            <span className="text-end">
              <span className="relative top-[-20%] text-center align-text-top text-[0.6em] font-thin italic">
                of&nbsp;&nbsp;
              </span>
              Clients
            </span>
          </h2>

          <h2 className="heading-1 flex flex-col gap-2 whitespace-nowrap text-start leading-none md:hidden">
            <span className="relative col-span-2 text-[20.4svw] leading-[1ex]">awesome</span>
            <div className="flex justify-between font-sans">
              <span className="text-start text-[0.45em] font-light tracking-tight">Partners</span>
              <span className="flex flex-col text-end text-[0.45em] font-light tracking-tight">
                Clients
              </span>
            </div>
          </h2>
        </div>

        <div className="order-3 col-span-4 mt-24 md:order-2 md:col-span-12 md:mt-0">
          <div className="-mx-4 grid grid-cols-3 gap-px bg-white/10">
            {slots.map((index) => {
              const safeMatch = collabs[index]

              if (O.isNone(safeMatch)) {
                return <section key={index} className={`aspect-square bg-background`} />
              }

              const match = safeMatch.value

              return (
                <section
                  key={match.id}
                  className={`group relative aspect-square select-none overflow-hidden bg-background`}
                >
                  <div className="relative size-full transition-transform duration-500 [transform-style:preserve-3d]">
                    {/* Front */}
                    <div
                      className="absolute inset-0 flex items-center justify-center p-4"
                      style={{ WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}
                    >
                      <Media
                        resource={match.logo}
                        blurDataURL={null}
                        imgClassName="object-contain md:max-w-[14rem]"
                      />
                    </div>

                    {/* Back */}
                    <div
                      className="absolute inset-0 flex items-center justify-center bg-orange-600 p-4"
                      style={{
                        transform: 'rotateY(180deg)',
                        WebkitBackfaceVisibility: 'hidden',
                        backfaceVisibility: 'hidden',
                      }}
                    >
                      <span className="font-body absolute inset-x-4 bottom-4 text-center text-xs uppercase opacity-90">
                        {match.name}
                      </span>
                    </div>
                  </div>
                </section>
              )
            })}
          </div>
        </div>

        <div className="hidden md:order-3 md:col-span-5 md:block" />

        <div className="order-1 col-span-4 flex flex-col items-start justify-end md:order-1 md:col-span-4">
          <p className="me-0 ms-auto text-pretty text-start text-xs md:w-full md:text-sm">
            We partner with executive brands and teams to transform brand strategy, positioning, and
            identity into a brand that aligns culture and accelerates growth.
          </p>
        </div>

        {/*<div className="hidden md:order-6 md:col-span-2 md:block" />*/}
      </section>
    </Container>
  )
}

const slots = range(0, 5)
