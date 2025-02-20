import { requireUserAuth } from 'api-lib/protect-route';
import { db } from '~/config/db';
import { type NextRequest } from 'next/server';
import { handleSuccessResponse } from 'api-lib/handle-success-res';
import { handleDataNotFound, handleExpiredSession } from 'api-lib/handle-error-res';
import { sql } from 'drizzle-orm';

type Params = {
  params: { id: string };
};

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
