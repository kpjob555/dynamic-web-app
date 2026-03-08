import { useEffect } from 'react'
import type { IModalProps } from './types'
import { ScModalOverlay, ScModalContent, ScModalHeader, ScModalTitle, ScCloseButton } from './styles'

export function Modal({ isOpen, onClose, title, children }: IModalProps): React.ReactElement {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  return (
    <ScModalOverlay $isOpen={isOpen} onClick={onClose}>
      <ScModalContent onClick={(e) => e.stopPropagation()}>
        <ScModalHeader>
          <ScModalTitle>{title || 'Modal'}</ScModalTitle>
          <ScCloseButton onClick={onClose}>×</ScCloseButton>
        </ScModalHeader>
        {children}
      </ScModalContent>
    </ScModalOverlay>
  )
}
