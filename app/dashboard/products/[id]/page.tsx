'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  ImageList,
  ImageListItem,
  Typography,
} from '@mui/material';
import { useStore } from '@/store/useStore';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { productDetail, fetchProductById, isLoadingProductDetail } = useStore((state) => ({
    productDetail: state.productDetail,
    fetchProductById: state.fetchProductById,
    isLoadingProductDetail: state.isLoadingProductDetail,
  }));

  useEffect(() => {
    fetchProductById(Number(id));
  }, [fetchProductById, id]);

  if (isLoadingProductDetail || !productDetail || productDetail.id !== Number(id)) {
    return (
      <Box sx={{ minHeight: '60vh', display: 'grid', placeItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            {productDetail.title}
          </Typography>
          <Typography color="text.secondary">View the full DummyJSON product details and specifications.</Typography>
        </Box>
        <Button component={Link} href="/dashboard/products" variant="outlined">
          Back to Products
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <ImageList cols={1} rowHeight={260}>
                {productDetail.images.map((image) => (
                  <ImageListItem key={image}>
                    <Image
                      src={image}
                      alt={productDetail.title}
                      width={700}
                      height={420}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Product details
              </Typography>
              <Typography variant="body1" paragraph>
                {productDetail.description}
              </Typography>
              <Typography variant="subtitle1" fontWeight={700}>
                ${productDetail.price}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Category: {productDetail.category}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Rating: {productDetail.rating}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
