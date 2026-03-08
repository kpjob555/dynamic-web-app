import type { IFooterProps } from './types'
import { ScFooter } from './styles'

export function Footer({ children }: IFooterProps): React.ReactElement {
  return <ScFooter>{children || '© 2026'}</ScFooter>
}
