import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { useConfigStore } from '../../store/configStore'
import type { IPageConfig } from '../../types'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { Body } from '../../components/Body'
import { Table } from '../../components/Table'
import { SubmitButton } from '../../components/SubmitButton'
import { Modal } from '../../components/Modal'
import { JsonEditor } from '../../components/JsonEditor'
import { HeaderLabel } from '../../components/HeaderLabel'
import { ContentLabel } from '../../components/ContentLabel'
import { Rows } from '../../components/Rows'

const Container = styled.div`
  background: linear-gradient(135deg, rgba(30, 27, 75, 0.7) 0%, rgba(49, 46, 129, 0.6) 100%);
  border-radius: 16px;
  padding: 32px;
  border: 1px solid rgba(139, 92, 246, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`

const SmallButton = styled.button`
  padding: 6px 12px;
  font-size: 12px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  
  &:hover {
    transform: scale(1.05);
  }
`

const EditButton = styled(SmallButton)`
  background: linear-gradient(135deg, #7c3aed 0%, #6366f1 100%);
  color: white;
`

const DeleteButton = styled(SmallButton)`
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
`

const LinkButton = styled(Link)`
  padding: 6px 12px;
  font-size: 12px;
  border-radius: 6px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.05);
    color: white;
  }
`

function generateId(): string {
  return crypto.randomUUID()
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export function ConfigurationPage(): React.ReactElement {
  const {
    configurations,
    setConfigurations,
    addConfiguration,
    updateConfiguration,
    deleteConfiguration,
    isModalOpen,
    setModalOpen,
    editingConfig,
    setEditingConfig,
  } = useConfigStore()

  const [formData, setFormData] = useState('')
  const [error, setError] = useState('')
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const [deleteConfigName, setDeleteConfigName] = useState('')
  const [isSaving, setIsSaving] = useState(false)

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

  const handleAddNew = () => {
    setEditingConfig(null)
    setFormData(
      JSON.stringify(
        {
          id: generateId(),
          name: 'New Configuration',
          configuration: {
            component: 'Body',
            children: [],
            props: {},
          },
        },
        null,
        2
      )
    )
    setError('')
    setModalOpen(true)
  }

  const handleEdit = (config: IPageConfig) => {
    setEditingConfig(config)
    setFormData(JSON.stringify(config, null, 2))
    setError('')
    setModalOpen(true)
  }

  const handleDeleteClick = (config: IPageConfig) => {
    setDeleteConfirmId(config.id)
    setDeleteConfigName(config.name)
  }

  const confirmDelete = () => {
    if (deleteConfirmId) {
      deleteConfiguration(deleteConfirmId)
      setDeleteConfirmId(null)
      setDeleteConfigName('')
    }
  }

  const cancelDelete = () => {
    setDeleteConfirmId(null)
    setDeleteConfigName('')
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const parsed = JSON.parse(formData) as IPageConfig

      if (!parsed.id || !parsed.name || !parsed.configuration) {
        setError('Invalid configuration format')
        setIsSaving(false)
        return
      }

      if (editingConfig) {
        updateConfiguration(parsed)
      } else {
        addConfiguration(parsed)
      }

      const allConfigs = editingConfig
        ? configurations.map((c) => (c.id === parsed.id ? parsed : c))
        : [...configurations, parsed]

      setConfigurations(allConfigs)
      setModalOpen(false)
    } catch {
      setError('Invalid JSON format')
    }
    setIsSaving(false)
  }

  const handleCancel = () => {
    setModalOpen(false)
    setEditingConfig(null)
    setError('')
  }

  const tableColumns = [
    { key: 'name', header: 'Name' },
    { key: 'slug', header: 'URL' },
    { key: 'actions', header: 'Actions' },
  ]

  const tableData = configurations.map((config) => ({
    name: config.name,
    slug: `/page/${slugify(config.name)}`,
    actions: config,
  }))

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
              <HeaderLabel>⚙️ JSON Configurations</HeaderLabel>
              <ContentLabel>Manage your dynamic page configurations</ContentLabel>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '24px' }}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <SubmitButton onClick={handleAddNew}>➕ Add New Configuration</SubmitButton>
              </motion.div>
            </div>
          </motion.div>

          {configurations.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Rows gap={16}>
                <ContentLabel>No configurations found. Create your first one!</ContentLabel>
                <SubmitButton onClick={handleAddNew}>➕ Add New Configuration</SubmitButton>
              </Rows>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Table
                columns={tableColumns}
                data={tableData}
                renderCell={(key, value) => {
                  if (key === 'slug') {
                    return (
                      <LinkButton to={value as string} target="_blank">
                        🔗 {value as string}
                      </LinkButton>
                    )
                  }
                  if (key === 'actions') {
                    const config = value as IPageConfig
                    return (
                      <ButtonGroup>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <LinkButton to={`/page/${slugify(config.name)}`}>
                            👁️ View
                          </LinkButton>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <EditButton onClick={() => handleEdit(config)}>✏️ Edit</EditButton>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <DeleteButton onClick={() => handleDeleteClick(config)}>🗑️ Delete</DeleteButton>
                        </motion.div>
                      </ButtonGroup>
                    )
                  }
                  return value as string
                }}
              />
            </motion.div>
          )}
        </Container>

        {/* Edit/Add Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <Modal
              isOpen={isModalOpen}
              onClose={handleCancel}
              title={editingConfig ? 'Edit Configuration' : 'Add New Configuration'}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <Rows gap={20}>
                  <JsonEditor
                    value={formData}
                    onChange={(value) => {
                      setFormData(value)
                      setError('')
                    }}
                    error={error}
                  />
                  {error && <p style={{ color: '#f87171', fontSize: '14px' }}>{error}</p>}
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <SubmitButton onClick={handleSave} disabled={isSaving}>
                      {isSaving ? '⏳ Saving...' : editingConfig ? '💾 Update' : '💾 Save'}
                    </SubmitButton>
                    <SubmitButton onClick={handleCancel} style={{ background: 'rgba(255,255,255,0.1)' }}>
                      Cancel
                    </SubmitButton>
                  </div>
                </Rows>
              </motion.div>
            </Modal>
          )}
        </AnimatePresence>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {deleteConfirmId && (
            <Modal
              isOpen={deleteConfirmId !== null}
              onClose={cancelDelete}
              title="Confirm Delete"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <Rows gap={20}>
                  <ContentLabel>
                    Are you sure you want to delete <strong style={{ color: '#fff' }}>"{deleteConfigName}"</strong>?
                  </ContentLabel>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
                    This action cannot be undone.
                  </p>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <SubmitButton
                      onClick={confirmDelete}
                      style={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' }}
                    >
                      🗑️ Delete
                    </SubmitButton>
                    <SubmitButton onClick={cancelDelete} style={{ background: 'rgba(255,255,255,0.1)' }}>
                      Cancel
                    </SubmitButton>
                  </div>
                </Rows>
              </motion.div>
            </Modal>
          )}
        </AnimatePresence>
      </Body>
      <Footer />
    </>
  )
}
