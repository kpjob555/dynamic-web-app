export interface IOption {
  label: string
  value: string
}

export interface IRadioProps {
  label?: string
  name: string
  options: IOption[]
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  style?: React.CSSProperties
  configId?: string
}
