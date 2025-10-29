'use client'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { intersperse } from 'effect/Array'
import { Container } from '@/components/container'
import { Media } from '@/components/Media'
import type { LandingHero } from '@/payload-types'

export function LandingHeroBlockComponent(props: LandingHero) {
  return (
    <Container className="patterned-bg pt-[50dvh] -mt-[var(--header-height)]">
      <div className="wg-grid-1 w-full">
        <h1 className="heading-1 col-span-5">{intersperse(props.heading.split('\n'), <br />)}</h1>

        <div className="col-span-2" />
        <div className="col-span-5 flex flex-col justify-end">
          <p className="text-balance text-base">
            {/* @ts-expect-error Look into this when there's time */}
            <RichText data={props.richText} />
          </p>
        </div>
      </div>

      <div className="relative mt-[calc(15px*8)] aspect-[1340/500] w-full bg-gray-800">
        <Media resource={props.cover_image} fill />
      </div>
    </Container>
  )
}
