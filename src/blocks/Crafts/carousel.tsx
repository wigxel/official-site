'use client'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Autoplay, EffectCoverflow, Navigation, Pagination } from 'swiper/modules'
import { Swiper, type SwiperRef, SwiperSlide } from 'swiper/react'
import { useMediaQuery } from 'usehooks-ts'
import type { Service } from '@/payload-types'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css'
import 'swiper/css/effect-cards'
import React from 'react'
import { ImageMedia } from '@/components/Media/ImageMedia'
import { cn } from '@/libs/utils'

const Skiper47 = ({ images = [] }: { images: Service[] }) => {
  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden">
      <Carousel_001 className="" images={images} loop autoplay />
    </div>
  )
}

const Carousel_001 = ({
  images,
  showPagination = false,
  loop = true,
  spaceBetween = 40,
  autoplay = false,
}: {
  images: Service[]
  className?: string
  showPagination?: boolean
  showNavigation?: boolean
  loop?: boolean
  autoplay?: boolean
  spaceBetween?: number
}) => {
  const isMobile = useMediaQuery('(max-width: 600px)', { defaultValue: true })
  const swipeRef = React.useRef<SwiperRef>(null)

  return (
    <Swiper
      spaceBetween={spaceBetween}
      ref={swipeRef}
      autoplay={
        autoplay
          ? {
              delay: 5000,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            }
          : false
      }
      effect="coverflow"
      grabCursor={true}
      centeredSlides={true}
      loop={loop}
      slidesPerView={isMobile ? 2 : 2.2}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      }}
      pagination={
        showPagination
          ? {
              clickable: true,
            }
          : false
      }
      navigation={
        isMobile
          ? {
              nextEl: '.swp-button-next',
              prevEl: '.swp-button-prev',
            }
          : false
      }
      data-scroll-container
      className="relative h-[60vh]"
      modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
    >
      {images.map((image) => (
        <SwiperSlide
          key={image.id}
          data-mobile={isMobile}
          className="group !h-[100vw] w-auto !overflow-visible md:!h-[680px]"
          onClick={() => {}}
        >
          <ServiceEntry entry={image} />
        </SwiperSlide>
      ))}

      {isMobile && (
        <div className="absolute inset-x-0 bottom-1/3 z-20 flex items-center justify-between overflow-visible">
          <div className="swp-button-prev px-4 text-2xl text-white after:hidden">←</div>
          <div className="swp-button-next px-4 text-2xl text-white after:hidden">→</div>
        </div>
      )}
    </Swiper>
  )
}

function ServiceEntry({ entry }: { entry: Service }) {
  if (typeof entry.image === 'number') {
    console.warn('Expecting Media. Got number')
    return
  }

  return (
    <div
      className={cn(
        'transition-default flex flex-1 select-none flex-col items-center gap-8 md:w-full md:min-w-[25vw]',
      )}
    >
      <div
        className={cn(
          'transtion-default relative flex aspect-square w-[100vw] shrink-0 scale-[0.40] items-end justify-center opacity-[0.35] md:h-[calc(500rem/16)] md:w-auto md:scale-[0.85]',
          'group-[.swiper-slide-active]:scale-100 group-[.swiper-slide-active]:opacity-100 md:group-[.swiper-slide-active]:scale-110',
        )}
      >
        <ImageMedia fill resource={entry.image} blurDataURL={null} />
      </div>

      <div className="h-[calc(148rem/16)] w-[100vw] flex-col items-center gap-4 text-center group-[.swiper-slide-active]:flex data-[mobile=true]:hidden md:relative md:!flex md:w-full md:scale-100">
        <h3 className={cn('heading-2 opacity-0', 'group-[.swiper-slide-active]:opacity-100')}>
          {entry.title}
        </h3>
        <p
          className={cn(
            'transition-default font-body max-w-xs translate-y-1/2 text-pretty text-center text-base opacity-0 delay-0',
            'group-[.swiper-slide-active]:delay-[2000ms] group-[.swiper-slide-active]:delay-[2000ms] group-[.swiper-slide-active]:translate-y-0 group-[.swiper-slide-active]:opacity-100',
          )}
        >
          {entry.caption}
        </p>
      </div>
    </div>
  )
}

export { Carousel_001, Skiper47 }
