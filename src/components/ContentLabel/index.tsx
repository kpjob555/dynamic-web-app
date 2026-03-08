import type { IContentLabelProps } from './types'
import { ScContentLabel } from './styles'

export function ContentLabel({ children, style }: IContentLabelProps): React.ReactElement {
  return <ScContentLabel style={style}>{children}</ScContentLabel>
}
