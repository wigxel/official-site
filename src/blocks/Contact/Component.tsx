import type { RequiredDataFromCollectionSlug } from 'payload';
import { Container } from '@/components/container';
import { RenderBlocks } from '../RenderBlocks';

export function LandingContactBlockComponent(props: RequiredDataFromCollectionSlug<'pages'>) {
  const { layout } = props;

  return (
    <Container className="pt-[calc(96rem/16)] pb-[14vw] relative overflow-hidden text-gray-950 bg-[#F7F7F7] flex flex-col gap-10">
      <div className="wg-grid-1">
        <div className='col-span-6'>

          <div className='flex flex-col gap-2'>
            <h2 className='not-sr-only font-heading z-0 text-[19.5vw] leading-[1.4ex] absolute bottom-0 z-2 left-0 text-[#DFDFDF]'>
              CONTACT
            </h2>

            <p className='text-2xl font'>
              We work with a limited number of brands each season to ensure deep creative focus and full immersion. if you feel aligned with what we stand for we invite you to reach out and work with us.
            </p>
          </div>

          <div className='layout-form-grid z-10 relative'>
            <RenderBlocks blocks={layout} />
          </div>
        </div>

      </div>
    </Container>
  )
}
