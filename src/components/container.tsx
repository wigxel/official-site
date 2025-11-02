import type React from 'react'
import { cn } from '@/utilities/ui'

export function Container(props: React.ComponentProps<'div'>) {
  const { className, ...PROPS } = props

  return (
    <div className={cn('max-w-8xl mx-auto w-full px-4 xl:px-8', className)} {...PROPS}>
      {props.children}
    </div>
  )
}
