import { requireUserAuth } from '~/app/api/protect-route';
import { db } from '~/config/db';
import { handleSuccessResponse } from '~/app/api/handle-success-res';
import { handleExpiredSession, handleInvalidRequest } from '~/app/api/handle-error-res';
import { productCategory } from '~/model/schema/product';
import { type NextRequest } from 'next/server';
import { createMeta } from '~/app/api/create-meta';
import { createInsertSchema } from 'drizzle-zod';
import { bodyParse } from '~/app/api/body-parse';

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
