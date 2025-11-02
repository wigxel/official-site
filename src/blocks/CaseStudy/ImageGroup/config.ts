import type { Block } from 'payload'
import { ImageGroupEntry } from '../ImageEntry/config'

export const ImageGroupBlock: Block = {
  slug: 'imageGroup',
  interfaceName: 'ImageGroupBlock',
  fields: [
    {
      name: 'images',
      type: 'blocks',
      required: false,
      blocks: [ImageGroupEntry],
    },
  ],
  graphQL: {
    singularName: 'ImageGroup',
  },
  labels: {
    plural: 'Image Group Blocks',
    singular: 'Image Group Block',
  },
}
