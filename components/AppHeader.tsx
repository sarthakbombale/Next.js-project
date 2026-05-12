'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';

export default function AppHeader() {
  const logout = useStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = useCallback(() => {
    logout();
    router.push('/login');
  }, [logout, router]);

  return (
    <AppBar position="sticky" color="primary" elevation={4}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Box>
          <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
            DummyJSON Admin
          </Typography>
          <Typography variant="body2" color="inherit" sx={{ opacity: 0.8 }}>
            Users & Products dashboard
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Button component={Link} href="/dashboard" color="inherit">
            Home
          </Button>
          <Button component={Link} href="/dashboard/users" color="inherit">
            Users
          </Button>
          <Button component={Link} href="/dashboard/products" color="inherit">
            Products
          </Button>
          <Button onClick={handleLogout} color="inherit">
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
