import type { Block } from 'payload'

export const StudioPageConfig: Block = {
  slug: 'studioHero',
  interfaceName: 'StudioHero',
  fields: [
    {
      type: 'array',
      name: 'teamMembers',
      fields: [
        {
          type: 'relationship',
          name: 'member',
          relationTo: 'team-member',
        },
      ],
    },
    {
      type: 'array',
      name: 'slideImages',
      fields: [
        {
          type: 'relationship',
          name: 'image',
          relationTo: 'media',
        },
      ],
    },
  ],
  labels: {
    plural: 'Studio Heros',
    singular: 'Studio Hero',
  },
}
