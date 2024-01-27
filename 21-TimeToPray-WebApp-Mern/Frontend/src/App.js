import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import RootLayout from './pages/RootLayout'
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LogInPage from './pages/LogInPage';
import MapPage from './pages/MapPage';
import MapDataPage from './pages/MapDataPage';
import MainNavigationPage from './pages/MainNavigationPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <MainNavigationPage />,
        children: [
          { index: true, element: <HomePage /> },
          { path: '/signup', element: <SignUpPage /> },
          { path: '/login', element: <LogInPage /> },
        ]
      },
      { path: '/map', element: <MapPage /> },
      { path: '/mapdata/:mapName/:mapId', element: <MapDataPage /> },
    ]
  },
])

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>

  );
}

export default App;