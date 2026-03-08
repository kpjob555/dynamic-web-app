import styled from 'styled-components'

export const ScRadioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`

export const ScLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #e4e4e7;
`

export const ScRadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const ScRadioOption = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 15px;
  color: #e4e4e7;
  cursor: pointer;
  padding: 10px 14px;
  border-radius: 8px;
  transition: background 0.2s;

  &:hover {
    background: rgba(139, 92, 246, 0.1);
  }

  input[type="radio"] {
    width: 18px;
    height: 18px;
    accent-color: #8b5cf6;
  }

  input:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`
