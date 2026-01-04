import { isNumber } from 'effect/Predicate'
import { isNil } from 'lodash-es'
import { safeArray, safeObj } from '@/libs/data.helpers'
import { O, pipe } from '@/libs/fp.helpers'
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

export function expectModel<T>(value: unknown): O.Option<T> {
  if (isNil(value) || isNumber(value)) {
    return O.none()
  }

  return O.fromNullable(value as T)
}

export function expectList<T>(arr: unknown[] | undefined | null): O.Option<T[]> {
  return O.all(
    safeArray(arr as unknown[])
      .map((e) => expectModel<T>(e))
      .filter((e) => O.isSome(e)),
  )
}

export function aspectRatio(value: unknown) {
  return pipe(
    expectMedia(value),
    O.flatMap((e) => {
      return O.all({ width: O.fromNullable(e.width), height: O.fromNullable(e.height) })
    }),
    O.map(({ width, height }) => width / height),
    O.getOrElse(() => 1),
  )
}
