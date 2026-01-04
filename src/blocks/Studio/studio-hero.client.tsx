'use client'
import { Effect } from 'effect'
import { animate } from 'motion/react'
import React from 'react'
import { Container } from '@/components/container'
import { safeStr } from '@/libs/data.helpers'
import { Arr, pipe } from '@/libs/fp.helpers'
import type { Media } from '@/payload-types'

export function GridSlides({ slideImages }: { slideImages: Media[] }) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!ref.current) return
    const entries = ref.current?.querySelectorAll('[data-box]')

    const containers = Array.from(entries)

    if (containers.length === 0) return

    let currentContainer: Element = containers[0]
    let last_index = 0

    const next = () => {
      return Math.floor(Math.random() * containers.length)
    }

    const get_container = () => {
      const next_index = next()
      console.log({ next_index, last_index })
      currentContainer = containers[next_index]
      last_index = next_index
      return currentContainer
    }

    const slider = new SlideOne({
      root: get_container,
      images: slideImages,
    })

    const startTransition = Effect.promise(async (signal) => {
      while (true) {
        if (signal.aborted) {
          break
        }

        slider.params.root = get_container
        await slider.start()
        await slider.close()
      }
    })

    const a = new AbortController()

    Effect.runPromise(startTransition, { signal: a.signal })

    return () => a.abort()
  }, [slideImages])

  return (
    <Container className="absolute pointer-events-none">
      <div
        ref={ref}
        id="image-anchors"
        data-debug={false}
        className="group grid h-[70svh] w-full grid-cols-12"
      >
        <div className="absolute right-0 grid h-[70svh] w-full grid-cols-12 border">
          <div className="col-span-2" />
          <div
            data-box
            className="relative col-span-5 border-blue-100 group-data-[debug=true]:border"
          />
          <div
            data-box
            className="relative col-span-5 border-blue-100 group-data-[debug=true]:border"
          />
        </div>

        <div
          data-box
          className="relative col-span-5 mt-24 border-blue-100 group-data-[debug=true]:border"
        />
        <div
          data-box
          className="relative col-span-5 border-blue-100 group-data-[debug=true]:border"
        />
      </div>
    </Container>
  )
}

class SlideOne {
  constructor(
    public params: { root: () => Element; images: Pick<Media, 'url' | 'width' | 'height'>[] },
  ) { }

  make(entry: { url: string }) {
    const img_el = document.createElement('img')

    const HIDE = 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)'
    const SHOW = 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)'
    const HIDE_UP = 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)'

    img_el.src = safeStr(entry.url)
    img_el.style.clipPath = HIDE

    // img_el.style.top = `${index * 20}px`
    // img_el.style.left = `${index * 20}px`

    return {
      el: img_el,

      enter(style = {}, option = {}) {
        return animate(
          img_el,
          {
            ...style,
            clipPath: SHOW,
          },
          {
            duration: 1,
            // delay: index * 0.15,
            ease: 'backOut',
            ...option,
          },
        )
      },

      exit(style = {}, option = {}) {
        return animate(
          img_el,
          {
            ...style,
            clipPath: HIDE_UP,
          },
          {
            duration: 1,
            onComplete: () => {
              img_el.style.clipPath = HIDE
            },
            ...option,
          },
        )
      },
    }
  }

  async loadImages() {
    const mms = pipe(
      this.params.images,
      Arr.map((entry) => {
        if (!entry.url) return null
        return this.make({ url: entry.url })
      }),
      Arr.filter((e) => e !== null),
    )

    const promises = mms.map((entry) => {
      return new Promise<typeof entry>((res) => {
        entry.el.addEventListener('load', () => {
          res(entry)
        })
      })
    })

    return await Promise.all(promises)
  }

  async start() {
    const mms = await this.loadImages()

    for await (const m of mms) {
      if (!m) continue

      this.params.root().appendChild(m.el)
      await m.enter()
      await delay(3000)
      await m.exit()
    }
  }

  async close() {
    const images = this.params.root().querySelectorAll('img')
    if (!images) return
    if (images.length < 1) return

    const lastImage = images[images.length - 1]

    for (const image of images) {
      if (image !== lastImage) {
        animate(
          image,
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          },
          {
            duration: 0.4,
            onComplete: () => {
              image.remove()
            },
          },
        )
      }
    }

    await animate(
      lastImage,
      {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
      },
      {
        duration: 0.4,
        delay: 0.12,
        onComplete: () => {
          lastImage.remove()
        },
      },
    )
  }
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
