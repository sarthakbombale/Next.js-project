# DummyJSON Admin Dashboard

This project is a Next.js admin dashboard built with Material UI, Zustand, and NextAuth. It consumes the public DummyJSON API for login, users, and products.

## Features

- Admin login with DummyJSON auth endpoint
- Protected dashboard routes using NextAuth
- Zustand state store for auth, users, products, and client-side caching
- Users list with search and pagination
- User detail pages with full profile information
- Products list with search, category filter, and pagination
- Product detail pages with image gallery and metadata
- Responsive MUI UI across login, list, and detail screens

## Installation

```bash
npm install
```

## Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Important routes

- `/login` — Admin login page
- `/dashboard` — Dashboard home
- `/dashboard/users` — Users list page
- `/dashboard/users/[id]` — User detail page
- `/dashboard/products` — Products list page
- `/dashboard/products/[id]` — Product detail page

## Authentication

This app uses `next-auth` with a credentials provider to call `https://dummyjson.com/auth/login`. The token returned by DummyJSON is stored in Zustand and used to preserve auth state.

## Zustand choice

Zustand was chosen because it provides:

- Simple and minimal state management for small-to-medium apps
- Built-in support for async actions and caching
- A small bundle footprint compared to Redux
- Easy integration with React hooks and the Next.js app router

## Environment variables

No environment variables are required for local development. The credential login flow uses the public DummyJSON API directly.

## Notes

- The project is already configured for the Next.js `app` router and MUI theming.
- Client-side caching is implemented in Zustand caches for users and products to avoid repeated API requests for the same queries.
