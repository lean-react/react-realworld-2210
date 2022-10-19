import { RouteObject } from 'react-router-dom';

import AboutPage from './pages/about';
import HomePage from './pages/home';
import LoginPage from './pages/login';
import TodosPage from './pages/todos';
import Layout from './pages/_layout';

export const appRoutes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/todos', element: <TodosPage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/login', element: <LoginPage /> },
    ],
  },
];
