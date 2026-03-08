import type { IHeaderLabelProps } from './types'
import { ScHeaderLabel } from './styles'

export function HeaderLabel({ children, style }: IHeaderLabelProps): React.ReactElement {
  return <ScHeaderLabel style={style}>{children}</ScHeaderLabel>
}
