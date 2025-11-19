import type { CollectionConfig } from 'payload'
import { anyone } from '@/access/anyone'
import { authenticated } from '../../access/authenticated'

export const Services: CollectionConfig = {
  slug: 'services',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'textarea',
      required: false,
      maxLength: 70,
    },
    {
      name: 'sub_text',
      type: 'textarea',
      required: false,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'image',
      required: false,
      type: 'relationship',
      relationTo: 'media',
      maxDepth: 3,
    },

    {
      name: 'authors',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      maxDepth: 3,
      hasMany: true,
      relationTo: 'users',
    },
  ],
  timestamps: true,
}
