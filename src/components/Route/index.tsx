import { useNavigate } from 'react-router-dom'
import type { IRouteProps } from './types'
import { ScRoute } from './styles'

export function Route({ to, children }: IRouteProps): React.ReactElement {
  const navigate = useNavigate()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    navigate(to)
  }

  return (
    <ScRoute href={to} onClick={handleClick}>
      {children}
    </ScRoute>
  )
}
