import { requireUserAuth } from '~/app/api/protect-route';
import { db } from '~/config/db';
import { handleSuccessResponse } from '~/app/api/handle-success-res';
import { handleExpiredSession, handleInvalidRequest } from '~/app/api/handle-error-res';
import { productCategory } from '~/model/schema/product';
import { type NextRequest } from 'next/server';
import { createMeta } from '~/app/api/create-meta';
import { createInsertSchema } from 'drizzle-zod';
import { bodyParse } from '~/app/api/body-parse';

const LIMIT = 10;

const createReqSchema = createInsertSchema(productCategory);

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;

  const params = {
    sort: searchParams.get('sort'),
    limit: searchParams.get('limit'),
    page: searchParams.get('page')
  };

  const limitRow = Number(params?.limit || LIMIT);
  const offset = params.page ? (Number(params.page) - 1) * limitRow : 0;

  return requireUserAuth(req, async (session) => {
    if (session) {
      const result = await db.select().from(productCategory).limit(limitRow).offset(offset);

      const meta = await createMeta({
        table: productCategory,
        limit: limitRow,
        page: Number(params.page || 1),
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
