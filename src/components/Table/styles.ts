import styled from 'styled-components'

export const ScTableWrapper = styled.div`
  overflow-x: auto;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(139, 92, 246, 0.2);
`

export const ScTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
`

export const ScThead = styled.thead`
  background: linear-gradient(135deg, #7c3aed 0%, #6366f1 100%);
`

export const ScTh = styled.th`
  padding: 14px 18px;
  text-align: left;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid rgba(139, 92, 246, 0.2);
`

export const ScTbody = styled.tbody``

export const ScTr = styled.tr`
  border-bottom: 1px solid rgba(139, 92, 246, 0.1);
  transition: background 0.2s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: rgba(139, 92, 246, 0.15);
  }
`

export const ScTd = styled.td`
  padding: 14px 18px;
  font-size: 14px;
  color: #e4e4e7;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
