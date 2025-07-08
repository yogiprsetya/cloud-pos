import { type InferSelectModel } from 'drizzle-orm';
import { product, productCategory } from '../schema/product';

export type Product = InferSelectModel<typeof product>;

export type ProductCategory = InferSelectModel<typeof productCategory>;
