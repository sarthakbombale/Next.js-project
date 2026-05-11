'use client';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { Box, CircularProgress } from '@mui/material';
import Navbar from '@/components/Navbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { setAuthUser } = useStore();

  useEffect(() => {
    // 1. Protection Logic
    if (status === 'unauthenticated') {
      router.push('/login');
    }
    // 2. Sync NextAuth to Zustand
    if (session?.user) {
      setAuthUser(session.user);
    }
  }, [status, session, router, setAuthUser]);

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#f9f9f9' }}>
        {children}
      </Box>
    </Box>
  );
}