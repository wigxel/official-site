import config from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { getPayload } from 'payload'
import { Container } from '@/components/container'
import type { Service, TeamMember } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Studio | Wigxel',
}

export default function StudioPage() {
  return (
    <section>
      <Container className="absolute">
        <h1 className="text-7xl font-heading">Studio</h1>
      </Container>

      <div className="aspect-[16/6] w-full bg-[#111] -mt-24" />

      <StudioPurpose />

      <Skils />

      <Container className="wg-grid-1">
        <div className="col-span-5"></div>
        <div className="col-span-7">
          <p className="flex text-[calc(32rem/16)] leading-[2.2ex] max-w-[40ch]">
            We develop UX focused software solutions on the Internet &amp; Mobile space for medium
            and large scale business looking to scale their business.
          </p>
        </div>
      </Container>

      <TeamSection />
    </section>
  )
}

function StudioPurpose() {
  return (
    <Container className="flex flex-col gap-[calc(111rem/16)] pt-24 pb-[calc(140rem/16)]">
      <div className="wg-grid-1 text-[calc(18rem/16)]">
        <h1 className="pr-12 text-left col-span-5 text-accent-foreground">WHO ARE WE?</h1>

        <div className="col-span-7 flex-1 max-w-2xl flex flex-col gap-6 text-[1.1em]">
          <p className="">
            We develop UX focused software solutions on the Internet & Mobile space for medium and
            large scale business looking to scale their business.
          </p>
        </div>
      </div>

      <div className="wg-grid-1 text-[calc(18rem/16)]">
        <h1 className="pr-12 text-left col-span-5 text-accent-foreground">PROBLEM + OUR PURPOSE</h1>

        <div className="col-span-7 flex-1 max-w-2xl flex flex-col gap-6 text-[1.1em]">
          <p className="">
            We see business struggling create an impact on the internet everyday. Most think they
            are doing it right and we can blame them since they don’t know better.
          </p>

          <p className="opacity-70">
            We exist to show them the possibilities, to be their hands and guide as we unlock their
            desires to impress, convert and scale their ideas.
          </p>
        </div>
      </div>

      <div className="wg-grid-1 text-[calc(18rem/16)]">
        <h1 className="pr-12 text-left col-span-5 text-accent-foreground">OUR SERVICES</h1>
        <div className="col-span-7 flex-1 max-w-2xl flex flex-col gap-6 text-[1.1em]">
          <p className="">
            We offer a wide range of creative & technical services that covers every steps of a
            production & post-production pipeline
          </p>
        </div>
      </div>
    </Container>
  )
}

async function Skils() {
  const payload = await getPayload({ config: config })

  const entries = await payload.find({
    collection: 'services',
  })

  return (
    <Container className="flex flex-col py-24 px-0">
      <section className="flex flex-col divide-y-[0.5px] border-y-[0.5px] border-white/[0.5] divide-white/[0.5]">
        {entries.docs.map((e) => {
          return <SkillItem key={e.id} data={e} />
        })}
      </section>
    </Container>
  )
}

function SkillItem({ data }: { data: Service }) {
  return (
    <section className="py-11 wg-grid-1">
      <h4 className="text-[calc(42rem/16)] font-semibold col-span-5">{data.title}</h4>

      <p className="flex-1 opacity-70 text-foreground col-span-7">
        <RichText data={data.description} />
      </p>
    </section>
  )
}

async function TeamSection() {
  const payload = await getPayload({ config: config })
  const teamMembers = await payload.find({
    collection: 'team-member',
    sort: ['-id']
  })

  return (
    <Container className="py-24 flex flex-col gap-10">
      <h2 className="text-4xl font-medium font-heading">Meet The Team</h2>
      <div className="grid grid-cols-3 gap-y-12 gap-x-5">
        {teamMembers.docs.map(member => {
          return <TeamMemberCard key={member.id} doc={member} />
        })}
      </div>
    </Container>
  )
}

function TeamMemberCard(props: { doc: TeamMember }) {
  return (
    <div className="flex flex-col gap-4">
      <figure className="aspect-[435/514] flex-1 w-full bg-gray-200 relative">
        <Image fill alt={props.doc.name}
          className='object-cover'
          // @ts-expect-error
          src={(props.doc.image?.url)}
        />
      </figure>

      <div className="flex flex-col gap-3">
        <h3 className="text-[calc(32rem/16)] border leading-[1ex]">{props.doc.name}</h3>
        <p className="leading-[1] uppercase opacity-75 text-base">{props.doc.role}</p>
      </div>
    </div>
  )
}
