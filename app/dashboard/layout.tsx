'use client';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Box, CircularProgress } from '@mui/material';
import AppHeader from '@/components/AppHeader';
import { useStore } from '@/store/useStore';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const setAuthUser = useStore((state) => state.setAuthUser);
  const setToken = useStore((state) => state.setToken);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }

    if (session?.user) {
      const authUser = session.user as { name?: string; email?: string; token?: string };
      if (typeof authUser.token === 'string') {
        setAuthUser({
          name: authUser.name || 'Admin',
          email: authUser.email || 'admin@dummyjson.com',
          token: authUser.token,
        });
        setToken(authUser.token);
      }
    }
  }, [status, session, router, setAuthUser, setToken]);

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppHeader />
      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, bgcolor: '#f3f5f9' }}>
        {children}
      </Box>
    </Box>
  );
}
