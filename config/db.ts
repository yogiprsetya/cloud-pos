import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
// import { users, accounts, sessions, verificationTokens } from '~/schema/users';

const client = postgres(process.env.POSTGRES_URL || '', { prepare: false });

const db = drizzle(client);

export { db };
