import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App.tsx'           // ← এখানে তোমার আসল পাথ দাও
import './index.css'

const rootElement = document.getElementById('root')

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
} else {
  console.error('Root element not found!')
}