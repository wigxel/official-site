'use client'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { intersperse } from 'effect/Array'
import { Container } from '@/components/container'
import { Media } from '@/components/Media'
import type { LandingHero } from '@/payload-types'

export function LandingHeroBlockComponent(props: LandingHero) {
  return (
    <Container className="patterned-bg -mt-[20dvh] pt-[20dvh] md:-mt-[var(--header-height)] md:pt-[50dvh]">
      <div className="wg-grid-1 min-h-[60dvh] w-full md:min-h-[unset]">
        <h1 className="heading-3 md:heading-1 col-span-full flex flex-col justify-end md:col-span-5">
          {intersperse(props.heading.split('\n'), <br />)}
        </h1>

        <div className="col-span-full hidden md:col-span-2 md:flex" />

        <div className="col-span-full flex flex-col justify-end md:col-span-5 md:justify-start">
          <p className="text-balance text-base">
            {/* @ts-expect-error Look into this when there's time */}
            <RichText data={props.richText} />
          </p>
        </div>
      </div>

      <div className="relative -mx-4 mt-[calc(15px*8)] aspect-[1340/500] bg-gray-800 md:mx-auto md:w-full">
        <Media resource={props.cover_image} fill />
      </div>
    </Container>
  )
}
