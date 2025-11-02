import type { ImageGroupEntry } from '@/payload-types'

export function ImageEntryComponent(props: ImageGroupEntry) {
  const image = props.poster

  return (
    <div>
      Image: #{typeof image === 'number' ? '' : image?.alt}
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita unde rerum quod. Tempora,
      sed nemo perferendis dolorum similique blanditiis necessitatibus eos et possimus. Odio error
      reiciendis quidem impedit. Nisi, dignissimos.
    </div>
  )
}
