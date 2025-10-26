import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

import { linkGroup } from '../../fields/linkGroup'

export const LandingHero: Block = {
  slug: 'landingHero',
  interfaceName: 'LandingHero',
  fields: [
    {
      name: 'heading',
      type: 'textarea',
      defaultValue: 'Human Centric.\nSmart Design.\nBuilt Right.',
      required: true,
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
      name: 'cover_image',
      type: 'relationship',
      relationTo: 'media',
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: {
        maxRows: 2,
      },
    }),
  ],
  labels: {
    plural: 'Landing Heros',
    singular: 'Landing Hero',
  },
}
