import { createBrowserRouter } from 'react-router-dom'
import GeneralError from './pages/errors/general-error'
import NotFoundError from './pages/errors/not-found-error'
import MaintenanceError from './pages/errors/maintenance-error'
import UnauthorisedError from './pages/errors/unauthorised-error.tsx'
import PrivateRoute from './components/private-route.tsx'
import { axiosPrivate } from './helper/axiosInstances.tsx'
import { handleApiError } from './helper/api-requests/handleApiError.tsx'
import { handleApiSuccess } from './helper/api-requests/handleApiSuccess.tsx'
import axios from 'axios'
import { toast } from '@/components/ui/use-toast'
import { handleGettingRouteData } from './helper/api-requests/handleGettingRouteData.ts'
const router = createBrowserRouter([

  // Auth routes
  {
    path: '/sign-in',
    lazy: async () => ({
      Component: (await import('./pages/auth/sign-in')).default,
    }),
  },
  {
    path: '/sign-in-2',
    lazy: async () => ({
      Component: (await import('./pages/auth/sign-in-2')).default,
    }),
  },
  {
    path: '/sign-up',
    lazy: async () => ({
      Component: (await import('./pages/auth/sign-up')).default,
    }),
  },
  {
    path: '/forgot-password',
    lazy: async () => ({
      Component: (await import('./pages/auth/forgot-password')).default,
    }),
  },
  {
    path: '/otp',
    lazy: async () => ({
      Component: (await import('./pages/auth/otp')).default,
    }),
  },
  {
    element: <PrivateRoute />,
    children: [
      // Main routes
      {
        path: '/',
        lazy: async () => {
          const AppShell = await import('./components/app-shell')
          return { Component: AppShell.default }
        },
        errorElement: <GeneralError />,
        children: [
          {
            index: true,
            lazy: async () => ({
              Component: (await import('./pages/dashboard')).default,
            }),
          },
          {
            path: 'tasks',
            lazy: async () => ({
              Component: (await import('@/pages/tasks')).default,
            }),
          },
          {
            path: 'chats',
            lazy: async () => ({
              Component: (await import('@/pages/chats')).default,
            }),
          },
          {
            path: 'apps',
            lazy: async () => ({
              Component: (await import('@/pages/apps')).default,
            }),
          },
          {
            path: 'users',
            lazy: async () => ({
              Component: (await import('@/components/coming-soon')).default,
            }),
          },
          {
            path: 'analysis',
            lazy: async () => ({
              Component: (await import('@/components/coming-soon')).default,
            }),
          },
          {
            path: 'extra-components',
            lazy: async () => ({
              Component: (await import('@/pages/extra-components')).default,
            }),
          },
          {
            path: 'settings',
            lazy: async () => ({
              Component: (await import('./pages/settings')).default,
            }),
            errorElement: <GeneralError />,
            children: [
              {
                index: true,
                lazy: async () => ({
                  Component: (await import('./pages/settings/profile')).default,
                }),
                loader: async () => await handleGettingRouteData("/sauth/get-user-data")
              },
              {
                path: 'account',
                lazy: async () => ({
                  Component: (await import('./pages/settings/account')).default,
                }),
              },
              {
                path: 'appearance',
                lazy: async () => ({
                  Component: (await import('./pages/settings/appearance')).default,
                }),
              },
              {
                path: 'notifications',
                lazy: async () => ({
                  Component: (await import('./pages/settings/notifications'))
                    .default,
                }),
              },
              {
                path: 'display',
                lazy: async () => ({
                  Component: (await import('./pages/settings/display')).default,
                }),
              },
              {
                path: 'error-example',
                lazy: async () => ({
                  Component: (await import('./pages/settings/error-example'))
                    .default,
                }),
                errorElement: <GeneralError className='h-[50svh]' minimal />,
              },
            ],
          },
        ],
      },
    ]
  },




  // Error routes
  { path: '/500', Component: GeneralError },
  { path: '/404', Component: NotFoundError },
  { path: '/503', Component: MaintenanceError },
  { path: '/401', Component: UnauthorisedError },

  // Fallback 404 route
  { path: '*', Component: NotFoundError },
])

export default router
