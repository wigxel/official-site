import config from '@payload-config'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { getPayload } from 'payload'
import { Container } from '@/components/container'
import { Media } from '@/components/Media'
import type { Portfolio } from '@/payload-types'

export async function LandingProjectsBlockComponents() {
  const payload = await getPayload({ config })
  const resource = await payload.find({
    collection: 'portfolios',
    limit: 4,
  })

  return (
    <Container className="flex flex-col gap-10 pt-[calc(160rem/16)]">
      <h2 className="heading-1 whitespace-nowrap">Projects</h2>

      <div className="grid grid-cols-4 gap-[calc(20rem/16)]">
        {resource.docs.map((e) => {
          return <ProjectCard key={e.id} entry={e} />
        })}
      </div>
    </Container>
  )
}

function ProjectCard({ entry }: { entry: Portfolio }) {
  return (
    <Link
      href={`/portfolio/${entry.slug}`}
      className="group flex min-h-[var(--bg-blue-200)] flex-1 flex-col items-center gap-4"
    >
      <Media
        fill
        className="relative aspect-[358/450] w-full bg-gray-800 bg-cover"
        resource={entry.cover_image}
        imgClassName="object-cover"
      />

      <div className="w-full gap-2 text-start">
        <h3 className="flex items-center justify-between gap-2 text-base font-medium">
          {entry.name}
          <ArrowRight className="size-4 -translate-x-6 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
        </h3>

        <p className="font-body line-clamp-2 pe-6 text-sm opacity-70">{entry.short_description}</p>
      </div>
    </Link>
  )
}
