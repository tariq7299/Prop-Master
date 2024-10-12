import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme-provider'
import router from '@/router'
import '@/index.css'
import AuthProvider from './hooks/auth/auth-provider'
import AppProvider from './hooks/app/app-provider'
import { Toaster as SonnterToaster } from "@/components/ui/sonner"


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <AuthProvider>
        <AppProvider>
          <SonnterToaster richColors expand />
          <RouterProvider router={router} />
          <Toaster />
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
)
