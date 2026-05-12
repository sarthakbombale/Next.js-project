'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useStore } from '@/store/useStore';

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const setAuthUser = useStore((state) => state.setAuthUser);
  const setToken = useStore((state) => state.setToken);
  const [username, setUsername] = useState('kminchelle');
  const [password, setPassword] = useState('0lelplR');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const authUser = session?.user as { name?: string; email?: string; token?: string } | undefined;
    if (status === 'authenticated' && authUser?.token) {
      setAuthUser({
        name: authUser.name || 'Admin',
        email: authUser.email || 'admin@dummyjson.com',
        token: authUser.token,
      });
      setToken(authUser.token);
      router.replace('/dashboard');
    }
  }, [status, session, setAuthUser, setToken, router]);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setError('');
      setIsSubmitting(true);

      const result = await signIn('credentials', {
        redirect: false,
        username,
        password,
      });

      setIsSubmitting(false);

      if (result?.error) {
        setError(result.error);
      }
    },
    [username, password]
  );

  if (status === 'loading') {
    return (
      <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        backgroundColor: '#eef3fb',
      }}
    >
      <Card sx={{ width: '100%', maxWidth: 420, boxShadow: 4 }}>
        <CardContent>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Admin Login
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Use the DummyJSON credentials to authenticate. Example credentials are
            prefilled for convenience.
          </Typography>

          {error ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          ) : null}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Stack spacing={2}>
              <TextField
                label="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
                fullWidth
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                fullWidth
              />
              <Button type="submit" variant="contained" disabled={isSubmitting} fullWidth>
                {isSubmitting ? 'Signing in…' : 'Sign in'}
              </Button>
            </Stack>
          </Box>

          <Typography variant="caption" color="text.secondary" sx={{ mt: 3, display: 'block' }}>
            Password is case-sensitive. Use DummyJSON account credentials.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
