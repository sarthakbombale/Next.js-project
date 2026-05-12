'use client';

import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useStore } from '@/store/useStore';

const PRODUCTS_PER_PAGE = 10;

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(1);

  const { products, totalProducts, categories, fetchProducts, fetchCategories, isLoadingProducts } = useStore((state) => ({
    products: state.products,
    totalProducts: state.totalProducts,
    categories: state.categories,
    fetchProducts: state.fetchProducts,
    fetchCategories: state.fetchCategories,
    isLoadingProducts: state.isLoadingProducts,
  }));

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchProducts({
      limit: PRODUCTS_PER_PAGE,
      skip: (page - 1) * PRODUCTS_PER_PAGE,
      search: searchTerm,
      category,
    });
  }, [fetchProducts, page, searchTerm, category]);

  const handleCategoryChange = useCallback((event: SelectChangeEvent<string>) => {
    setCategory(event.target.value as string);
    setPage(1);
  }, []);

  const handleSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1);
  }, []);

  const pageCount = useMemo(() => Math.max(1, Math.ceil(totalProducts / PRODUCTS_PER_PAGE)), [totalProducts]);

  return (
    <Box>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Products
          </Typography>
          <Typography color="text.secondary">
            Search, filter, and browse products from DummyJSON. Select a category or use search to refine results.
          </Typography>
        </Box>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ width: '100%', maxWidth: 560 }}>
          <TextField
            label="Search products"
            value={searchTerm}
            onChange={handleSearch}
            fullWidth
            size="small"
          />
          <FormControl sx={{ minWidth: 180 }} size="small">
            <InputLabel>Category</InputLabel>
            <Select value={category} label="Category" onChange={handleCategoryChange}>
              <MenuItem value="all">All</MenuItem>
              {categories.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Stack>

      {isLoadingProducts ? (
        <Box sx={{ minHeight: '40vh', display: 'grid', placeItems: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia component="img" height="180" image={product.thumbnail} alt={product.title} />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }} noWrap>
                    {product.description}
                  </Typography>
                  <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>
                    ${product.price}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Category: {product.category}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2, pt: 0 }}>
                  <Button component={Link} href={`/dashboard/products/${product.id}`} fullWidth>
                    View product
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Stack alignItems="center" sx={{ mt: 3 }}>
        <Pagination count={pageCount} page={page} onChange={(_, value) => setPage(value)} color="primary" />
      </Stack>
    </Box>
  );
}
