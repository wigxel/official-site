import type * as React from 'react'
import { cn } from '@/utilities/ui'

const Input: React.FC<
  {
    ref?: React.Ref<HTMLInputElement>
  } & React.InputHTMLAttributes<HTMLInputElement>
> = ({ type, className, ref, ...props }) => {
  return (
    <div className="group relative">
      <input
        className={cn(
          'relative z-20 flex h-10 w-full border-b border-border bg-transparent px-3 py-2 text-sm font-medium file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        type={type}
        {...props}
      />

      <span className="input-border-transition absolute inset-x-0 bottom-0 top-full z-10 bg-orange-500/20 group-focus-within:top-0"></span>
    </div>
  )
}

export { Input }
