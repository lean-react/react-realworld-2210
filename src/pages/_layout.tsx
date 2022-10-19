import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Link as RouterLink, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              React RW
            </Typography>
            <Box style={{ display: 'flex' }}>
              <Button
                component={RouterLink}
                to="/"
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Home
              </Button>
              <Button
                component={RouterLink}
                to="/todos"
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Todos
              </Button>
              <Button
                component={RouterLink}
                to="/about"
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                About
              </Button>
              <Button
                component={RouterLink}
                to="/login"
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Login
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </div>
  );
}
