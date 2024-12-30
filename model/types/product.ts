import { type InferSelectModel } from 'drizzle-orm';
import { product, productVariantLabel, productVariantItem } from '../schema/product';

export type Product = InferSelectModel<typeof product>;

export type ProductVariantItem = InferSelectModel<typeof productVariantItem>;

export type ProductVariantLabel = InferSelectModel<typeof productVariantLabel>;

export type ProductVariant = ProductVariantLabel & {
  items: ProductVariantItem[];
};

export type ProductWithVariants = Product & {
  variants: ProductVariant[];
};
