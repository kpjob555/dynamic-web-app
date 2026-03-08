import type { ISidebarProps } from './types'
import { ScSidebar } from './styles'

export function Sidebar({ children }: ISidebarProps): React.ReactElement {
  return <ScSidebar>{children}</ScSidebar>
}
