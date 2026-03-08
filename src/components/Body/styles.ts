import styled from 'styled-components'

export const ScBody = styled.main`
  padding: 40px;
  min-height: calc(100vh - 80px);
  max-width: 1100px;
  margin: 0 auto;
`

export const ScContainer = styled.div`
  background: linear-gradient(135deg, rgba(30, 27, 75, 0.7) 0%, rgba(49, 46, 129, 0.6) 100%);
  border-radius: 16px;
  padding: 32px;
  border: 1px solid rgba(139, 92, 246, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
`
