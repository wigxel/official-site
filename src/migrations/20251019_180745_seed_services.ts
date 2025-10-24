import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { Console, Effect, pipe } from 'effect'

const initial_data = [
  {
    id: 12,
    title: 'Marketing',
    description: {
      root: {
        type: 'root',
        format: '',
        indent: 0,
        version: 1,
        children: [
          {
            type: 'paragraph',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                mode: 'normal',
                text: 'SEO Optimization',
                type: 'text',
                style: '',
                detail: 0,
                format: 0,
                version: 1,
              },
              { type: 'linebreak', version: 1 },
              {
                mode: 'normal',
                text: 'Content Development',
                type: 'text',
                style: '',
                detail: 0,
                format: 0,
                version: 1,
              },
              { type: 'linebreak', version: 1 },
              {
                mode: 'normal',
                text: 'Campaign Management',
                type: 'text',
                style: '',
                detail: 0,
                format: 0,
                version: 1,
              },
              { type: 'linebreak', version: 1 },
              {
                mode: 'normal',
                text: 'Analytics',
                type: 'text',
                style: '',
                detail: 0,
                format: 0,
                version: 1,
              },
            ],
            direction: null,
            textStyle: '',
            textFormat: 0,
          },
        ],
        direction: null,
      },
    },
    authors: [],
  },
  {
    id: 13,
    title: 'Software',
    description: {
      root: {
        type: 'root',
        format: '',
        indent: 0,
        version: 1,
        children: [
          {
            type: 'paragraph',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                mode: 'normal',
                text: 'Mobile (Android/IOS) Development',
                type: 'text',
                style: '',
                detail: 0,
                format: 0,
                version: 1,
              },
            ],
            direction: null,
            textStyle: '',
            textFormat: 0,
          },
          {
            type: 'paragraph',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                mode: 'normal',
                text: 'Web Development',
                type: 'text',
                style: '',
                detail: 0,
                format: 0,
                version: 1,
              },
            ],
            direction: null,
            textStyle: '',
            textFormat: 0,
          },
          {
            type: 'paragraph',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                mode: 'normal',
                text: 'Desktop Development',
                type: 'text',
                style: '',
                detail: 0,
                format: 0,
                version: 1,
              },
            ],
            direction: null,
            textStyle: '',
            textFormat: 0,
          },
        ],
        direction: null,
      },
    },
    authors: [],
  },
  {
    id: 14,
    title: 'Digital Design',
    description: {
      root: {
        type: 'root',
        format: '',
        indent: 0,
        version: 1,
        children: [
          {
            type: 'paragraph',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                mode: 'normal',
                text: 'Product Design',
                type: 'text',
                style: '',
                detail: 0,
                format: 0,
                version: 1,
              },
            ],
            direction: null,
            textStyle: '',
            textFormat: 0,
          },
          {
            type: 'paragraph',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                mode: 'normal',
                text: 'Interaction Design',
                type: 'text',
                style: '',
                detail: 0,
                format: 0,
                version: 1,
              },
            ],
            direction: null,
            textStyle: '',
            textFormat: 0,
          },
          {
            type: 'paragraph',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                mode: 'normal',
                text: 'UI Prototyping',
                type: 'text',
                style: '',
                detail: 0,
                format: 0,
                version: 1,
              },
            ],
            direction: null,
            textStyle: '',
            textFormat: 0,
          },
          {
            type: 'paragraph',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                mode: 'normal',
                text: 'UX Research',
                type: 'text',
                style: '',
                detail: 0,
                format: 0,
                version: 1,
              },
            ],
            direction: null,
            textStyle: '',
            textFormat: 0,
          },
        ],
        direction: null,
      },
    },
    authors: [],
  },
  {
    id: 15,
    title: 'Branding',
    description: {
      root: {
        type: 'root',
        format: '',
        indent: 0,
        version: 1,
        children: [
          {
            type: 'paragraph',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                mode: 'normal',
                text: 'Visual Identity (Logo & Type)',
                type: 'text',
                style: '',
                detail: 0,
                format: 0,
                version: 1,
              },
            ],
            direction: null,
            textStyle: '',
            textFormat: 0,
          },
          {
            type: 'paragraph',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                mode: 'normal',
                text: 'Brand Systems, Product Application, ',
                type: 'text',
                style: '',
                detail: 0,
                format: 0,
                version: 1,
              },
            ],
            direction: null,
            textStyle: '',
            textFormat: 0,
          },
          {
            type: 'paragraph',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                mode: 'normal',
                text: '3D Imagery, Brand Guidelines',
                type: 'text',
                style: '',
                detail: 0,
                format: 0,
                version: 1,
              },
            ],
            direction: null,
            textStyle: '',
            textFormat: 0,
          },
        ],
        direction: null,
      },
    },
    authors: [
      {
        id: 1,
        name: 'Joseph',
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
    ],
  },
]

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  for await (const i of initial_data) {
    await payload.create({
      collection: 'services',
      // @ts-expect-error
      data: i,
    })
  }
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Migration code
  for await (const i of initial_data) {
    await pipe(
      Effect.tryPromise(() =>
        payload.find({ collection: 'services', where: { title: { equals: i.title } } }),
      ),
      Effect.map((e) => e.docs[0]),
      Effect.flatMap((match) => {
        return Effect.gen(function* () {
          yield* Effect.logInfo('Running delete operation')

          return yield* Effect.tryPromise(() => {
            return payload.delete({
              collection: 'services',
              where: {
                title: {
                  equals: match.title,
                },
              },
            })
          })
        })
      }),
      Effect.tap(Console.info),
      Effect.tapError(Console.error),
      Effect.runPromiseExit,
    )
  }
}
