import { Product } from '~/model/types/product';
import { z } from 'zod';

export type ProductManagerSchemaType = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;

export const ProductManagerSchema: z.ZodType<ProductManagerSchemaType> = z.object({
  description: z.string().min(1).nonempty(),
  name: z.string().min(2).max(100),
  price: z.coerce.number().min(50),
  categoryId: z.number().min(128),
  image: z.string().url()
});

export type ProductManagerType = z.infer<typeof ProductManagerSchema>;
