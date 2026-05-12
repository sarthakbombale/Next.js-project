'use client';

import Link from 'next/link';
import { Box, Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material';

const cards = [
  {
    title: 'Users',
    description: 'Browse and search the latest DummyJSON users with pagination.',
    href: '/dashboard/users',
  },
  {
    title: 'Products',
    description: 'Filter products by category, search, and view full product details.',
    href: '/dashboard/products',
  },
  {
    title: 'State Management',
    description: 'Zustand stores auth, user and product cache for better performance.',
    href: '/dashboard/users',
  },
];

export default function DashboardPage() {
  return (
    <Box>
      <Stack spacing={2} sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>
          Dashboard
        </Typography>
        <Typography color="text.secondary" maxWidth={680}>
          Welcome to the DummyJSON admin dashboard. Use the menu to manage users and products with search, pagination, and caching powered by Zustand.
        </Typography>
      </Stack>

      <Grid container spacing={3}>
        {cards.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.title}>
            <Card elevation={2}>
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h6" fontWeight={700}>
                    {card.title}
                  </Typography>
                  <Typography color="text.secondary">{card.description}</Typography>
                  <Button component={Link} href={card.href} variant="contained" size="small">
                    Open
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
