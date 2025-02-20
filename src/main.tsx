import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
// import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme-provider'
import router from '@/router'
import '@/index.css'
import AuthProvider from './hooks/auth/auth-provider'
import AppProvider from './hooks/app/app-provider'



if (import.meta.env.VITE_ENV === "Development") {

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <ThemeProvider>
        <AuthProvider>
          <AppProvider>
            <RouterProvider router={router} />
            {/* <Toaster theme={currentTheme} closeButton expand={true} richColors={true} /> */}
            {/* <Toaster /> */}
          </AppProvider>
        </AuthProvider>
      </ThemeProvider>
    </React.StrictMode>
  )
} else {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <ThemeProvider>
      <AuthProvider>
        <AppProvider>
          <RouterProvider router={router} />
          {/* <Toaster theme={currentTheme} closeButton expand={true} richColors={true} /> */}
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  )

}
