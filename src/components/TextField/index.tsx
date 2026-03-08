import { useEffect, useState } from 'react'
import type { ITextFieldProps } from './types'
import { ScTextFieldWrapper, ScLabel, ScInput } from './styles'
import { useFormStore } from '../../store/formStore'

export function TextField({
  label,
  value: initialValue,
  onChange,
  placeholder,
  disabled = false,
  style,
  name,
  configId,
}: ITextFieldProps): React.ReactElement {
  const { getFormValues, setFormValue } = useFormStore()
  
  // Get initial value from store if name and configId provided
  const [internalValue, setInternalValue] = useState(initialValue || '')
  
  useEffect(() => {
    if (name && configId) {
      const formValues = getFormValues(configId)
      const storedValue = formValues[name]
      if (storedValue !== undefined) {
        setInternalValue(storedValue as string)
      }
    }
  }, [name, configId, getFormValues])
  
  const handleChange = (newValue: string) => {
    setInternalValue(newValue)
    
    // Update store if name and configId provided
    if (name && configId) {
      setFormValue(configId, name, newValue)
    }
    
    // Call original onChange if provided
    onChange?.(newValue)
  }

  const displayValue = (name && configId) ? internalValue : (initialValue || '')

  return (
    <ScTextFieldWrapper style={style}>
      {label && <ScLabel>{label}</ScLabel>}
      <ScInput
        type="text"
        value={displayValue}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
      />
    </ScTextFieldWrapper>
  )
}
