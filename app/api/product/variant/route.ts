import { requireUserAuth } from 'api-lib/protect-route';
import { db } from '~/config/db';
import { handleSuccessResponse } from 'api-lib/handle-success-res';
import { handleExpiredSession, handleInvalidRequest } from 'api-lib/handle-error-res';
import { productVariantLabel, productVariantItem } from '~/model/schema/product';
import { type NextRequest } from 'next/server';
import { bodyParse } from 'api-lib/body-parse';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

const variantLabel = createInsertSchema(productVariantLabel);
const variantItem = createInsertSchema(productVariantItem);

const createReqSchema = z.object({
  ...variantLabel.omit({ createdAt: true, updatedAt: true }).shape,
  items: z.array(variantItem.omit({ labelId: true, createdAt: true, updatedAt: true }))
});

export const POST = async (req: NextRequest) => {
  const body = await bodyParse(req);
  const { data, success, error } = createReqSchema.safeParse(body);

  if (!success) {
    return handleInvalidRequest(error);
  }

  return requireUserAuth(req, async (session) => {
    if (session) {
      const result = await db
        .insert(productVariantLabel)
        .values({
          name: data.name,
          productId: data.productId
        })
        .returning();

      const variantItems = await Promise.all(
        data.items.map((item) =>
          db
            .insert(productVariantItem)
            .values({
              labelId: result[0].id,
              name: item.name,
              price: item.price
            })
            .returning()
        )
      );

      const flattenedVariantItems = variantItems.flat();

      return handleSuccessResponse({ ...result[0], items: flattenedVariantItems });
    }

    return handleExpiredSession();
  });
};
