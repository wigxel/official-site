import type { Block } from 'payload'

export const PartnersBlock: Block = {
  slug: 'partners',
  interfaceName: 'WigxelPartners',
  fields: [
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'item',
          type: 'relationship',
          relationTo: 'collaborations',
        },
      ],
    },
  ],
  labels: {
    plural: 'Partners',
    singular: 'Partner',
  },
}
