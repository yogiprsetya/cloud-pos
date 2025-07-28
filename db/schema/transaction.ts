import { pgTable, varchar, timestamp, numeric, integer, pgEnum, uuid, text } from 'drizzle-orm/pg-core';
import { users } from './users';
import { product } from './product';
import { relations } from 'drizzle-orm';

export const paymentMethodEnum = pgEnum('payment_method', ['qr_code', 'edc', 'cash']);

export const paymentStatusEnum = pgEnum('payment_status', ['pending', 'expired', 'canceled', 'paid']);

export const transactions = pgTable('transactions', {
  id: uuid('id').primaryKey(),
  invoiceNumber: varchar('invoice_number').notNull(),
  createdBy: text('created_by')
    .notNull()
    .references(() => users.id),
  subtotal: numeric('subtotal').notNull(),
  taxAmount: numeric('tax_amount').notNull(),
  discountAmount: numeric('discount_amount'),
  totalAmount: numeric('total_amount').notNull(),
  paymentMethod: paymentMethodEnum('payment_method').notNull(),
  paymentStatus: paymentStatusEnum('payment_status').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow()
});

export const transactionItems = pgTable('transaction_items', {
  id: uuid('id').primaryKey(),
  transactionId: uuid('transaction_id')
    .notNull()
    .references(() => transactions.id),
  productId: integer('product_id')
    .notNull()
    .references(() => product.id),
  quantity: integer('quantity').notNull(),
  price: numeric('price').notNull(),
  notes: varchar('notes')
});

export const transactionsRelations = relations(transactions, ({ many, one }) => ({
  items: many(transactionItems),
  created: one(users, {
    fields: [transactions.createdBy],
    references: [users.id]
  })
}));

export const transactionItemsRelations = relations(transactionItems, ({ one }) => ({
  transaction: one(transactions, {
    fields: [transactionItems.transactionId],
    references: [transactions.id]
  }),
  product: one(product, {
    fields: [transactionItems.productId],
    references: [product.id]
  })
}));
