import { relations } from 'drizzle-orm';
import { text, timestamp, pgTable, serial, varchar, integer } from 'drizzle-orm/pg-core';

export const product = pgTable('product', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description', { length: 255 }).default('').notNull(),
  image: text('image').notNull(),
  price: integer('price').notNull(),
  categoryId: integer('category_id')
    .notNull()
    .references(() => productCategory.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date())
});

export const productCategory = pgTable('product_category', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow()
});

export const productRelations = relations(product, ({ one }) => ({
  category: one(productCategory, {
    fields: [product.categoryId],
    references: [productCategory.id]
  })
}));

export const productCategoryRelations = relations(productCategory, ({ many }) => ({
  products: many(product)
}));
