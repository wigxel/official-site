'use client'
import type React from 'react'
import { Container } from '@/components/container'

export function LandingHeroBlockComponent() {
  return (
    <Container className="pt-[calc(238rem/16)]">
      <div className='wg-grid-1 w-full'>
        <h1 className='col-span-5 heading-1'>
          Human Centric.<br />
          Smart Design.<br />
          Built Right.<br />
        </h1>

        <div className='col-span-2' />
        <div className='col-span-5 flex flex-col justify-end'>
          <p className='text-base'>
            We don’t design for screens. We design for people, brands, and moments that matter. Design is easy. Making it matter? That’s where we come in.
          </p>
        </div>
      </div>

      <div className='aspect-[1340/500] w-full mt-[calc(15px*8)] bg-gray-800'>

      </div>
    </Container>
  )
}
