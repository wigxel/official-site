import config from '@payload-config'
import { getPayload } from 'payload'
import { Container } from '@/components/container'
import { Media } from '@/components/Media'
import type { Service } from '@/payload-types'

export async function CraftsBlockComponent() {
  const payload = await getPayload({ config })
  const services = await payload.find({
    collection: 'services',
    limit: 4,
  })

  return (
    <div className="max-w-full overflow-hidden">
      <Container className="pt-[calc(160rem/16)]">
        <div className="flex w-min flex-col">
          <h2 className="heading-1 whitespace-nowrap">Our Crafts</h2>

          <p className="text-right">How we shape your vision into results.</p>
        </div>
      </Container>

      <div className="relative mt-[calc(120rem/16)] flex h-[680px] justify-between">
        <div className="absolute left-0 top-0 flex gap-x-[10vw]">
          {services.docs.map((e) => {
            return <ServiceEntry key={e.id} entry={e} />
          })}
        </div>
      </div>
    </div>
  )
}

function ServiceEntry({ entry }: { entry: Service }) {
  if (typeof entry.image === 'number') {
    console.warn("Expecting Media. Got number");
    return;
  }

  return (
    <div className="flex w-full min-w-[25vw] flex-1 flex-col items-center gap-8">
      <div
        className="relative flex h-[calc(500rem/16)] shrink-0 items-end justify-center"
        style={{
          aspectRatio: (entry?.image?.width || 1) / (entry.image?.height || 1),
        }}
      >
        <Media fill resource={entry.image} />
      </div>

      <div className="flex h-[calc(148rem/16)] w-full flex-col gap-3 text-center">
        <h3 className="heading-2">{entry.title}</h3>

        <p className="font-body text-sm opacity-70">{entry.sub_text}</p>
      </div>
    </div>
  )
}
