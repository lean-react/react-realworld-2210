import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { appRoutes } from './app.routes';
import { AuthProvider } from './auth';

const router = createBrowserRouter(appRoutes);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
