'use client'

import type { StaticImageData } from 'next/image'
import NextImage from 'next/image'
import type React from 'react'
import { cssVariables } from '@/cssVariables'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { cn } from '@/utilities/ui'
import type { Props as MediaProps } from '../types'

const { breakpoints } = cssVariables

// A base64 encoded image to use as a placeholder while the image is loading
const placeholderBlur =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFCUlEQVR4AXyWi3YbNwxEgcHKSeykTZP//1STvQOSkuyTVodDPGbw2JWTI0XGvCOe/NKMl2vG68usH9/m7efb/Prr+3z9/X2+/X4Dr/Pt1zfwZb7+8zK//bzNL3/f5stf17x+XFPfa8YbeNWMr+BL0g/c8I0L7kLH8GgEnwQ+tgcm8TlmFjLJgnToa6FvcziZGRwEGcFZVzsRTtgF4hMpe09IoSFGmJm+IxN7EE8+ORlSuNcHJH2UqxeGsu0TwGVmqK6Kui5QkaUIGjVSkfhKRCCpJsON57ihkDVVUQJFH/vbqkReEWgjj131kkLU6LpdcbHAQVWFCtKwKPFBAX2GeaEH1Q9ScTH8GUJTEvOTRWzpZz25qgoWuMXtdovLYJEyIErV25cUj+EZa4mkoUKtQWf9GUx9Pwy5y0BjnetKWj0Law7odnn44y3cdoOCLNFcYpC60E30HNu37oBaP0AvgH/eRGnXY9U9K3o56lQWfsCDLFGYLJHiyXl6YiXWsX2aqRTF03cf7BrqHufvQeFhspa6Enr8MqpCl787F+4limRDR2grFlAUDe5vwf7WqCq6xr3oUwY5Dy7BNajXRmHhC8jitQRCEk6WtgArg2El9RInTsdG12gt0P6jj7R9dCU0wA9QWn5Joaotwqp0byTIEnEqXPQB5M3fURWq2rXa1jH+0aa6TwnbqJBAUaiyoyhhJQjhC5t3ZGakiBOb5v6A7vPood2rl3ftn+PTiMI6vvi/Yw1KD7uDHE2SZpnLF/FnlB59FufFybnGuPPklwCSpmtThtu3CLFAJsOesHLUOCc4sPp0w0jXbmTCG2gy4Tcy7bsHxCpegzNN7CL8zP/wqTtvwosvnx7o9YGjXh6Ehcv8aOVXnPmU1JPf+QjMhrkIB5n2Fz7HmSufmRHdL+JolnWYXAFtEchMOBAJkUGIjWjHwUbm4jL84T4xNjrsKzJzIbBGRpBq4IU/mekFYiUJ2rEw1ieTANe3XVtCDh4nAGfFfROtQ7QPsXXhy03i+TNDK7RqeXGEJ2VrBB9b0H24cMPyRvDphH9W4fsQc5pG7swCP4zamRH8Pmr36Zr8LoMhYw9D7PuBxRIn8JlLObEP8VL5nkd3SCfxXdVvwI5x3x0Bx62BPVi2nmA9zs6ZxeVQisaxG7MIJ3ohcj7NsohtA4F5+aKGBhw6cQiRWNAeeXfYgNmezVIziQPjmgNqXUkWoXUr6tsaeM/uBSy6wyT6e2zhE+j2iFq7lfbH+LDIcK7RY+G2dQe0Yw7+BhAM4G3usODk7H/ChyXMoT09xm48aN79zG/0eLQTbtiiXW+AoBPYebCLOj7+k+0lJi3Re+jspiPaH7wVA24aXYe27QzPGluvYQGbTGB/bMKFA27sovnZwkXAYlvreoN47B625hq7fsBP89aCfgMryQgSswWzt5xdxJC2K4on39pBM1tj+KnpMQ7oNUBXYlenQe8NdPKTd7EFG46NLiY3PeQ+uF/+PZrwA95D57b2B3nHk7fUvis6R6Z17/E+3mN9BZuY2w7Extz2+I/RvIetPTW2a/DgCan0kKOhD5m+h2/yo/kRcuH/wgVMPg3a0oAVYCC4Xe+Gbf01uHnb2ctYezDNgbb9FewGk6bTvvHse4ZzWPMYzvase8LYflvXECPe//69wnRophebLCIizmmIaGm2EEOTlVo3CpI+q2ZluTme1FnXAGsdG4vbGbi58S8AAAD//+ZHS9gAAAAGSURBVAMA4c+a9p0iqfcAAAAASUVORK5CYII='

export const ImageMedia: React.FC<MediaProps> = (props) => {
  const {
    alt: altFromProps,
    fill,
    pictureClassName,
    imgClassName,
    priority,
    resource,
    size: sizeFromProps,
    src: srcFromProps,
    loading: loadingFromProps,
    blurDataURL,
  } = props

  let width: number | undefined
  let height: number | undefined
  let alt = altFromProps
  let src: StaticImageData | string = srcFromProps || ''

  if (!src && resource && typeof resource === 'object') {
    const { alt: altFromResource, height: fullHeight, url, width: fullWidth } = resource

    width = fullWidth!
    height = fullHeight!
    alt = altFromResource || ''

    const cacheTag = resource.updatedAt

    src = getMediaUrl(url, cacheTag)
  }

  const loading = loadingFromProps || (!priority ? 'lazy' : undefined)

  // NOTE: this is used by the browser to determine which image to download at different screen sizes
  const sizes = sizeFromProps
    ? sizeFromProps
    : Object.entries(breakpoints)
        .map(([, value]) => `(max-width: ${value}px) ${value * 2}w`)
        .join(', ')

  return (
    <picture className={cn(pictureClassName)}>
      <NextImage
        alt={alt || ''}
        className={cn(imgClassName)}
        fill={fill}
        height={!fill ? height : undefined}
        placeholder={blurDataURL === null ? undefined : 'blur'}
        blurDataURL={blurDataURL === null ? undefined : (blurDataURL ?? placeholderBlur)}
        priority={priority}
        draggable={false}
        quality={100}
        loading={loading}
        sizes={sizes}
        src={src}
        width={!fill ? width : undefined}
      />
    </picture>
  )
}
