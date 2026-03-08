import styled from 'styled-components'

export const ScModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

export const ScModalContent = styled.div`
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
  border-radius: 16px;
  padding: 28px;
  min-width: 450px;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(139, 92, 246, 0.3);
`

export const ScModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`

export const ScModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  margin: 0;
  background: linear-gradient(135deg, #a78bfa 0%, #818cf8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

export const ScCloseButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  font-size: 22px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.7);
  padding: 6px;
  line-height: 1;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
  }
`
