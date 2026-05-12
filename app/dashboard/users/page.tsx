'use client';

import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Button,
  CircularProgress,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useStore } from '@/store/useStore';

const USERS_PER_PAGE = 10;

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  const { users, totalUsers, fetchUsers, isLoadingUsers } = useStore((state) => ({
    users: state.users,
    totalUsers: state.totalUsers,
    fetchUsers: state.fetchUsers,
    isLoadingUsers: state.isLoadingUsers,
  }));

  useEffect(() => {
    fetchUsers({ limit: USERS_PER_PAGE, skip: (page - 1) * USERS_PER_PAGE, search: searchTerm });
  }, [fetchUsers, page, searchTerm]);

  const handleSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1);
  }, []);

  const pageCount = useMemo(() => Math.max(1, Math.ceil(totalUsers / USERS_PER_PAGE)), [totalUsers]);

  return (
    <Box>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="flex-start" spacing={2} sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Users
          </Typography>
          <Typography color="text.secondary">
            Search and paginate DummyJSON users. Click any row to view full user details.
          </Typography>
        </Box>
        <TextField
          label="Search users"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by name, email, or phone"
          size="small"
          sx={{ minWidth: 260 }}
        />
      </Stack>

      <Paper sx={{ overflowX: 'auto' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Company</TableCell>
                <TableCell align="right">Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoadingUsers ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <CircularProgress size={24} />
                  </TableCell>
                </TableRow>
              ) : users.length ? (
                users.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.gender}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.company?.name || '—'}</TableCell>
                    <TableCell align="right">
                      <Button component={Link} href={`/dashboard/users/${user.id}`} size="small">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Stack alignItems="center" sx={{ mt: 3 }}>
        <Pagination count={pageCount} page={page} onChange={(_, value) => setPage(value)} color="primary" />
      </Stack>
    </Box>
  );
}
