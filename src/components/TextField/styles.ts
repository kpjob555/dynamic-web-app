import styled from 'styled-components'

export const ScTextFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
`

export const ScLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #e4e4e7;
`

export const ScInput = styled.input`
  padding: 14px 16px;
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 10px;
  font-size: 15px;
  background: rgba(0, 0, 0, 0.3);
  transition: all 0.25s ease;
  color: #fff;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }

  &:focus {
    outline: none;
    border-color: #8b5cf6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.25), inset 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    background: rgba(0, 0, 0, 0.2);
    cursor: not-allowed;
  }
`
