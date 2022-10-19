import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div>
      <h1>React Realworld</h1>
      <Outlet />
    </div>
  );
}
