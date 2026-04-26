import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { NotificationProvider } from './context/NotificationContext'

// Register service worker for Firebase notifications
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js').catch((error) => {
    console.log('Service Worker registration failed:', error)
  })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NotificationProvider>
      <AuthProvider>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              border: '1px solid rgba(51, 65, 85, 0.75)',
              background: 'rgba(15, 23, 42, 0.9)',
              color: '#e2e8f0',
              backdropFilter: 'blur(8px)',
            },
          }}
        />
      </AuthProvider>
    </NotificationProvider>
  </StrictMode>,
)
