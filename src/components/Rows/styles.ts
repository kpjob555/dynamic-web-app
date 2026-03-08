import styled from 'styled-components'

export const ScRows = styled.div<{ $gap?: number }>`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => $gap || 20}px;
`
