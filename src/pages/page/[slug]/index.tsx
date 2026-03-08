import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useConfigStore } from '../../../store/configStore'
import { JsonRenderer } from '../../../utils/JsonRenderer'
import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'
import { Body } from '../../../components/Body'
import { HeaderLabel } from '../../../components/HeaderLabel'
import { ContentLabel } from '../../../components/ContentLabel'
import { SubmitButton } from '../../../components/SubmitButton'

const Container = styled.div`
  background: linear-gradient(135deg, rgba(30, 27, 75, 0.7) 0%, rgba(49, 46, 129, 0.6) 100%);
  border-radius: 16px;
  padding: 32px;
  border: 1px solid rgba(139, 92, 246, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
`

const NotFound = styled.div`
  text-align: center;
  padding: 60px 20px;
`

const BackLink = styled(Link)`
  color: #a78bfa;
  text-decoration: none;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  padding: 10px 20px;
  background: rgba(139, 92, 246, 0.2);
  border-radius: 8px;
  transition: all 0.2s;
  font-size: 14px;

  &:hover {
    background: rgba(139, 92, 246, 0.3);
    text-decoration: underline;
    color: #a78bfa;
  }
`

const ButtonLink = styled(Link)`
  text-decoration: none;
`

export function PageSlug(): React.ReactElement {
  const { slug } = useParams<{ slug: string }>()
  const { configurations, setConfigurations } = useConfigStore()
  const [config, setConfig] = useState<typeof configurations[0] | null>(null)
  const [loading, setLoading] = useState(true)

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
    if (configurations.length > 0 && slug) {
      // Find config by slugified name
      const found = configurations.find((c) => {
        const configSlug = c.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
        return configSlug === slug
      })
      setConfig(found || null)
    }
    setLoading(false)
  }, [slug, configurations])

  if (loading) {
    return (
      <>
        <Header />
        <Body>
          <Container>
            <ContentLabel>Loading...</ContentLabel>
          </Container>
        </Body>
        <Footer />
      </>
    )
  }

  if (!config) {
    return (
      <>
        <Header />
        <Body>
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <NotFound>
                <HeaderLabel>Page Not Found</HeaderLabel>
                <ContentLabel>
                  The page "{slug}" doesn't exist.
                </ContentLabel>
                <ButtonLink to="/preview">
                  <SubmitButton>← Go to Configuration</SubmitButton>
                </ButtonLink>
              </NotFound>
            </motion.div>
          </Container>
        </Body>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <Body>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Container>
            <BackLink to="/configuration">
              ← Back to Configuration
            </BackLink>
            <JsonRenderer config={config.configuration} configId={config.id} />
          </Container>
        </motion.div>
      </Body>
      <Footer />
    </>
  )
}
