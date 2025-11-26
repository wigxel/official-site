import clsx, { type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { O } from './fp.helpers'
import { animate } from 'motion/react'

export const cn = (...args: ClassValue[]) => twMerge(clsx(...args))

export function safeReference<TEntry>(
  entry: TEntry,
): O.Option<Exclude<TEntry, number | undefined | null>> {
  if (typeof entry === 'number') return O.none()
  if (typeof entry === 'undefined') return O.none()
  if (entry === null) return O.none()

  return O.fromNullable(entry as Exclude<TEntry, number | undefined | null>)
}
/**
 * Convert a string into a URL-friendly slug.
 *
 * Options:
 * - lower (default true): convert output to lowercase
 * - separator (default '-'): character to use as word separator
 * - maxLength (optional): maximum length of output (will not end with a separator)
 * - preserveUnicode (default false): if true, keeps Unicode letters (uses Unicode property escapes)
 */
export function slugify(
  input: string,
  opts?: {
    lower?: boolean
    separator?: string
    maxLength?: number
    preserveUnicode?: boolean
  },
): string {
  const { lower = true, separator = '-', maxLength, preserveUnicode = false } = opts || {}

  const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

  let s = String(input || '').trim()

  // Normalize and remove diacritics when not preserving Unicode letters
  if (!preserveUnicode) {
    // NFKD separates base characters from diacritics, which we then strip
    s = s.normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
  }

  // Replace groups of non-alphanumeric characters with the separator
  if (preserveUnicode) {
    // Keep Unicode letters and numbers
    s = s.replace(/[^\p{L}\p{N}]+/gu, separator)
  } else {
    s = s.replace(/[^a-zA-Z0-9]+/g, separator)
  }

  // Collapse multiple separators into one
  const sepEsc = escapeRegExp(separator)
  s = s.replace(new RegExp(`${sepEsc}{2,}`, 'g'), separator)

  // Trim leading/trailing separators
  s = s.replace(new RegExp(`^${sepEsc}+|${sepEsc}+$`, 'g'), '')

  if (lower) s = s.toLowerCase()

  if (typeof maxLength === 'number' && maxLength > 0) {
    s = s.slice(0, maxLength)
    // Trim trailing separator after truncation
    s = s.replace(new RegExp(`${sepEsc}+$`, 'g'), '')
  }

  return s
}

export const getCssVarInPx = (document: Document, varName: string): number => {
  const rootStyle = getComputedStyle(document.documentElement)
  const rawValue = rootStyle.getPropertyValue(varName)?.trim() || ''

  if (!rawValue) return 0

  if (rawValue.endsWith('px')) {
    return parseFloat(rawValue) || 0
  }

  if (rawValue.endsWith('rem')) {
    const rootFontSize = parseFloat(rootStyle.fontSize) || 16
    return (parseFloat(rawValue) || 0) * rootFontSize
  }

  // fallback: try to parse whatever value is provided (e.g., number)
  return parseFloat(rawValue) || 0
}

export function scrollTo({ offset }: { offset: number }) {
  const headerHeight = getCssVarInPx(document, '--header-height');
  const targetOffset = offset - headerHeight

  animate(window.scrollY, targetOffset, {
    type: 'tween',
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1],
    onUpdate: (v) => {
      window.scrollTo(0, v)
    },
  })
}
