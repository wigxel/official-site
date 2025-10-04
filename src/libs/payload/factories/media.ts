import { safeObj } from '@/libs/data.helpers'
import { O } from '@/libs/fp.helpers'
import type { Media } from '@/payload-types'

const keys = new Set([
  'id',
  'alt',
  'caption',
  'updatedAt',
  'createdAt',
  'url',
  'filename',
  'mimeType',
  'filesize',
  'width',
  'height',
  'focalX',
  'focalY',
  'sizes',
])

export function isMedia(value: unknown): value is Media {
  const obj = safeObj(value)
  const now_keys = new Set(Object.keys(obj))

  return keys.isSubsetOf(now_keys)
}

export function expectMedia(value: unknown): O.Option<Media & { kind: 'media' }> {
  if (!isMedia(value)) {
    return O.none()
  }

  return O.fromNullable({ kind: 'media', ...value })
}
