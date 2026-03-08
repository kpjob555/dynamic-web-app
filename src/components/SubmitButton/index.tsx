import type { ISubmitButtonProps } from './types'
import { ScSubmitButton } from './styles'
import { useFormStore } from '../../store/formStore'

export function SubmitButton({
  children = 'Submit',
  onClick,
  disabled = false,
  style,
  configId,
}: ISubmitButtonProps): React.ReactElement {
  const { clearFormValues } = useFormStore()

  const handleClick = () => {
    if (configId) {
      clearFormValues(configId)
    }
    onClick?.()
  }

  return (
    <ScSubmitButton onClick={handleClick} disabled={disabled} style={style}>
      {children}
    </ScSubmitButton>
  )
}
