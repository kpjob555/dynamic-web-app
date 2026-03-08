import { create } from 'zustand'
import type { IPageConfig } from '../types'

interface IConfigStore {
  configurations: IPageConfig[]
  selectedConfigId: string | null
  isModalOpen: boolean
  editingConfig: IPageConfig | null
  setConfigurations: (configs: IPageConfig[]) => void
  addConfiguration: (config: IPageConfig) => void
  updateConfiguration: (config: IPageConfig) => void
  deleteConfiguration: (id: string) => void
  setSelectedConfigId: (id: string | null) => void
  setModalOpen: (open: boolean) => void
  setEditingConfig: (config: IPageConfig | null) => void
}

export const useConfigStore = create<IConfigStore>((set) => ({
  configurations: [],
  selectedConfigId: null,
  isModalOpen: false,
  editingConfig: null,
  setConfigurations: (configurations) => set({ configurations }),
  addConfiguration: (config) =>
    set((state) => ({ configurations: [...state.configurations, config] })),
  updateConfiguration: (config) =>
    set((state) => ({
      configurations: state.configurations.map((c) =>
        c.id === config.id ? config : c
      ),
    })),
  deleteConfiguration: (id) =>
    set((state) => ({
      configurations: state.configurations.filter((c) => c.id !== id),
      selectedConfigId: state.selectedConfigId === id ? null : state.selectedConfigId,
    })),
  setSelectedConfigId: (selectedConfigId) => set({ selectedConfigId }),
  setModalOpen: (isModalOpen) => set({ isModalOpen }),
  setEditingConfig: (editingConfig) => set({ editingConfig }),
}))
