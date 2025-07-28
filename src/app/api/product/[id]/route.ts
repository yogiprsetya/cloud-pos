import { requireUserAuth } from '~/src/app/api/protect-route';
import { db } from '~/src/config/db-client';
import { type NextRequest } from 'next/server';
import { handleSuccessResponse } from '~/src/app/api/handle-success-res';
import {
  handleDataNotFound,
  handleExpiredSession,
  handleInvalidRequest
} from '~/src/app/api/handle-error-res';
import { eq, sql } from 'drizzle-orm';
import { bodyParse } from '../../body-parse';
import { createUpdateSchema } from 'drizzle-zod';
import { product } from '~/db/schema/product';

type Params = {
  params: Promise<{ id: string }>;
};

const createReqSchema = createUpdateSchema(product);

export const GET = async (req: NextRequest, context: Params) => {
  const { id } = await context.params;

  return requireUserAuth(req, async (session) => {
    if (session) {
      const result = await db.execute(sql`
        SELECT
          p.id AS id,
          p.name AS name,
          p.price AS price,
          p.description AS description,
          p.category_id AS category,
          p.created_at AS createdAt,
          p.updated_at AS updatedAt,
        FROM product p
        LEFT JOIN product_category pc ON pc.id = p.category_id
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

      if (!result.length) return handleDataNotFound();

      return handleSuccessResponse(result[0]);
    }

    return handleExpiredSession();
  });
};
