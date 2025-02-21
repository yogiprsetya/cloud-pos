import { requireUserAuth } from 'api-lib/protect-route';
import { db } from '~/config/db';
import { handleSuccessResponse } from 'api-lib/handle-success-res';
import { handleExpiredSession, handleInvalidRequest } from 'api-lib/handle-error-res';
import { productVariantLabel, productVariantItem } from '~/model/schema/product';
import { type NextRequest } from 'next/server';
import { bodyParse } from 'api-lib/body-parse';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { eq } from 'drizzle-orm';

type Params = {
  params: { id: string };
};

const variantLabel = createInsertSchema(productVariantLabel);
const variantItem = createInsertSchema(productVariantItem);

const createReqSchema = z.object({
  ...variantLabel.omit({ createdAt: true, updatedAt: true }).shape,
  items: z.array(variantItem.omit({ labelId: true, createdAt: true, updatedAt: true }))
});

export const PUT = async (req: NextRequest, { params }: Params) => {
  const { id } = await params;
  const body = await bodyParse(req);

  const { data, success, error } = createReqSchema.safeParse(body);

  if (!success) {
    return handleInvalidRequest(error);
  }

  return requireUserAuth(req, async (session) => {
    if (session) {
      await db
        .update(productVariantLabel)
        .set({
          name: data.name,
          updatedAt: new Date()
        })
        .where(eq(productVariantLabel.id, Number(id)));

      // Delete existing items
      await db.delete(productVariantItem).where(eq(productVariantItem.labelId, Number(id)));

      // Insert new items
      const variantItems = await Promise.all(
        data.items.map((item) =>
          db
            .insert(productVariantItem)
            .values({
              labelId: Number(id),
              name: item.name,
              price: item.price
            })
            .returning()
        )
      );

      const flattenedVariantItems = variantItems.flat();
      return handleSuccessResponse({ id, name: data.name, items: flattenedVariantItems });
    }

    return handleExpiredSession();
  });
};
