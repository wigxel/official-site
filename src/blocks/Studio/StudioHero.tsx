import { Container } from '@/components/container'
import { Skils, StudioPurpose, TeamSection } from '@/components/studio/all'
import { safeArray } from '@/libs/data.helpers'
import { O, pipe } from '@/libs/fp.helpers'
import { expectList, expectMedia } from '@/libs/payload/factories/media'
import type { StudioHero, TeamMember } from '@/payload-types'
import { GridSlides } from './studio-hero.client'

export function StudioHeroComponent_(props: StudioHero) {
  const { teamMembers, slideImages } = props
  const safeImages = safeArray(slideImages)
    .map((e) => expectMedia(e.image))
    .filter((e) => O.isSome(e))

  return (
    <section>
      <Container className="absolute">
        <h1 className="page-heading-1 font-heading">Studio</h1>
      </Container>

      <GridSlides
        slideImages={pipe(
          O.all(safeImages),
          O.getOrElse(() => []),
        )}
      />

      <Container className="flex aspect-[16/6] min-h-[90svh] w-full flex-col justify-end">
        <p
          className="rivera mb-[1ch] indent-[20svw] text-[7.9vw] leading-[2ex] tracking-[-0.3px] md:text-end md:text-5xl md:tracking-normal xl:text-7xl"
          style={{
            textAlignLast: 'start',
          }}
        >
          <span className="align-text-top text-xs">(INTRO)</span>
          <>
            We offer a wide range of creative & technical services that covers every step of a
            production & production pipeline
          </>
        </p>
      </Container>

      <StudioPurpose />

      <Skils />

      <TeamSection
        team={pipe(
          safeArray(teamMembers).map((e) => e.member),
          expectList<TeamMember>,
          O.getOrElse(() => [] as TeamMember[]),
        )}
      />

      <Container className="wg-grid-1">
        <div className="col-span-5"></div>
        <div className="col-span-7">
          <p className="flex max-w-[40ch] text-justify text-[calc(32rem/16)] leading-[2.2ex]">
            eeagead
          </p>
        </div>
      </Container>
    </section>
  )
}
