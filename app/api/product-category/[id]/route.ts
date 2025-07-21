import { db } from '~/config/db';
import { type NextRequest } from 'next/server';
import { requireUserAuth } from '../../protect-route';
import { productCategory } from '~/model/schema/product';
import { eq } from 'drizzle-orm';
import { handleDataNotFound, handleExpiredSession } from '../../handle-error-res';
import { handleSuccessResponse } from '../../handle-success-res';

type Params = {
  params: Promise<{ id: string }>;
};

export const DELETE = async (req: NextRequest, { params }: Params) => {
  const { id } = await params;

  return requireUserAuth(req, async (session) => {
    if (session) {
      const result = await db
        .delete(productCategory)
        .where(eq(productCategory.id, Number(id)))
        .returning();

      if (!result.length) return handleDataNotFound();

      return handleSuccessResponse(result[0]);
    }

    return handleExpiredSession();
  });
};
