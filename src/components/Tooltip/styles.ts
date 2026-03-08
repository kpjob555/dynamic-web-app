import { useState } from 'react'
import styled from 'styled-components'

export const ScTooltipWrapper = styled.div`
  position: relative;
  display: inline-block;
`

export const ScTooltipContent = styled.div<{ $visible: boolean }>`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 6px 10px;
  background: #333;
  color: white;
  font-size: 12px;
  border-radius: 4px;
  white-space: nowrap;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
  transition: opacity 0.2s, visibility 0.2s;
  z-index: 100;
  margin-bottom: 6px;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-top-color: #333;
  }
`
