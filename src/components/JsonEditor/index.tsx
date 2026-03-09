import Editor, { OnMount, OnChange } from '@monaco-editor/react'
import styled from 'styled-components'
import { useRef } from 'react'

interface JsonEditorProps {
  value: string
  onChange: (value: string) => void
  error?: string
}

const EditorContainer = styled.div<{ $hasError?: boolean }>`
  border: 1px solid ${props => props.$hasError ? '#f87171' : 'rgba(139, 92, 246, 0.3)'};
  border-radius: 8px;
  overflow: hidden;
  min-height: 350px;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: rgba(139, 92, 246, 0.6);
  }
`

const ErrorMessage = styled.p`
  color: #f87171;
  font-size: 14px;
  margin-top: 8px;
`

const FormatButton = styled.button`
  padding: 6px 12px;
  font-size: 12px;
  border-radius: 6px;
  border: none;
  background: rgba(139, 92, 246, 0.2);
  color: #a78bfa;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(139, 92, 246, 0.4);
  }
`

export function JsonEditor({ value, onChange, error }: JsonEditorProps) {
  const editorRef = useRef<any>(null)

  const handleEditorMount: OnMount = (editor) => {
    editorRef.current = editor
    
    // Add blur event listener for validation
    editor.onDidBlurEditorWidget(() => {
      // Validation is handled by parent through error prop
    })
  }

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(value)
      const formatted = JSON.stringify(parsed, null, 2)
      onChange(formatted)
    } catch {
      // Invalid JSON, can't format
    }
  }

  const handleChange: OnChange = (newValue) => {
    onChange(newValue || '')
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <label style={{ color: '#a78bfa', fontSize: '14px', fontWeight: 500 }}>
          JSON Configuration
        </label>
        <FormatButton onClick={handleFormat} type="button">
          Format JSON
        </FormatButton>
      </div>
      <EditorContainer $hasError={!!error}>
        <Editor
          height="350px"
          defaultLanguage="json"
          value={value}
          onChange={handleChange}
          onMount={handleEditorMount}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: 'monospace',
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
            formatOnPaste: true,
            formatOnType: true,
            folding: true,
            renderLineHighlight: 'line',
            scrollbar: {
              verticalScrollbarSize: 8,
              horizontalScrollbarSize: 8,
            },
          }}
        />
      </EditorContainer>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  )
}
