export interface IOption {
  label: string
  value: string
}

export interface ISingleDropdownProps {
  label?: string
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  style?: React.CSSProperties
  name?: string
  configId?: string
  options?: IOption[]
}
