import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Migration code
  await payload.create({
    collection: 'portfolios',
    // @ts-expect-error
    data: dump,
  })
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Migration code
  await payload.delete({
    collection: 'portfolios',
    where: {
      slug: { equals: dump.slug },
    },
  })
}

const dump = {
  id: 1,
  name: 'Demi + Samande Sample',
  short_description:
    'A dynamic digital home for Demi Samande—author, founder, and visionary — crafted to inspire, connect, and empower Africa’s next generation of innovators.',
  client: 'Demi Samande',
  sector: 'Personal Brand',
  slug: 'demi-samande',
}
