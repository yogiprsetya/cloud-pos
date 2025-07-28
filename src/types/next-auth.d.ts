/* eslint-disable @typescript-eslint/no-unused-vars */
import type { User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

type UserId = string;

declare module 'next-auth/jwt' {
  interface JWT {
    id: UserId;
    role: 'staff' | 'manager';
  }
}

declare module 'next-auth' {
  interface Session {
    user: User & {
      id: UserId;
      role: 'staff' | 'manager';
    };
  }

  interface User extends User {
    role: 'staff' | 'manager';
  }
}
