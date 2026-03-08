import { create } from 'zustand'

interface IFormValues {
  [key: string]: string | number | string[]
}

interface IFormStore {
  formValues: Record<string, IFormValues>
  setFormValue: (configId: string, field: string, value: string | number | string[]) => void
  getFormValues: (configId: string) => IFormValues
  clearFormValues: (configId: string) => void
}

export const useFormStore = create<IFormStore>((set, get) => ({
  formValues: {},
  
  setFormValue: (configId: string, field: string, value: string | number | string[]) => 
    set((state) => ({
      formValues: {
        ...state.formValues,
        [configId]: {
          ...(state.formValues[configId] || {}),
          [field]: value,
        },
      },
    })),
  
  getFormValues: (configId: string) => get().formValues[configId] || {},
  
  clearFormValues: (configId: string) => 
    set((state) => {
      const { [configId]: _, ...rest } = state.formValues
      return { formValues: rest }
    }),
}))
