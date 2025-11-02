import { lexicalEditor } from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

export const CenterContentBlock: Block = {
  slug: 'centerContent',
  interfaceName: 'CenterContentBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: false,
    },
    {
      name: 'content',
      type: 'richText',
      required: false,
      editor: lexicalEditor({
        admin: {
          placeholder: 'Type content here...',
        },
        features: ({ defaultFeatures }) => {
          return [...defaultFeatures]
        },
      }),
      label: 'Block Content',
    },
  ],
  graphQL: {
    singularName: 'CenterContentBlock',
  },
  labels: {
    plural: 'CenterContent Blocks',
    singular: 'CenterContent Block',
  },
}
