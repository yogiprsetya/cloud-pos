import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { users } from '~/db/schema/users';
import * as products from '~/db/schema/product';
import * as transaction from '~/db/schema/transaction';

const client = postgres(process.env.POSTGRES_URL || '', { prepare: false });

const db = drizzle(client, { schema: { users, ...products, ...transaction } });

export { db };
