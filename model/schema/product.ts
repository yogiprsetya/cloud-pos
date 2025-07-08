import { text, timestamp, pgTable, serial, varchar, integer } from 'drizzle-orm/pg-core';

export const product = pgTable('product', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description', { length: 255 }).default('').notNull(),
  image: text('image').default(''),
  price: integer('price').notNull(),
  categoryId: integer('category_id').references(() => productCategory.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

export const productCategory = pgTable('product_category', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});
