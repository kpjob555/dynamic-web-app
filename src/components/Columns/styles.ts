import styled from 'styled-components'

export const ScColumns = styled.div<{ $gap?: number }>`
  display: flex;
  flex-direction: row;
  gap: ${({ $gap }) => $gap || 20}px;
`
