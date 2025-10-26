import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Collaborations: CollectionConfig = {
  slug: 'collaborations',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'collab_type',
      type: 'select',
      options: ['Client', 'Partners'],
      defaultValue: 'Client',
    },
    {
      name: 'logo',
      type: 'relationship',
      relationTo: 'media',
    },
  ],
  versions: {
    maxPerDoc: 12,
  },
}
