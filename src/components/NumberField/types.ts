export interface INumberFieldProps {
  label?: string
  value?: number
  onChange?: (value: number) => void
  placeholder?: string
  disabled?: boolean
  min?: number
  max?: number
  style?: React.CSSProperties
  name?: string
  configId?: string
}
