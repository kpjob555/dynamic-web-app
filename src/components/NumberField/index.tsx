import { useEffect, useState } from 'react'
import type { INumberFieldProps } from './types'
import { ScNumberFieldWrapper, ScLabel, ScInput } from './styles'
import { useFormStore } from '../../store/formStore'

export function NumberField({
  label,
  value: initialValue,
  onChange,
  placeholder,
  disabled = false,
  min,
  max,
  style,
  name,
  configId,
}: INumberFieldProps): React.ReactElement {
  const { getFormValues, setFormValue } = useFormStore()
  
  const [internalValue, setInternalValue] = useState<number | undefined>(initialValue)
  
  useEffect(() => {
    if (name && configId) {
      const formValues = getFormValues(configId)
      const storedValue = formValues[name]
      if (storedValue !== undefined) {
        setInternalValue(storedValue as number)
      }
    }
  }, [name, configId, getFormValues])
  
  const handleChange = (newValue: number) => {
    setInternalValue(newValue)
    
    if (name && configId) {
      setFormValue(configId, name, newValue)
    }
    
    onChange?.(newValue)
  }

  const displayValue = (name && configId) ? internalValue : initialValue

  return (
    <ScNumberFieldWrapper style={style}>
      {label && <ScLabel>{label}</ScLabel>}
      <ScInput
        type="number"
        value={displayValue ?? ''}
        onChange={(e) => handleChange(Number(e.target.value))}
        placeholder={placeholder}
        disabled={disabled}
        min={min}
        max={max}
      />
    </ScNumberFieldWrapper>
  )
}
