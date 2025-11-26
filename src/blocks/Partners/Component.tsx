import config from '@payload-config'
import { range } from 'effect/Array'
import { getPayload } from 'payload'
import { Container } from '@/components/container'
import { Media } from '@/components/Media'

export async function PartnersBlockComponents() {
  const payload = await getPayload({ config })

  const collabs = await payload.find({
    collection: 'collaborations',
    limit: 4,
  })

  return (
    <Container className="flex flex-col gap-10 py-[calc(160rem/16)]">
      <section className="wg-grid-1">
        <div className="order-0 col-span-4 flex flex-col gap-6 md:col-span-5">
          <h2 className="heading-1 hidden w-min flex-col whitespace-nowrap text-start md:flex">
            <span className="translate-x-[24%] text-[0.6em] italic">Our</span>
            <span className="relative leading-none">
              Great <span className="opacity-0">Wall</span>
              <span className="absolute bottom-0 translate-x-[-160%] translate-y-[-29%] align-super text-[0.6em] italic">
                Wall
              </span>
            </span>
            <span className="text-end">
              <span className="text-center align-text-top text-[0.6em] font-thin italic">
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

        <div className="order-3 col-span-4 mt-24 md:order-1 md:col-span-6 md:mt-0">
          <div className="-mx-4 grid grid-cols-3 gap-px bg-white/10">
            {slots.map((index) => {
              const match = collabs.docs[index]

              if (!match) {
                return <section key={index} className={`aspect-square bg-background`} />
              }

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
                      <Media resource={match.logo} imgClassName="object-contain" />
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

        <div className="hidden md:order-3 md:col-span-2 md:block" />

        <div className="order-1 col-span-4 flex flex-col items-start justify-end md:order-4 md:col-span-5">
          <p className="me-0 ms-auto text-pretty text-start text-xs opacity-70 md:w-full md:text-xl">
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
