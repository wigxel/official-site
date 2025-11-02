import type React from 'react'
import type { BannerBlock as BannerBlockProps } from 'src/payload-types'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

type Props = {
  className?: string
} & BannerBlockProps

export const BannerBlock: React.FC<Props> = ({ className, content, style }) => {
  return (
    <div className={cn('mx-auto my-8 w-full', className)}>
      <div
        className={cn('flex items-center rounded border px-6 py-3', {
          'border-border bg-card': style === 'info',
          'bg-error/30 border-error': style === 'error',
          'bg-success/30 border-success': style === 'success',
          'bg-warning/30 border-warning': style === 'warning',
        })}
      >
        <RichText data={content} enableGutter={false} enableProse={false} />
      </div>
    </div>
  )
}
