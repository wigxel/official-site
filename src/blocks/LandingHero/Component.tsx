'use client'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { intersperse } from 'effect/Array'
import { Container } from '@/components/container'
import type { LandingHero } from '@/payload-types'

export function LandingHeroBlockComponent(props: LandingHero) {
  return (
    <>
      <Container className="patterned-bg mt-[-20dvh] pt-[20dvh] md:mt-[-var(--header-height)] md:pt-[70dvh]">
        <div className="wg-grid-1 min-h-[60dvh] w-full md:min-h-[unset]">
          <h1
            data-scroll
            data-scroll-speed="0.1"
            className="heading-1 col-span-full flex flex-col justify-end md:col-span-5"
          >
            {intersperse(props.heading.split('\n'), <br />)}
          </h1>

          <div className="col-span-full hidden md:col-span-2 md:flex" />

          <div className="col-span-full flex flex-col justify-end md:col-span-5 md:items-start md:justify-start">
            <p
              // data-scroll
              // data-scroll-direction="vertical"
              className="max-w-lg text-pretty text-base"
            >
              {/* @ts-expect-error Look into this when there's time */}
              <RichText data={props.richText} />
            </p>
          </div>
        </div>
      </Container>

      <div className="line-pattern my-12 w-full" />
    </>
  )
}
