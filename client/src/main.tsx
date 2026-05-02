import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './axiosConfig' // Configure axios globally FIRST
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './store.ts'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastProvider } from './context/ToastContext'

import ErrorBoundary from './components/ErrorBoundary.tsx'

console.log('Main.tsx Executing...');

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <ToastProvider>
              <App />
            </ToastProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </Provider>
    </ErrorBoundary>
  </StrictMode>,
)
