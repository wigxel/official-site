'use client'
import { range } from 'effect/Array'
import React from 'react'

type T = {
  type: 'stretch'
  columns: number
  gutter: number
  margin: number
  maxWidth: number
}

export function Gutter(props: { breakpoints: T[] }) {
  const [showGutter, setShowGutter] = React.useState(false)

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.shiftKey && event.key === 'G') {
        setShowGutter((prev) => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  if (!showGutter) {
    return null
  }

  return (
    <div
      className="fixed inset-0"
      style={
        {
          pointerEvents: 'none',
          '--column-fill': 'hsl(0deg 100% 58.16% / 22%)',
        } as React.CSSProperties
      }
    >
      {props.breakpoints.map((e) => {
        const columns = range(1, e.columns)

        return (
          <div
            key={e.columns + e.margin + e.maxWidth}
            className="traisition mx-auto flex size-full justify-center"
          >
            <div
              className="flex size-full"
              style={{
                gap: `${e.gutter}px`,
                maxWidth: `${e.maxWidth}px`,
                margin: `0 ${e.margin}px`,
              }}
            >
              {columns.map((index) => {
                return <div key={index} className="flex-1 bg-[--column-fill]" />
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
