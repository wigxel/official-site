import type { Portfolio } from '@/payload-types'
import { blockComponents } from '../RenderBlocks'

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
              // @ts-expect-error Figure out later
              return <Block key={block.id} {...block} />
            }
          }
          return null
        })}
      </>
    )
  }

  return null
}
