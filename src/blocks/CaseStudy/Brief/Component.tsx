'use client'
import RichText from '@/components/RichText'
import type { CaseStudyBriefBlock } from '@/payload-types'

export async function BriefComponentBlock(props: CaseStudyBriefBlock) {
  return (
    <div className="wg-grid-1">
      <h2 className="col-span-4 font-heading text-display-1">{props.heading}</h2>

      <div className="col-span-4 text-balance text-muted-foreground">
        {/* @ts-expect-error Figure out later */}
        <RichText data={props.content} enableProse={false} enableGutter={false} />
      </div>
    </div>
  )
}
