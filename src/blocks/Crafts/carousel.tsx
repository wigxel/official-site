'use client'

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Autoplay, EffectCoverflow, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Service } from '@/payload-types'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css'
import 'swiper/css/effect-cards'
import { ImageMedia } from '@/components/Media/ImageMedia'

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
  showNavigation = false,
  loop = true,
  autoplay = false,
  spaceBetween = 40,
}: {
  images: Service[]
  className?: string
  showPagination?: boolean
  showNavigation?: boolean
  loop?: boolean
  autoplay?: boolean
  spaceBetween?: number
}) => {
  const css = `
    .swiper-slide .group {
      opacity: 0.35;
    }

    .swiper-slide.swiper-slide-active .group {
      opacity: 1;
    }

    .swiper-slide .group h3 + p {
      transition-delay: 0;
      scale: 0.7;
    }

    .swiper-slide.swiper-slide-active .group h3 + p {
      transform: translateY(0);
      opacity: 100;
      transition-delay: 1000ms
      scale: 1;
      will-change: scale, opacity, transform;
    }
  `

  return (
    <>
      <style jsx scoped>
        {css}
      </style>

      <Swiper
        spaceBetween={spaceBetween}
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
        slidesPerView={2.2}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 200,
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
          showNavigation
            ? {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }
            : false
        }
        className="Carousal_001"
        modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
      >
        {images.map((image) => (
          <SwiperSlide key={image.id} className="!h-[100vw] w-auto !overflow-visible md:!h-[680px]">
            <ServiceEntry entry={image} />
          </SwiperSlide>
        ))}

        {showNavigation && (
          <div>
            <div className="swiper-button-next after:hidden">
              <ChevronRightIcon className="h-6 w-6 text-white" />
            </div>
            <div className="swiper-button-prev after:hidden">
              <ChevronLeftIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        )}
      </Swiper>
    </>
  )
}

function ServiceEntry({ entry }: { entry: Service }) {
  if (typeof entry.image === 'number') {
    console.warn('Expecting Media. Got number')
    return
  }

  return (
    <div className="transition-default group flex w-[80svw] flex-1 select-none flex-col items-center gap-8 md:w-full md:min-w-[25vw]">
      <div
        className="relative flex h-[calc(500rem/16)] w-full shrink-0 items-end justify-center overflow-hidden md:w-auto"
        style={{
          aspectRatio: (entry?.image?.width || 1) / (entry.image?.height || 1),
        }}
      >
        <ImageMedia fill resource={entry.image} blurDataURL={null} />
      </div>

      <div className="flex h-[calc(148rem/16)] w-full flex-col items-center gap-4 text-center">
        <h3 className="heading-2">{entry.title}</h3>
        <p className="transition-default font-body max-w-lg translate-y-1/2 text-pretty text-center text-base opacity-0">
          {entry.sub_text}
        </p>
      </div>
    </div>
  )
}

export { Carousel_001, Skiper47 }
