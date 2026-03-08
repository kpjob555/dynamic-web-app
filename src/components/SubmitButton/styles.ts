import styled from 'styled-components'

export const ScSubmitButton = styled.button`
  padding: 12px 24px;
  background: linear-gradient(135deg, #7c3aed 0%, #6366f1 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 15px rgba(124, 58, 237, 0.4);
  margin-bottom: 16px;
  margin-right: 12px;

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #8b5cf6 0%, #818cf8 100%);
    box-shadow: 0 6px 20px rgba(124, 58, 237, 0.5);
    transform: translateY(-2px);
  }

  &:active:not(:disabled) {
    transform: translateY(0) scale(0.98);
  }

  &:disabled {
    background: linear-gradient(135deg, #4b5563 0%, #6b7280 100%);
    box-shadow: none;
    cursor: not-allowed;
  }
`
