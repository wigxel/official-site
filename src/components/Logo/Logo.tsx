import { cn } from '@/libs/utils'

interface Props {
  className?: string
  fillMode: 'outline' | 'default'
}

export const Logo = (props: Props) => {
  const { className } = props

  return (
    <svg
      viewBox="0 0 62 43"
      className={cn('size-12', className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Wigxel Logo</title>
      <path
        d="M23.0102 42.9366L0 0.936632H14.6484L28.0852 25.4469C29.7254 28.4396 30.1137 31.9635 29.1646 35.2434C28.2155 38.5233 26.0067 41.2906 23.0242 42.9366H23.0102ZM49.7501 29.9241L33.8733 0.936632H19.2193L42.2434 42.9366L49.7501 29.9241ZM61.4906 6.70506C61.8262 6.11846 62.0019 5.45353 62 4.77716C61.9981 4.10079 61.8187 3.43684 61.4799 2.85212C61.1411 2.26739 60.6548 1.78251 60.0699 1.44626C59.485 1.11 58.8222 0.934229 58.1481 0.936632H38.7812L45.4188 13.815H57.396L61.4906 6.70506Z"
        data-mode={props.fillMode}
        className="transition-default fill-current stroke-current stroke-1 data-[mode=outline]:fill-transparent data-[mode=outline]:opacity-50"
      />
    </svg>
  )
}
