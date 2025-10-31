import { lexicalEditor } from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

export const BriefBlock: Block = {
  slug: 'caseStudyBrief',
  interfaceName: 'CaseStudyBriefBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: "The Brief",
    },
    {
      name: 'content',
      type: 'richText',
      required: false,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures
          ]
        },
      }),
      label: 'Intro Content',
    },
  ],
  graphQL: {
    singularName: 'Brief',
  },
  labels: {
    plural: 'Brief Blocks',
    singular: 'Brief Block',
  },
}
