import config from '@payload-config'
import { getPayload } from 'payload'
import { useId } from 'react'
import { Container } from '@/components/container'
import { Media } from '@/components/Media'
import type { Portfolio } from '@/payload-types'
import { ArrowRight, ArrowUpLeft, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

export async function LandingProjectsBlockComponents() {
  const id = useId()
  const payload = await getPayload({ config })
  const resource = await payload.find({
    collection: 'portfolios',
    limit: 4,
  })

  return (
    <Container className="pt-[calc(160rem/16)] flex flex-col gap-10">
      <h2 className="heading-1 whitespace-nowrap">Projects</h2>

      <div id={`carousel-${id}`} className="grid gap-[calc(20rem/16)] grid-cols-4">
        {resource.docs.map((e) => {
          return <ProjectEntry key={e.id} entry={e} />
        })}
      </div>
    </Container>
  )
}

function ProjectEntry({ entry }: { entry: Portfolio }) {
  return (
    <Link href={`/portfolio/${entry.slug}`} className="flex-1 group flex flex-col gap-4 items-center">
      <Media
        fill
        className="aspect-[358/450] w-full relative bg-gray-800 bg-cover"
        resource={entry.cover_image}
        imgClassName="bg-cover"
      />

      <div className="text-start gap-2 w-full">
        <h3 className="flex items-center text-base gap-2 font-medium">
          {entry.name}
          <ArrowRight className="size-4" />
        </h3>

        <p className="text-sm font-body opacity-70 line-clamp-2 pe-6">{entry.short_description}</p>
      </div>
    </Link>
  )
}
