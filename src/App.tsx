import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ConfigurationPage } from './pages/configuration'
import { PreviewPage } from './pages/preview'
import { PageSlug } from './pages/page/[slug]'

function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/configuration" element={<ConfigurationPage />} />
        <Route path="/preview" element={<PreviewPage />} />
        <Route path="/page/:slug" element={<PageSlug />} />
        <Route path="/" element={<Navigate to="/configuration" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
