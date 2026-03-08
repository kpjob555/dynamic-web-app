import type { ITableProps } from './types'
import { ScTableWrapper, ScTable, ScThead, ScTh, ScTbody, ScTr, ScTd } from './styles'

export function Table({ columns, data, renderCell }: ITableProps): React.ReactElement {
  return (
    <ScTableWrapper>
      <ScTable>
        <ScThead>
          <tr>
            {columns.map((col) => (
              <ScTh key={col.key}>{col.header}</ScTh>
            ))}
          </tr>
        </ScThead>
        <ScTbody>
          {data.map((row, rowIndex) => (
            <ScTr key={rowIndex}>
              {columns.map((col) => (
                <ScTd key={col.key}>
                  {renderCell ? renderCell(col.key, row[col.key]) : String(row[col.key] ?? '')}
                </ScTd>
              ))}
            </ScTr>
          ))}
        </ScTbody>
      </ScTable>
    </ScTableWrapper>
  )
}
