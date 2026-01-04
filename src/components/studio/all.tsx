'use server'
import config from '@payload-config'
import { motion } from 'motion/react'
import { getPayload } from 'payload'
import { Container } from '@/components/container'
import type { Service, TeamMember } from '@/payload-types'
import { ImageMedia } from '../Media/ImageMedia'
import RichText from '../RichText'
import { SplitHeading } from './all.client'

export async function StudioPurpose() {
  return (
    <Container className="flex flex-col gap-[calc(111rem/16)] pb-[calc(140rem/16)] pt-24">
      <div className="wg-grid-1 text-[calc(18rem/16)]">
        <h1 className="col-span-5 pr-12 text-left text-accent-foreground">WHO ARE WE?</h1>

        <div className="col-span-7 flex max-w-2xl flex-1 flex-col gap-6 text-[1.1em]">
          <p>
            We develop UX focused software solutions on the Internet & Mobile space for medium and
            large scale business looking to scale their business.
          </p>
        </div>
      </div>

      <div className="wg-grid-1 text-[calc(18rem/16)]">
        <h1 className="col-span-5 pr-12 text-left text-accent-foreground">PROBLEM + OUR PURPOSE</h1>

        <div className="col-span-7 flex max-w-2xl flex-1 flex-col gap-6 text-[1.1em]">
          <p className="">
            We see businesses struggling to create an impact on the internet everyday. Most think they
            are doing it right and we can blame them since they don’t know better.
          </p>

          <p className="opacity-70">
            We exist to show them the possibilities, to be their hands and guide as we unlock their
            desires to impress, convert and scale their ideas.
          </p>
        </div>
      </div>

      <div className="wg-grid-1 text-[calc(18rem/16)]">
        <h1 className="col-span-5 pr-12 text-left text-accent-foreground">OUR SERVICES</h1>
        <div className="col-span-7 flex max-w-2xl flex-1 flex-col gap-6 text-[1.1em]">
          <p className="">
            We offer a wide range of creative & technical services that covers every steps of a
            production & post-production pipeline
          </p>
        </div>
      </div>
    </Container>
  )
}

export async function Skils() {
  const payload = await getPayload({ config: config })

  const entries = await payload.find({
    collection: 'services',
  })

  return (
    <Container className="flex flex-col px-0 py-24">
      <section className="flex flex-col divide-y-[0.5px] divide-white/[0.5] border-y-[0.5px] border-white/[0.5]">
        {entries.docs.map((e) => {
          return <SkillItem key={e.id} data={e} />
        })}
      </section>
    </Container>
  )
}

function SkillItem({ data }: { data: Service }) {
  return (
    <section className="wg-grid-1 px-4 py-11 md:px-0">
      <h4 className="col-span-5 text-[calc(42rem/16)] font-semibold">{data.title}</h4>

      <div className="col-span-7 flex-1 text-foreground opacity-70">
        <RichText data={data.description} />
      </div>
    </section>
  )
}

export async function TeamSection({ team: teamMembers }: { team: TeamMember[] }) {
  return (
    <Container className="flex flex-col gap-2 py-24">
      <SplitHeading>
        {[<>Our&nbsp;</>, 'Team']}
      </SplitHeading>

      <div className="grid-col-1 grid gap-x-5 gap-y-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {teamMembers.map((member) => {
          return <TeamMemberCard key={member.id} doc={member} />
        })}
      </div>
    </Container>
  )
}

function TeamMemberCard(props: { doc: TeamMember }) {
  return (
    <div className="flex flex-col gap-4">
      <ImageMedia
        fill
        alt={props.doc.name}
        pictureClassName="relative aspect-[435/514] w-full flex-1 overflow-hidden bg-gray-200"
        imgClassName="object-cover"
        resource={props.doc.image}
      />

      <div className="flex flex-row justify-between md:flex-col md:justify-start md:-space-y-1">
        <h3 className="text-base">{props.doc.name}</h3>
        <p className="text-base opacity-50">{props.doc.role}</p>
      </div>
    </div>
  )
}
