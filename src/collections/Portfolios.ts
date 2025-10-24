import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Portofolios: CollectionConfig = {
  slug: 'portfolios',
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
      name: 'short_description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'client',
      type: 'text',
      defaultValue: 'Client Name',
    },
    {
      name: 'scope',
      type: 'array',
      fields: [
        {
          name: 'service',
          type: 'relationship',
          relationTo: 'services',
        },
      ],
    },
    {
      name: 'sector',
      type: 'text',
      defaultValue: 'Personal Brand',
    },
    {
      name: 'project_type',
      type: 'select',
      options: ['Portfolio', 'Case Study'],
      defaultValue: 'Portfolio',
    },
    {
      name: 'cover_image',
      type: 'relationship',
      relationTo: 'media',
    },
    ...slugField(),
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
