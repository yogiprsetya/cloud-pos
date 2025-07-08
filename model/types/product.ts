import { type InferSelectModel } from 'drizzle-orm';
import { product } from '../schema/product';

export type Product = InferSelectModel<typeof product>;
