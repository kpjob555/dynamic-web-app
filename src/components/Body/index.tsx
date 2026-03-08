import type { IBodyProps } from './types'
import { ScBody } from './styles'

export function Body({ children }: IBodyProps): React.ReactElement {
  return <ScBody>{children}</ScBody>
}
