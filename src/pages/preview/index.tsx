import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { useConfigStore } from '../../store/configStore'
import { useFormStore } from '../../store/formStore'
import { JsonRenderer } from '../../utils/JsonRenderer'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { Body } from '../../components/Body'
import { SubmitButton } from '../../components/SubmitButton'
import { HeaderLabel } from '../../components/HeaderLabel'
import { ContentLabel } from '../../components/ContentLabel'
import type { IPageConfig } from '../../types'

const Container = styled.div`
  background: linear-gradient(135deg, rgba(30, 27, 75, 0.7) 0%, rgba(49, 46, 129, 0.6) 100%);
  border-radius: 16px;
  padding: 32px;
  border: 1px solid rgba(139, 92, 246, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
`

const Layout = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 24px;
  align-items: start;
`

const ConfigList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 70vh;
  overflow-y: auto;
  padding-right: 8px;
  
  scrollbar-width: thin;
  scrollbar-color: rgba(139, 92, 246, 0.3) transparent;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(139, 92, 246, 0.3);
    border-radius: 2px;
  }
`

const ConfigButton = styled(SubmitButton)<{ $selected: boolean }>`
  background: ${({ $selected }) =>
    $selected
      ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
      : 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'};
  border: 1px solid ${({ $selected }) => ($selected ? '#10b981' : 'rgba(255,255,255,0.15)')};
  padding: 14px 20px;
  font-size: 14px;
  text-align: left;
  justify-content: flex-start;
`

const PreviewArea = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  padding: 24px;
  border: 1px solid rgba(139, 92, 246, 0.2);
  min-height: 400px;
  max-height: 70vh;
  overflow-y: auto;
  
  scrollbar-width: thin;
  scrollbar-color: rgba(139, 92, 246, 0.3) transparent;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(139, 92, 246, 0.3);
    border-radius: 2px;
  }
`

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 300px;
  color: rgba(255, 255, 255, 0.4);
  text-align: center;
`

const SectionLabel = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 12px;
`

export function PreviewPage(): React.ReactElement {
  const { configurations, setConfigurations, selectedConfigId, setSelectedConfigId } = useConfigStore()
  const { clearFormValues } = useFormStore()
  const [selectedConfig, setSelectedConfig] = useState<IPageConfig | null>(null)

  useEffect(() => {
    const loadConfigs = async () => {
      try {
        const response = await fetch('/data/configs.json')
        if (response.ok) {
          const data = await response.json()
          setConfigurations(data)
        }
      } catch {
        // No configs
      }
    }
    loadConfigs()
  }, [setConfigurations])

  useEffect(() => {
    if (selectedConfigId) {
      const config = configurations.find((c) => c.id === selectedConfigId)
      setSelectedConfig(config || null)
    } else {
      setSelectedConfig(null)
    }
  }, [selectedConfigId, configurations])

  const handleSelect = (id: string) => {
    // Clear form values when switching configs
    if (selectedConfigId && selectedConfigId !== id) {
      clearFormValues(selectedConfigId)
    }
    setSelectedConfigId(selectedConfigId === id ? null : id)
  }

  return (
    <>
      <Header />
      <Body>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div style={{ marginBottom: '24px' }}>
              <HeaderLabel>👁️ Preview Configurations</HeaderLabel>
              <ContentLabel>Select a configuration to see how it renders</ContentLabel>
            </div>
          </motion.div>

          {configurations.length === 0 ? (
            <ContentLabel>No configurations available. Go to /configuration to add one.</ContentLabel>
          ) : (
            <Layout>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <SectionLabel>📋 Configurations ({configurations.length})</SectionLabel>
                <ConfigList>
                  {configurations.map((config) => (
                    <motion.div
                      key={config.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ConfigButton
                        onClick={() => handleSelect(config.id)}
                        $selected={selectedConfigId === config.id}
                      >
                        {selectedConfigId === config.id ? '✓ ' : '○ '}
                        {config.name}
                      </ConfigButton>
                    </motion.div>
                  ))}
                </ConfigList>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <SectionLabel>🎨 Preview</SectionLabel>
                <PreviewArea>
                  <AnimatePresence mode="wait">
                    {selectedConfig ? (
                      <motion.div
                        key={selectedConfig.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div style={{ 
                          marginBottom: '16px', 
                          paddingBottom: '16px', 
                          borderBottom: '1px solid rgba(139, 92, 246, 0.2)' 
                        }}>
                          <span style={{ color: '#10b981', marginRight: '8px' }}>●</span>
                          <span style={{ fontWeight: 600 }}>{selectedConfig.name}</span>
                        </div>
                        <JsonRenderer config={selectedConfig.configuration} configId={selectedConfig.id} />
                      </motion.div>
                    ) : (
                      <EmptyState>
                        <motion.p
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                          style={{ fontSize: '48px', marginBottom: '16px' }}
                        >
                          👈
                        </motion.p>
                        <p>Select a configuration from the list to preview</p>
                      </EmptyState>
                    )}
                  </AnimatePresence>
                </PreviewArea>
              </motion.div>
            </Layout>
          )}
        </Container>
      </Body>
      <Footer />
    </>
  )
}
