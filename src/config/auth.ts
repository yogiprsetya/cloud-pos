import { getServerSession, NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import type { Adapter } from 'next-auth/adapters';
import { db } from '~/src/config/db-client';
import { accounts, sessions, users, verificationTokens } from '~/db/schema/users';
import { eq } from 'drizzle-orm';

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
      const dbUser = await db
        .select()
        .from(users)
        .where(eq(users.email, token.email ?? ''));

      if (!dbUser) {
        token.id = user!.id;
        return token;
      }

      return {
        id: dbUser[0].id,
        name: dbUser[0].name,
        email: dbUser[0].email,
        picture: dbUser[0].image,
        role: dbUser[0].role
      };
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.role = token.role;
      }

      return session;
    }
  }
};

export const getAuthSession = () => getServerSession(nextAuthConfig);
