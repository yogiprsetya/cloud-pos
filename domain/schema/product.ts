import { text, timestamp, pgTable, serial, varchar, integer } from 'drizzle-orm/pg-core';

export const product = pgTable('product', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description', { length: 255 }),
  sku: varchar('sku', { length: 190 }).default('').notNull(),
  image: text('image'),
  price: integer('price').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const productVariantLabel = pgTable('product_variant_label', {
  id: serial('id').primaryKey(),
  productId: integer('product_id')
    .references(() => product.id)
    .notNull(),
  name: varchar('name', { length: 190 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const productVariantItem = pgTable('product_variant_item', {
  id: serial('id').primaryKey(),
  labelId: integer('label_id')
    .references(() => productVariantLabel.id)
    .notNull(),
  name: varchar('name', { length: 190 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
