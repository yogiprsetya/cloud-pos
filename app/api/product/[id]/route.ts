import { requireUserAuth } from 'api-lib/protect-route';
import { db } from '~/config/db';
import { type NextRequest } from 'next/server';
import { handleSuccessResponse } from 'api-lib/handle-success-res';
import { handleDataNotFound, handleExpiredSession, handleInvalidRequest } from 'api-lib/handle-error-res';
import { eq, sql } from 'drizzle-orm';
import { bodyParse } from '../../_lib/body-parse';
import { createUpdateSchema } from 'drizzle-zod';
import { product, productVariantLabel, productVariantItem } from '~/model/schema/product';

type Params = {
  params: { id: string };
};

const createReqSchema = createUpdateSchema(product);

export const GET = async (req: NextRequest, { params }: Params) => {
  const { id } = await params;

  return requireUserAuth(req, async (session) => {
    if (session) {
      const result = await db.execute(sql`
        SELECT
          p.id AS id,
          p.name AS name,
          p.price AS price,
          p.description AS description,
          p.created_at AS createdAt,
          p.updated_at AS updatedAt,
          json_agg(
            json_build_object(
              'id', vl.id,
              'name', vl.name,
              'items', (
                SELECT json_agg(
                  json_build_object(
                    'id', vi.id,
                    'name', vi.name,
                    'price', vi.price
                  )
                )
                FROM product_variant_item vi
                WHERE vi.label_id = vl.id
              )
            )
          ) AS variants
        FROM product p
        LEFT JOIN product_variant_label vl ON vl.product_id = p.id
        WHERE p.id = ${id}
        GROUP BY p.id;
      `);

      if (!result.length) return handleDataNotFound();

      return handleSuccessResponse(result[0]);
    }

    return handleExpiredSession();
  });
};

export const PUT = async (req: NextRequest, { params }: Params) => {
  const { id } = await params;
  const body = await bodyParse(req);
  const { data, success, error } = createReqSchema.safeParse(body);

  if (!success) {
    return handleInvalidRequest(error);
  }

  return requireUserAuth(req, async (session) => {
    if (session) {
      const result = await db
        .update(product)
        .set({
          name: data.name,
          price: data.price,
          description: data.description,
          image: data.image,
          updatedAt: new Date()
        })
        .where(eq(product.id, Number(id)))
        .returning();

      return handleSuccessResponse(result[0]);
    }

    return handleExpiredSession();
  });
};

export const DELETE = async (req: NextRequest, { params }: Params) => {
  const { id } = await params;

  return requireUserAuth(req, async (session) => {
    if (session) {
      const result = await db
        .delete(product)
        .where(eq(product.id, Number(id)))
        .returning();

      const variantLabel = await db
        .delete(productVariantLabel)
        .where(eq(productVariantLabel.productId, Number(id)))
        .returning();

      if (variantLabel.length) {
        await db.delete(productVariantItem).where(eq(productVariantItem.labelId, variantLabel[0].id));
      }

      if (!result.length) return handleDataNotFound();

      return handleSuccessResponse(result[0]);
    }

    return handleExpiredSession();
  });
};
