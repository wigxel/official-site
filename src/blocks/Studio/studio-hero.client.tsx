'use client'
import { Effect, Exit } from 'effect'
import { range } from 'effect/Array'
import type { Cause } from 'effect/Cause'
import { animate } from 'motion/react'
import React from 'react'
import { Container } from '@/components/container'
import { safeArray, safeStr } from '@/libs/data.helpers'
import { Arr, pipe } from '@/libs/fp.helpers'
import type { Media } from '@/payload-types'

export function GridSlides({ slideImages }: { slideImages: Media[] }) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!ref.current) return
    const entries = ref.current?.querySelectorAll('[data-box]')

    console.assert(slideImages.length > 0, '[GridSlides] Atleast one slide image needed');

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

    async function* save_loop(size: number) {
      while (true) {
        await delay(1000);
        yield Math.floor(Math.random() * size)
      }
    }

    const slideImagesGroup: Media[][] = [];
    let temp = [];
    for (const i in slideImages) {
      const _index = +i;
      const entry = slideImages[_index];


      temp.push(entry);

      if (_index === slideImages.length - 1) {
        slideImagesGroup.push(temp);
        break;
      }

      if (temp.length === 3) {
        slideImagesGroup.push(temp)
        temp = [];
      }
    }

    const SIZE = 3;

    const startTransition = Effect.promise(async (signal) => {
      let change = get_container();

      const slide_containers = range(0, SIZE - 1).map(index => {
        return new SlideOne({
          root: () => change,
          transitionDelay: 0,
          enterDuration: 0.5,
          images: safeArray(slideImagesGroup[index])
        })
      })

      for await (const index of save_loop(SIZE)) {
        if (signal.aborted) {
          break
        }
        const slider = slide_containers[index]
        await slider.start()
        await slider.close()
        change = get_container();
      }
    })

    const a = new AbortController()

    Effect.runPromiseExit(startTransition, { signal: a.signal })
      .then((exit) => {
        return pipe(
          exit,
          Exit.match({
            onFailure: (cause: Cause<unknown>) => {
              console.error("Stream failed", cause);
            },
            onSuccess: (_: unknown) => {
            }
          })
        )
      })


    return () => a.abort()
  }, [slideImages])

  return (
    <Container className="pointer-events-none absolute">
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
  enterDuration: number = 1;

  constructor(
    public params: {
      root: () => Element;
      images: Pick<Media, 'url' | 'width' | 'height'>[],
      transitionDelay?: number;
      enterDuration?: number
    },
  ) {
    console.assert(params.images.length > 0, '[SlideOne] At least one image must be provided');
    this.enterDuration = params.enterDuration ?? 1;
  }

  make(entry: { url: string }) {
    const img_el = document.createElement('img')

    const enterDuration = this.enterDuration;

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
            duration: enterDuration,
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
            duration: enterDuration,
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
    const { transitionDelay = 1000, root } = this.params;
    const mms = await this.loadImages()

    for await (const m of mms) {
      if (!m) {
        continue
      }

      root().appendChild(m.el)
      await delay(transitionDelay)
      await m.enter()
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
