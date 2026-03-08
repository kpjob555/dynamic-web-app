import type { ICancelButtonProps } from './types'
import { ScCancelButton } from './styles'
import { useFormStore } from '../../store/formStore'

export function CancelButton({
  children = 'Cancel',
  onClick,
  disabled = false,
  style,
  configId,
}: ICancelButtonProps): React.ReactElement {
  const { clearFormValues } = useFormStore()

  const handleClick = () => {
    if (configId) {
      clearFormValues(configId)
    }
    onClick?.()
  }

  return (
    <ScCancelButton onClick={handleClick} disabled={disabled} style={style}>
      {children}
    </ScCancelButton>
  )
}
