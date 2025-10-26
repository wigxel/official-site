import type * as React from 'react'
import { cn } from '@/utilities/ui'

const Input: React.FC<
  {
    ref?: React.Ref<HTMLInputElement>
  } & React.InputHTMLAttributes<HTMLInputElement>
> = ({ type, className, ref, ...props }) => {
  return (
    <div className="relative group">
      <input
        className={cn(
          'flex h-10 z-20 relative w-full border-b font-medium bg-transparent border-border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        type={type}
        {...props}
      />

      <span className="group-focus-within:top-0 z-10 top-full bottom-0 input-border-transition inset-x-0 bg-orange-500/20 absolute"></span>
    </div>
  )
}

export { Input }
