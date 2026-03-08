import type { IColumnsProps } from './types'
import { ScColumns } from './styles'

export function Columns({ children, gap }: IColumnsProps): React.ReactElement {
  return <ScColumns $gap={gap}>{children}</ScColumns>
}
