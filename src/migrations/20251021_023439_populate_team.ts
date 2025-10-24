import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

// const DEFAULT_IMAGE = {
//   id: 1,
//   alt: null,
//   caption: null,
//   updatedAt: '2025-10-19T23:35:13.443Z',
//   createdAt: '2025-10-19T23:35:13.443Z',
//   url: '/api/media/file/Avatar.png',
//   thumbnailURL: '/api/media/file/Avatar-300x300.png',
//   filename: 'Avatar.png',
//   mimeType: 'image/png',
//   filesize: 20828,
//   width: 460,
//   height: 460,
//   focalX: 50,
//   focalY: 50,
//   sizes: {
//     thumbnail: {
//       url: '/api/media/file/Avatar-300x300.png',
//       width: 300,
//       height: 300,
//       mimeType: 'image/png',
//       filesize: 23277,
//       filename: 'Avatar-300x300.png',
//     },
//     square: {
//       url: null,
//       width: null,
//       height: null,
//       mimeType: null,
//       filesize: null,
//       filename: null,
//     },
//     small: {
//       url: null,
//       width: null,
//       height: null,
//       mimeType: null,
//       filesize: null,
//       filename: null,
//     },
//     medium: {
//       url: null,
//       width: null,
//       height: null,
//       mimeType: null,
//       filesize: null,
//       filename: null,
//     },
//     large: {
//       url: null,
//       width: null,
//       height: null,
//       mimeType: null,
//       filesize: null,
//       filename: null,
//     },
//     xlarge: {
//       url: null,
//       width: null,
//       height: null,
//       mimeType: null,
//       filesize: null,
//       filename: null,
//     },
//     og: {
//       url: null,
//       width: null,
//       height: null,
//       mimeType: null,
//       filesize: null,
//       filename: null,
//     },
//   },
// }

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // const default_image = await payload.create({
  //   collection: 'media',
  //   data: DEFAULT_IMAGE
  // })

  for await (const a of team_members) {
    await payload.create({
      collection: 'team-member',
      data: { ...a },
    })
  }
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Migration code
  for await (const a of team_members) {
    await payload.delete({
      collection: 'team-member',
      where: {
        name: { equals: a.name },
      },
    })
  }
}

const team_members = [
  {
    id: 6,
    name: 'Janet Daniel',
    role: 'Creative Content Writer',
    // image: DEFAULT_IMAGE,
    // image_landscape: DEFAULT_IMAGE,
    updatedAt: '2025-10-19T23:40:49.813Z',
    createdAt: '2025-10-19T23:40:49.813Z',
  },
  {
    id: 5,
    name: 'Aziba Ekio',
    role: 'Head of Content',
    // image: DEFAULT_IMAGE,
    // image_landscape: DEFAULT_IMAGE,
    updatedAt: '2025-10-19T23:40:27.783Z',
    createdAt: '2025-10-19T23:40:27.783Z',
  },
  {
    id: 4,
    name: 'Miebaka Joshua',
    role: 'Visual Design Lead',
    // image: DEFAULT_IMAGE,
    // image_landscape: DEFAULT_IMAGE,
    updatedAt: '2025-10-19T23:40:07.769Z',
    createdAt: '2025-10-19T23:40:07.769Z',
  },
  {
    id: 3,
    name: 'Voke Omonigho',
    role: 'Product Design Lead',
    // image: DEFAULT_IMAGE,
    // image_landscape: DEFAULT_IMAGE,
    updatedAt: '2025-10-19T23:39:30.619Z',
    createdAt: '2025-10-19T23:39:20.072Z',
  },
  {
    id: 2,
    name: 'Joel Omehoma',
    role: 'Generalist Designer',
    // image: DEFAULT_IMAGE,
    // image_landscape: DEFAULT_IMAGE,
    updatedAt: '2025-10-19T23:37:51.625Z',
    createdAt: '2025-10-19T23:37:51.625Z',
  },
  {
    id: 1,
    name: 'Joseph Owonvwon',
    role: 'Creative Developer',
    // image: DEFAULT_IMAGE,
    // image_landscape: DEFAULT_IMAGE,
    updatedAt: '2025-10-19T23:37:26.632Z',
    createdAt: '2025-10-19T23:35:37.699Z',
  },
]
