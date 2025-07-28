/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'drizzle-kit';
import '~/src/config/env';

export default defineConfig({
  dialect: 'postgresql',
  schema: './db/schema/*',
  out: './db/drizzle',
  dbCredentials: {
    url: process.env.POSTGRES_URL || ''
  },
  verbose: true,
  strict: true
});
