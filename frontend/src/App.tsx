import { Toaster } from 'react-hot-toast'
import AppRoutes from './routes/AppRoutes'

const App = () => {
  return (
    <>
      <AppRoutes />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 12px 32px rgba(15, 23, 42, 0.12)',
          },
        }}
      />
    </>
  )
}

export default App
