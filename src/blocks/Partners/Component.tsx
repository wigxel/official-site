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
    <Container className="py-[calc(160rem/16)] flex flex-col gap-10">
      <section className="wg-grid-1">
        <div className="col-span-3 flex flex-col gap-6">
          <h2 className="heading-1 whitespace-nowrap text-start flex flex-col w-min">
            <span className="italic text-[0.6em] ">The</span>
            <span>Great Wall</span>
            <span className="text-end">
              <span className="font-thin text-center text-[0.6em] align-text-top italic">
                of&nbsp;&nbsp;
              </span>
              Clients
            </span>
          </h2>
        </div>

        <div className="grid col-span-6 grid-cols-3 gap-px mt-24 bg-white/10">
          {slots.map((index) => {
            const match = collabs.docs[index]

            if (!match) {
              return <section key={index} className={`bg-background aspect-square`} />
            }

            return (
              <section
                key={match.id}
                className={`bg-background select-none relative overflow-hidden group aspect-square`}
              >
                <div
                  className="w-full h-full relative transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Front */}
                  <div
                    className="absolute inset-0 flex items-center justify-center p-4"
                    style={{ WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}
                  >
                    <Media resource={match.logo} imgClassName="object-contain" />
                  </div>

                  {/* Back */}
                  <div
                    className="absolute inset-0 flex bg-orange-600 items-center justify-center p-4 bg-background"
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

        <div className="col-span-3 flex flex-col justify-end items-start">
          <p className="opacity-70 text-base text-end text-balance">
            We partner with executive brands and teams to transform brand strategy, positioning, and
            identity into a brand that aligns culture and accelerates growth.
          </p>
        </div>
      </section>
    </Container>
  )
}

const slots = range(0, 5)
