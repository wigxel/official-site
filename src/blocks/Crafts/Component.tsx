import config from '@payload-config'
import { getPayload } from 'payload'
import { useId } from 'react'
import { Container } from '@/components/container'
import { Media } from '@/components/Media'
import type { Service } from '@/payload-types'

export async function CraftsBlockComponent() {
  const id = useId()
  const payload = await getPayload({ config })
  const services = await payload.find({
    collection: 'services',
    limit: 4,
  })

  return (
    <div className="max-w-full overflow-hidden">
      <Container className="pt-[calc(160rem/16)]">
        <div className="flex flex-col w-min">
          <h2 className="heading-1 whitespace-nowrap">Our Crafts</h2>

          <p className="text-right">How we shape your vision into results.</p>
        </div>
      </Container>

      <div
        id={`carousel-${id}`}
        className="flex justify-between mt-[calc(120rem/16)] h-[680px] relative"
      >
        <div className="flex absolute left-0 top-0 gap-x-[10vw]">
          {services.docs.map((e) => {
            return <ServiceEntry key={e.id} entry={e} />
          })}
        </div>
      </div>
    </div>
  )
}

function ServiceEntry({ entry }: { entry: Service }) {
  return (
    <div className="flex-1 min-w-[25vw] w-full flex flex-col gap-8 items-center">
      <div
        className="flex shrink-0 h-[calc(500rem/16)] justify-center items-end relative"
        style={{
          aspectRatio: (entry?.image?.width || 1) / (entry.image?.height || 1),
        }}
      >
        <Media fill resource={entry.image} />
      </div>

      <div className="h-[calc(148rem/16)] w-full flex flex-col gap-3 text-center">
        <h3 className="heading-2">{entry.title}</h3>

        <p className="text-sm font-body opacity-70">{entry.sub_text}</p>
      </div>
    </div>
  )
}
