import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'DummyJSON Admin',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'kminchelle' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Username and password are required.');
        }

        const response = await fetch('https://dummyjson.com/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Authentication failed');
        }

        return {
          id: data.id,
          name: `${data.firstName} ${data.lastName}`,
          email: `${data.username}@dummyjson.com`,
          token: data.token,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const authPayload = user as { token?: string; name?: string; email?: string };
        token.accessToken = authPayload.token;
        token.name = authPayload.name;
        token.email = authPayload.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const authSession = {
          name: token.name as string,
          email: token.email as string,
          token: token.accessToken as string,
        };
        session.user = authSession as unknown as typeof session.user;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
