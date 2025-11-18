import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

import { linkGroup } from '../../fields/linkGroup'

export const CraftsBlock: Block = {
  slug: 'crafts',
  interfaceName: 'WigxelCrafts',
  fields: [
    {
      type: 'text',
      name: 'subHeading',
      defaultValue: 'How we shape your vision into results.',
      required: false,
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    {
      name: 'services',
      type: 'array',
      fields: [
        {
          name: 'service',
          type: 'relationship',
          relationTo: 'services',
        },
      ],
      maxRows: 6,
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: {
        maxRows: 2,
      },
    }),
  ],
  labels: {
    plural: 'Crafts',
    singular: 'Crafts',
  },
}
