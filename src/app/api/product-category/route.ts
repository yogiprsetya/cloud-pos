import { requireUserAuth } from '~/src/app/api/protect-route';
import { db } from '~/src/config/db-client';
import { handleSuccessResponse } from '~/src/app/api/handle-success-res';
import { handleExpiredSession, handleInvalidRequest } from '~/src/app/api/handle-error-res';
import { type NextRequest } from 'next/server';
import { createMeta } from '~/src/app/api/create-meta';
import { createInsertSchema } from 'drizzle-zod';
import { bodyParse } from '~/src/app/api/body-parse';
import { productCategory } from '~/db/schema/product';

const LIMIT = 6;

const createReqSchema = createInsertSchema(productCategory);

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;

  const params = {
    limit: searchParams.get('limit')
  };

  const limitRow = Number(params?.limit || LIMIT);

  return requireUserAuth(req, async (session) => {
    if (session) {
      const result = await db.select().from(productCategory).limit(limitRow);

      const meta = await createMeta({
        table: productCategory,
        limit: limitRow,
        page: 1,
        query: undefined
      });

      return handleSuccessResponse(result, meta);
    }

    return handleExpiredSession();
  });
};

export const POST = async (req: NextRequest) => {
  const body = await bodyParse(req);
  const { data, success, error } = createReqSchema.safeParse(body);

  if (!success) {
    return handleInvalidRequest(error);
  }

  return requireUserAuth(req, async (session) => {
    if (session) {
      const result = await db
        .insert(productCategory)
        .values({
          name: data.name
        })
        .returning();

      return handleSuccessResponse(result[0]);
    }

    return handleExpiredSession();
  });
};
