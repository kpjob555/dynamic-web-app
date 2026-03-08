import type { IRowsProps } from './types'
import { ScRows } from './styles'

export function Rows({ children, gap }: IRowsProps): React.ReactElement {
  return <ScRows $gap={gap}>{children}</ScRows>
}
