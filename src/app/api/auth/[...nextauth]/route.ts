import NextAuth from 'next-auth';
import { nextAuthConfig } from '~/src/config/auth';

const handler = NextAuth(nextAuthConfig);

export { handler as GET, handler as POST };
