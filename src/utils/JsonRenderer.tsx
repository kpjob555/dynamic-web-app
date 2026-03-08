import type { ReactNode } from 'react'
import { componentRegistry } from './componentRegistry'
import type { IComponentConfig } from '../types'

interface IJsonRendererProps {
  config: IComponentConfig | IComponentConfig[]
  configId?: string
}

export function JsonRenderer({ config, configId }: IJsonRendererProps): ReactNode {
  if (Array.isArray(config)) {
    return config.map((item, index) => (
      <JsonRenderer key={index} config={item} configId={configId} />
    ))
  }

  const { component, children, props = {} } = config
  const Component = componentRegistry[component as keyof typeof componentRegistry]

  if (!Component) {
    console.warn(`Component "${component}" not found in registry`)
    return null
  }

  const renderedChildren = children && children.length > 0 ? (
    <JsonRenderer config={children} configId={configId} />
  ) : null

  // Components that use children as text/content
  const textBasedComponents = ['SubmitButton', 'CancelButton', 'HeaderLabel', 'ContentLabel']
  const isTextBased = textBasedComponents.includes(component)
  
  // Pass configId to form components
  const formComponents = ['TextField', 'NumberField', 'SingleDropdown', 'MultiSelectDropdown', 'Radio', 'SubmitButton', 'CancelButton']
  const isFormComponent = formComponents.includes(component)
  
  const newProps = { 
    ...props,
    ...(isFormComponent && configId ? { configId } : {})
  }
  
  if (isTextBased && props.children) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return <Component {...(newProps as any)}>{props.children}</Component>
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Component {...(newProps as any)}>{renderedChildren}</Component>
}
