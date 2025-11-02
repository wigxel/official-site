import clsx, { type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { O } from './fp.helpers'

export const cn = (...args: ClassValue[]) => twMerge(clsx(...args))

export function safeReference<TEntry>(
  entry: TEntry,
): O.Option<Exclude<TEntry, number | undefined | null>> {
  if (typeof entry === 'number') return O.none()
  if (typeof entry === 'undefined') return O.none()
  if (entry === null) return O.none()

  return O.fromNullable(entry as Exclude<TEntry, number | undefined | null>)
}
