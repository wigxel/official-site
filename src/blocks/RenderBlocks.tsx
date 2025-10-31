import type React from 'react'
import { Fragment } from 'react'
import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import type { Page, Portfolio } from '@/payload-types'
import { BriefComponentBlock } from './CaseStudy/Brief/Component'
import { LandingContactBlockComponent } from './Contact/Component'
import { CraftsBlockComponent } from './Crafts/Component'
import { LandingHeroBlockComponent } from './LandingHero/Component'
import { PartnersBlockComponents } from './Partners/Component'
import { LandingProjectsBlockComponents } from './Projects/Component'

const blockComponents = {
  archive: ArchiveBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  crafts: CraftsBlockComponent,
  landingHero: LandingHeroBlockComponent,
  projects: LandingProjectsBlockComponents,
  partners: PartnersBlockComponents,
  landingContact: LandingContactBlockComponent,
  caseStudyBrief: BriefComponentBlock
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][] | Portfolio['layout']
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block) => {
          const { blockType } = block
          console.log("blockType", blockType);

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div key={block.id}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}



export const PortfolioRenderBlocks: React.FC<{
  blocks: Portfolio['layout']
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <>
        {blocks.map((block) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <Block key={block.id} {...block} />
              )
            }
          }
          return null
        })}
      </>
    )
  }

  return null
}
