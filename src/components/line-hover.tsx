import { Slot } from '@radix-ui/react-slot'

export function LineHover(props: { children: React.ReactNode }) {
  return <Slot className="hover:underline">{props.children}</Slot>
}
