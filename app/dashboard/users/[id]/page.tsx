'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { useStore } from '@/store/useStore';

export default function UserDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { userDetail, fetchUserById, isLoadingUserDetail } = useStore((state) => ({
    userDetail: state.userDetail,
    fetchUserById: state.fetchUserById,
    isLoadingUserDetail: state.isLoadingUserDetail,
  }));

  useEffect(() => {
    fetchUserById(Number(id));
  }, [fetchUserById, id]);

  if (isLoadingUserDetail || !userDetail || userDetail.id !== Number(id)) {
    return (
      <Box sx={{ minHeight: '60vh', display: 'grid', placeItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={700}>
            {userDetail.firstName} {userDetail.lastName}
          </Typography>
          <Typography color="text.secondary">Detail view for DummyJSON user profile.</Typography>
        </Box>
        <Button component={Link} href="/dashboard/users" variant="outlined">
          Back to Users
        </Button>
      </Stack>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Contact & Profile
              </Typography>
              <List disablePadding>
                <ListItem disablePadding>
                  <ListItemText primary="Email" secondary={userDetail.email} />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText primary="Phone" secondary={userDetail.phone} />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText primary="Gender" secondary={userDetail.gender} />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText primary="Company" secondary={userDetail.company?.name} />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Full profile details
              </Typography>
              <Typography paragraph>
                This section can be used to show additional user information, including address, birthdate, and other profile fields provided by DummyJSON. The layout is responsive for mobile and desktop.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                User ID: {userDetail.id}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
