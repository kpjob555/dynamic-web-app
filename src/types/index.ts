export interface IComponentConfig {
  component: string
  children?: IComponentConfig[]
  props?: Record<string, unknown>
  styles?: Record<string, string>
}

export interface IPageConfig {
  id: string
  name: string
  configuration: IComponentConfig
}
