import { useEffect, useState } from 'react'
import type { ISingleDropdownProps } from './types'
import { ScSingleDropdownWrapper, ScLabel, ScSelect } from './styles'
import { useFormStore } from '../../store/formStore'

export function SingleDropdown({
  label,
  value: initialValue,
  options = [],
  onChange,
  placeholder,
  disabled = false,
  style,
  name,
  configId,
}: ISingleDropdownProps): React.ReactElement {
  const { getFormValues, setFormValue } = useFormStore()
  
  const [internalValue, setInternalValue] = useState<string>(initialValue || '')
  
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
    
    if (name && configId) {
      setFormValue(configId, name, newValue)
    }
    
    onChange?.(newValue)
  }

  const displayValue = (name && configId) ? internalValue : (initialValue || '')

  return (
    <ScSingleDropdownWrapper style={style}>
      {label && <ScLabel>{label}</ScLabel>}
      <ScSelect
        value={displayValue}
        onChange={(e) => handleChange(e.target.value)}
        disabled={disabled}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </ScSelect>
    </ScSingleDropdownWrapper>
  )
}
