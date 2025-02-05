import { Product, ProductVariantItem, ProductVariantLabel } from '~/model/types/product';
import { z } from 'zod';

type ProductManagerSchemaType = Omit<Product, 'id' | 'createdAt' | 'updatedAt'> & {
  variant?: Array<
    Pick<ProductVariantLabel, 'name'> & {
      items: Pick<ProductVariantItem, 'name' | 'price'>[];
    }
  >;
};

export const ProductManagerSchema: z.ZodType<ProductManagerSchemaType> = z.object({
  description: z.string().min(1).nonempty(),
  name: z.string().min(2).max(100),
  price: z.coerce.number().min(50),
  image: z.string().nonempty({ message: 'Please upload product image' }).url(),
  variant: z
    .array(
      z.object({
        name: z.string().min(2).max(100),
        items: z.array(
          z.object({
            name: z.string().min(2).max(100),
            price: z.number().min(1)
          })
        )
      })
    )
    .optional()
});

export type ProductManagerType = z.infer<typeof ProductManagerSchema>;
