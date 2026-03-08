import { useState } from 'react'
import type { ITooltipProps } from './types'
import { ScTooltipWrapper, ScTooltipContent } from './styles'

export function Tooltip({ content, children }: ITooltipProps): React.ReactElement {
  const [visible, setVisible] = useState(false)

  return (
    <ScTooltipWrapper
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      <ScTooltipContent $visible={visible}>{content}</ScTooltipContent>
    </ScTooltipWrapper>
  )
}
