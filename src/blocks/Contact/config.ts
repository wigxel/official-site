import type { Block } from 'payload'
import { FormBlock } from '../Form/config'

export const LandingContactBlock: Block = {
  slug: 'landingContact',
  interfaceName: 'WigxelContactForm',
  fields: [
    {
      name: 'layout',
      type: 'blocks',
      blocks: [FormBlock],
      required: true,
      admin: {
        initCollapsed: true,
      },
    },
  ],
  labels: {
    plural: 'Landing Contact Blocks',
    singular: 'Landing Contact Block',
  },
}
