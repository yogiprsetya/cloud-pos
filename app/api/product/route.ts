import { requireUserAuth } from 'api-lib/protect-route';
import { db } from '~/config/db';
import { handleSuccessResponse } from 'api-lib/handle-success-res';
import { handleExpiredSession, handleInvalidRequest } from 'api-lib/handle-error-res';
import { and, asc, desc, ilike } from 'drizzle-orm';
import { product } from '~/model/schema/product';
import { type NextRequest } from 'next/server';
import { createMeta } from 'api-lib/create-meta';
import { Product } from '~/model/types/product';
import { bodyParse } from 'api-lib/body-parse';
import { createInsertSchema } from 'drizzle-zod';

const LIMIT = 10;

const createReqSchema = createInsertSchema(product);

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;

  const params = {
    sort: searchParams.get('sort'),
    limit: searchParams.get('limit'),
    keyword: searchParams.get('keyword'),
    page: searchParams.get('page'),
    sortBy: searchParams.get('sortBy') as keyof Pick<Product, 'createdAt' | 'updatedAt'>
  };

  const limitRow = Number(params?.limit || LIMIT);
  const searchCodition = params.keyword ? ilike(product.name, `%${params.keyword}%`) : undefined;
  const offset = params.page ? (Number(params.page) - 1) * limitRow : 0;
  const queryFilter = and(searchCodition);
  const sortedBy = params.sortBy || 'createdAt';
  const sorted = params.sort || 'asc';

  const sortedAsc = sortedBy === 'createdAt' ? asc(product.createdAt) : asc(product.updatedAt);
  const sortedDesc = sortedBy === 'updatedAt' ? desc(product.updatedAt) : desc(product.createdAt);

  return requireUserAuth(req, async (session) => {
    if (session) {
      const result = await db
        .select()
        .from(product)
        .where(queryFilter)
        .limit(limitRow)
        .offset(offset)
        .orderBy(sorted === 'asc' ? sortedAsc : sortedDesc);

      const meta = await createMeta({
        table: product,
        limit: limitRow,
        page: Number(params.page || 1),
        query: queryFilter
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
        .insert(product)
        .values({
          name: data.name,
          price: data.price,
          description: data.description,
          image: data.image
        })
        .returning();

      return handleSuccessResponse(result[0]);
    }

    return handleExpiredSession();
  });
};
