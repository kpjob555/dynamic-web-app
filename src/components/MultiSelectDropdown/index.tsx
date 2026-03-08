import { useEffect, useState } from 'react'
import type { IMultiSelectDropdownProps } from './types'
import { ScMultiSelectDropdownWrapper, ScLabel, ScSelect } from './styles'
import { useFormStore } from '../../store/formStore'

export function MultiSelectDropdown({
  label,
  value: initialValue = [],
  options = [],
  onChange,
  placeholder,
  disabled = false,
  style,
  name,
  configId,
}: IMultiSelectDropdownProps): React.ReactElement {
  const { getFormValues, setFormValue } = useFormStore()
  
  const [internalValue, setInternalValue] = useState<string[]>(initialValue)
  
  useEffect(() => {
    if (name && configId) {
      const formValues = getFormValues(configId)
      const storedValue = formValues[name]
      if (storedValue !== undefined) {
        setInternalValue(storedValue as string[])
      }
    }
  }, [name, configId, getFormValues])
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, (option) => option.value)
    setInternalValue(selected)
    
    if (name && configId) {
      setFormValue(configId, name, selected)
    }
    
    onChange?.(selected)
  }

  const displayValue = (name && configId) ? internalValue : initialValue

  return (
    <ScMultiSelectDropdownWrapper style={style}>
      {label && <ScLabel>{label}</ScLabel>}
      <ScSelect
        multiple
        value={displayValue}
        onChange={handleChange}
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
    </ScMultiSelectDropdownWrapper>
  )
}
