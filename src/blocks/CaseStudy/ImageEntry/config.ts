import { lexicalEditor } from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

export const ImageGroupEntry: Block = {
  slug: 'imageGroupEntry',
  interfaceName: 'ImageGroupEntry',
  fields: [
    {
      name: 'poster',
      type: 'relationship',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'content',
      type: 'richText',
      required: false,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures]
        },
      }),
      label: 'Image Content/Caption',
    },
    {
      name: 'layout_style',
      type: 'select',
      defaultValue: 'none',
      options: ['none', 'basic', 'over'],
    },
  ],
  graphQL: {
    singularName: 'Image',
  },
  labels: {
    plural: 'Image Blocks',
    singular: 'Image Block',
  },
}
