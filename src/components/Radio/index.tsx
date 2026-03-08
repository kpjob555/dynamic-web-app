import { useEffect, useState } from 'react'
import type { IRadioProps } from './types'
import { ScRadioWrapper, ScLabel, ScRadioGroup, ScRadioOption } from './styles'
import { useFormStore } from '../../store/formStore'

export function Radio({
  label,
  name,
  options,
  value: initialValue,
  onChange,
  disabled = false,
  style,
  configId,
}: IRadioProps): React.ReactElement {
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

  const displayValue = configId ? internalValue : (initialValue || '')

  return (
    <ScRadioWrapper style={style}>
      {label && <ScLabel>{label}</ScLabel>}
      <ScRadioGroup>
        {options.map((option) => (
          <ScRadioOption key={option.value}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={displayValue === option.value}
              onChange={(e) => handleChange(e.target.value)}
              disabled={disabled}
            />
            {option.label}
          </ScRadioOption>
        ))}
      </ScRadioGroup>
    </ScRadioWrapper>
  )
}
