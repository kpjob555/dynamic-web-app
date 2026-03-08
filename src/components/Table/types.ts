export interface IColumn {
  key: string
  header: string
}

export interface ITableProps {
  columns: IColumn[]
  data: Record<string, unknown>[]
  renderCell?: (key: string, value: unknown) => React.ReactNode
}
