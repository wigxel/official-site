import config from '@payload-config'
import { getPayload } from 'payload';
import { useId } from 'react'
import { Container } from '@/components/container'
import type { Portfolio, Service } from '@/payload-types';

export async function LandingProjectsBlockComponents() {
  const id = useId();
  const payload = await getPayload({ config })
  const services = await payload.find({
    collection: "portfolios",
    limit: 4,
  })

  return (
    <Container className="pt-[calc(160rem/16)] flex flex-col gap-10">
      <h2 className='heading-1 whitespace-nowrap'>
        Projects
      </h2>

      <div id={`carousel-${id}`} className='grid gap-[calc(20rem/16)] grid-cols-4'>
        {services.docs.map(e => {
          return <ServiceEntry key={e.id} entry={e} />
        })}
      </div>
    </Container>
  )
}

function ServiceEntry({ entry }: { entry: Portfolio }) {
  return <section className='flex-1 flex flex-col gap-4 items-center'>
    <div className='flex w-full aspect-[358/450] bg-gray-800' />

    <div className='text-start gap-2 w-full pe-6'>
      <h3 className='text-base font-medium'>
        {entry.name}
      </h3>

      <p className='text-sm font-body opacity-70 line-clamp-2'>
        {entry.short_description}
      </p>
    </div>
  </section>
}
