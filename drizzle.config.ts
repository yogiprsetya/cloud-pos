/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'drizzle-kit';
import '~/config/env';

export default defineConfig({
  dialect: 'postgresql',
  schema: './schema/*',
  out: './drizzle',
  dbCredentials: {
    url: process.env.POSTGRES_URL || '',
  },
  verbose: true,
  strict: true,
});
