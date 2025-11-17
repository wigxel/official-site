'use client'
import { Slot } from '@radix-ui/react-slot'
import React from 'react'
import { cn } from '@/libs/utils'

type HoverValue = Partial<{
  duration: number
  opacity: number
  w: number
  h: number
  x: number
  y: number
}>

const isNumber = (a: unknown): a is number => !Object.is(NaN, +String(a))

type Context = {
  allowedEvents: ('click' | 'hover')[]
  hoverIndicatorRef: React.RefObject<HTMLDivElement | null>
  transitionHoverIndicator: (config: HoverValue) => void
}

const ctx = React.createContext<Context>({} as Context)

export const SmartHoverRoot = (
  props: React.ComponentProps<'div'> & {
    events?: ('click' | 'hover')[]
  },
) => {
  // keeps track of the indicator
  const hoverIndicator = React.useRef<HTMLDivElement>(null)

  const transitionHoverIndicator = React.useCallback(
    ({ duration, w: width, h: height, opacity, y = 0, x = 0 }: HoverValue) => {
      const indicator = hoverIndicator.current
      if (indicator === null) {
        return console.warn('SmartHover::Indicator is missing')
      }

      if (isNumber(opacity)) indicator.style.opacity = String(opacity)

      if (width) indicator.style.width = `${width}px`

      if (height) {
        indicator.style.height = `${height}px`
      }

      if (x > -1 && y > -1) {
        indicator.style.transform = `translate(${x}px, ${y}px)`
      }

      if (isNumber(duration)) indicator.style.transitionDuration = `${duration}ms`
    },
    [],
  )

  return (
    <ctx.Provider
      value={{
        allowedEvents: props.events ?? ['hover'],
        hoverIndicatorRef: hoverIndicator,
        transitionHoverIndicator,
      }}
    >
      <Slot className={cn(props.className, 'relative')}>{props.children}</Slot>
    </ctx.Provider>
  )
}

export const SmartHoverItem = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  function SmartHoverItem(props, ref) {
    const { transitionHoverIndicator, allowedEvents = ['hover'] } = React.useContext(ctx)
    const { ...PROPS } = props

    const itemProps: Partial<React.ComponentProps<'div'>> = React.useMemo(
      () => ({
        onMouseEnter: ({ currentTarget }) => {
          const value: HoverValue = {
            w: currentTarget.clientWidth,
            h: currentTarget.clientHeight,
            x: currentTarget.offsetLeft,
            y: currentTarget.offsetTop,
            opacity: 1,
          }
          transitionHoverIndicator(value)
        },

        onMouseLeave: () => {
          transitionHoverIndicator({ duration: 150 })
        },

        onFocus({ currentTarget }) {
          const value: HoverValue = {
            w: currentTarget.clientWidth,
            h: currentTarget.clientHeight,
            x: currentTarget.offsetLeft,
            y: currentTarget.offsetTop,
            opacity: 1,
          }
          transitionHoverIndicator(value)
        },

        onClick({ currentTarget }) {
          const value: HoverValue = {
            w: currentTarget.clientWidth,
            h: currentTarget.clientHeight,
            x: currentTarget.offsetLeft,
            y: currentTarget.offsetTop,
            opacity: 1,
          }

          transitionHoverIndicator(value)
        },
      }),
      [transitionHoverIndicator],
    )

    const eventHandlers = (() => {
      const events: Partial<React.ComponentProps<'div'>> = {}

      if (allowedEvents.includes('click')) {
        events.onClick = (event) => {
          props.onClick?.(event)
          itemProps.onClick?.(event)
        }
      }

      if (allowedEvents.includes('hover')) {
        events.onFocus = itemProps.onFocus
        events.onMouseEnter = itemProps.onMouseEnter
        events.onMouseLeave = itemProps.onMouseLeave
      }

      return events
    })()

    return <Slot ref={ref} {...PROPS} {...eventHandlers} />
  },
)

export function SmartHoverTracker(props: React.ComponentProps<'div'>) {
  const { hoverIndicatorRef } = React.useContext(ctx)
  const { className, ...PROPS } = props

  return (
    <div
      {...PROPS}
      ref={(el) => {
        if (el === null) return
        hoverIndicatorRef.current = el
      }}
      className={cn('absolute top-0 transform rounded-lg border transition-all ease-in', className)}
    />
  )
}

export function SmartHoverContent(props: React.ComponentProps<'ul'>) {
  const { transitionHoverIndicator, allowedEvents } = React.useContext(ctx)
  const { className, ...PROPS } = props

  const hoverHandlers = {
    onMouseEnter: () => transitionHoverIndicator({ opacity: 1 }),
    onMouseLeave: () => transitionHoverIndicator({ duration: 0, opacity: 0 }),
  }

  return (
    <ul
      {...PROPS}
      className={cn('relative', className)}
      {...(allowedEvents.includes('hover') ? hoverHandlers : {})}
    >
      {props.children}
    </ul>
  )
}

export function SmartHoverDemo() {
  return (
    <SmartHoverRoot>
      <div className="mx-5">
        <SmartHoverTracker className="w-full rounded-full" />
        <SmartHoverContent className="flex *:w-full *:border *:border-red-200 *:p-4">
          {['HOME', 'SOMETHING', 'OTHERS'].map((e) => (
            <SmartHoverItem key={e}>
              <li>{e}</li>
            </SmartHoverItem>
          ))}
        </SmartHoverContent>
      </div>
    </SmartHoverRoot>
  )
}
