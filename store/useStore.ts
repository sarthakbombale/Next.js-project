import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AuthUser = {
  name: string;
  email: string;
  token: string;
  id?: number;
};

export type UserSummary = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phone: string;
  company: {
    name: string;
  };
  image?: string;
};

export type ProductSummary = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  thumbnail: string;
  images: string[];
};

interface StoreState {
  authUser: AuthUser | null;
  token: string | null;
  users: UserSummary[];
  totalUsers: number;
  userPage: number;
  userSearch: string;
  usersCache: Record<string, { users: UserSummary[]; total: number }>;
  isLoadingUsers: boolean;
  userDetail: UserSummary | null;
  isLoadingUserDetail: boolean;
  products: ProductSummary[];
  totalProducts: number;
  productPage: number;
  productSearch: string;
  productCategory: string;
  productsCache: Record<string, { products: ProductSummary[]; total: number }>;
  isLoadingProducts: boolean;
  productDetail: ProductSummary | null;
  isLoadingProductDetail: boolean;
  categories: string[];
  setAuthUser: (user: AuthUser) => void;
  setToken: (token: string) => void;
  logout: () => void;
  fetchUsers: (params: { limit?: number; skip?: number; search?: string }) => Promise<void>;
  fetchUserById: (id: number) => Promise<void>;
  fetchProducts: (params: {
    limit?: number;
    skip?: number;
    search?: string;
    category?: string;
  }) => Promise<void>;
  fetchProductById: (id: number) => Promise<void>;
  fetchCategories: () => Promise<void>;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      authUser: null,
      token: null,
      users: [],
      totalUsers: 0,
      userPage: 0,
      userSearch: '',
      usersCache: {},
      isLoadingUsers: false,
      userDetail: null,
      isLoadingUserDetail: false,
      products: [],
      totalProducts: 0,
      productPage: 0,
      productSearch: '',
      productCategory: 'all',
      productsCache: {},
      isLoadingProducts: false,
      productDetail: null,
      isLoadingProductDetail: false,
      categories: [],
      setAuthUser: (user) => set({ authUser: user }),
      setToken: (token) => set({ token }),
      logout: () =>
        set({
          authUser: null,
          token: null,
        }),
      fetchUsers: async ({ limit = 10, skip = 0, search = '' }) => {
        const cacheKey = [limit, skip, search].join('|');
        const cached = get().usersCache[cacheKey];
        if (cached) {
          set({ users: cached.users, totalUsers: cached.total, userPage: skip / limit, userSearch: search });
          return;
        }

        set({ isLoadingUsers: true });
        const path = search
          ? `https://dummyjson.com/users/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`
          : `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;

        const response = await fetch(path);
        const data = await response.json();

        set((state) => ({
          users: data.users || [],
          totalUsers: data.total || 0,
          userPage: skip / limit,
          userSearch: search,
          usersCache: {
            ...state.usersCache,
            [cacheKey]: {
              users: data.users || [],
              total: data.total || 0,
            },
          },
          isLoadingUsers: false,
        }));
      },
      fetchUserById: async (id) => {
        const currentUser = get().userDetail;
        if (currentUser?.id === id) {
          return;
        }

        set({ isLoadingUserDetail: true });
        const response = await fetch(`https://dummyjson.com/users/${id}`);
        const data = await response.json();

        set({ userDetail: data, isLoadingUserDetail: false });
      },
      fetchProducts: async ({ limit = 10, skip = 0, search = '', category = 'all' }) => {
        const cacheKey = [limit, skip, search, category].join('|');
        const cached = get().productsCache[cacheKey];
        if (cached) {
          set({ products: cached.products, totalProducts: cached.total, productPage: skip / limit, productSearch: search, productCategory: category });
          return;
        }

        set({ isLoadingProducts: true });
        let path = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
        if (search) {
          path = `https://dummyjson.com/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`;
        } else if (category && category !== 'all') {
          path = `https://dummyjson.com/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`;
        }

        const response = await fetch(path);
        const data = await response.json();

        set((state) => ({
          products: data.products || [],
          totalProducts: data.total || 0,
          productPage: skip / limit,
          productSearch: search,
          productCategory: category,
          productsCache: {
            ...state.productsCache,
            [cacheKey]: {
              products: data.products || [],
              total: data.total || 0,
            },
          },
          isLoadingProducts: false,
        }));
      },
      fetchProductById: async (id) => {
        const currentProduct = get().productDetail;
        if (currentProduct?.id === id) {
          return;
        }

        set({ isLoadingProductDetail: true });
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();

        set({ productDetail: data, isLoadingProductDetail: false });
      },
      fetchCategories: async () => {
        const existing = get().categories;
        if (existing.length > 0) {
          return;
        }

        const response = await fetch('https://dummyjson.com/products/categories');
        const data = await response.json();
        set({ categories: Array.isArray(data) ? data : [] });
      },
    }),
    {
      name: 'dummyjson-admin-storage',
      partialize: (state) => ({
        authUser: state.authUser,
        token: state.token,
        usersCache: state.usersCache,
        productsCache: state.productsCache,
      }),
    }
  )
);
