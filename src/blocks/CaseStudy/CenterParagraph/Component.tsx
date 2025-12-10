'use client'
import RichText from '@/components/RichText'
import type { CenterContentBlock } from '@/payload-types'
import { ComponentTag } from '../ComponentTag'

export function CenterContentComponent(props: CenterContentBlock) {
  return (
    <>
      <ComponentTag>#CenterContent</ComponentTag>

      <div className="wg-grid-1">
        <section className="col-span-4" />

        <section className="col-span-4">
          {props.heading ? <h2 className="text-lg font-semibold">{props.heading}</h2> : null}

          <div className="col-span-4 text-balance text-muted-foreground">
            {/* @ts-expect-error Figure out later */}
            <RichText data={props.content} enableProse={false} enableGutter={false} />
          </div>
        </section>

        <section className="col-span-4" />
      </div>
    </>
  )
}
