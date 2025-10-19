import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'
import { Effect, pipe } from 'effect'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await payload.create({
    collection: 'users',
    data: {
      id: 1,
      name: 'Joseph',
      password: 'helloman',
      avatar: null,
      email: 'hello@wigxel.io',
      sessions: [
        {
          id: '84e570af-283d-4d07-8aa8-0c22e31858a2',
          createdAt: '2025-10-19T17:01:29.867Z',
          expiresAt: '2025-10-19T19:01:29.867Z',
        },
      ],
    },
  })
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  const params = {
    collection: 'users',
    where: {
      email: {
        equals: 'hello@wigxel.io',
      },
    },
  } as const

  await pipe(
    Effect.tryPromise(() => payload.find(params)),
    Effect.flatMap((a) => {
      if (a.totalDocs === 0) return Effect.succeed({})

      return Effect.tryPromise(() => payload.delete(params))
    }),
    Effect.runPromiseExit,
  )
}
