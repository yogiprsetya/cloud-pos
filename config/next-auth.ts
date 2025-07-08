import '~/config/env';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import type { Adapter } from 'next-auth/adapters';
import { db } from '~/config/db';
import { accounts, sessions, users, verificationTokens } from '~/model/schema/users';

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXTAUTH_SECRET } = process.env;

export const nextAuthConfig: NextAuthOptions = {
  pages: {
    signIn: '/signin'
  },
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens
  }) as Adapter,
  secret: NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID ?? '',
      clientSecret: GOOGLE_CLIENT_SECRET ?? '',
      httpOptions: {
        timeout: 40000
      },
      async profile(profile) {
        return {
          ...profile,
          id: profile.sub,
          role: profile.role ?? 'staff',
          image: profile.picture
        };
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image ?? '';
        token.role = user.role ?? 'staff';
        return token;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        return {
          ...session,
          user: {
            id: token.id,
            email: token.email,
            name: token.name,
            role: token.role,
            image: token.image
          }
        };
      }

      return { ...session, user: session.user };
    }
  }
};
