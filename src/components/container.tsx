import { cn } from '@/utilities/ui'
import type React from 'react'

export function Container(props: React.ComponentProps<'div'>) {
  const { className, ...PROPS } = props

  return (
    <div className={cn('max-w-8xl w-full mx-auto px-4 xl:px-8', className)} {...PROPS}>
      {props.children}
    </div>
  )
}
