import localFont from 'next/font/local'

export const bodyFont = localFont({
  src: [
    {
      path: '../../public/fonts/Safiro-Regular.woff2',
      weight: '400',
    },
    {
      path: '../../public/fonts/Safiro-Medium.woff2',
      weight: '500',
    },
    {
      path: '../../public/fonts/Safiro-SemiBold.woff2',
      weight: '600',
    },
  ],
  display: 'swap',
  variable: '--font-body',
})

export const displayFont = localFont({
  src: [
    {
      path: '../../public/fonts/Novela-Poster.woff2',
      weight: '400',
    },
    {
      path: '../../public/fonts/Novela-PosterItalic.woff2',
      style: 'italic',
      weight: '500',
    },
  ],
  display: 'swap',
  variable: '--font-display',
})
