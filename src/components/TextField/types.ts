export interface ITextFieldProps {
  label?: string
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  style?: React.CSSProperties
  name?: string
  configId?: string
}
