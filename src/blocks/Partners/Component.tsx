import config from '@payload-config'
import { getPayload } from 'payload';
import { useId } from 'react'
import { Container } from '@/components/container'

export async function PartnersBlockComponents() {
  const payload = await getPayload({ config });

  const services = await payload.find({
    collection: "portfolios",
    limit: 4,
  })

  return (
    <Container className="pt-[calc(160rem/16)] flex flex-col gap-10">
      <section className="wg-grid-1">

        <div className='col-span-4 flex flex-col gap-6'>
          <h2 className='heading-1 whitespace-nowrap text-start flex flex-col w-min'>
            <span className='italic'>The</span>
            <span>Great Wall</span>
            <span className='font-thin text-center italic'>of</span>
            <span className='text-end'>Clients</span>
          </h2>

        </div>

        <div className='grid col-span-5 grid-cols-3 gap-px bg-white/5'>
          {(() => {
            const africanColors = [
              'bg-red-600',
              'bg-green-700',
              'bg-yellow-500',
              'bg-amber-600',
              'bg-emerald-600',
              'bg-orange-500',
              'bg-rose-600',
              'bg-lime-600'
            ];
            return Array.from({ length: 6 }).map((_, i) => {
              const color = africanColors[Math.floor(Math.random() * africanColors.length)];
              return <section key={i} className={`${color} aspect-square`} />;
            });
          })()}
        </div>

        <div className='col-span-2 flex flex-col justify-end items-start'>
          <p className='opacity-70 text-base'>
            We partner with executive brands and teams to transform brand strategy, positioning, and identity into a brand that aligns culture
            and accelerates growth.
          </p>
        </div>

      </section>
    </Container>
  )
}
