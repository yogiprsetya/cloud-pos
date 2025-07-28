/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { DefaultSession } from 'next-auth';
import { JWT as TokenCore } from '~/core/entities/Token';
import { User as UserCore } from '~/core/entities/User';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends Pick<DefaultSession, 'expires'> {
    user: UserCore;
  }

  interface User extends UserCore {}
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends TokenCore {}
}
