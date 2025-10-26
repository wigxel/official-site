'use client'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { intersperse } from 'effect/Array'
import { Container } from '@/components/container'
import { Media } from '@/components/Media'
import type { LandingHero } from '@/payload-types'

export function LandingHeroBlockComponent(props: LandingHero) {
  return (
    <Container className="pt-[50dvh] patterned-bg">
      <div className="wg-grid-1 w-full">
        <h1 className="col-span-5 heading-1">{intersperse(props.heading.split('\n'), <br />)}</h1>

        <div className="col-span-2" />
        <div className="col-span-5 flex flex-col justify-end">
          <p className="text-base text-balance">
            <RichText data={props.richText} />
          </p>
        </div>
      </div>

      <div className="aspect-[1340/500] w-full mt-[calc(15px*8)] bg-gray-800 relative">
        <Media resource={props.cover_image} fill />
      </div>
    </Container>
  )
}
