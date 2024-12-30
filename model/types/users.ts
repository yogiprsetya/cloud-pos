import { type InferSelectModel } from 'drizzle-orm';
import { users } from '../schema/users';

export type User = InferSelectModel<typeof users>;

export type Role = User['role'];

export type JWT = User & {
  sub: string;
  iat: number;
  exp: number;
  jti: string;
};
