import { NextRequest, NextResponse } from 'next/server';
import { getAuthSession } from '~/src/config/auth';
import { Session } from 'next-auth';

type AuthController = (s: Session | null) => Promise<NextResponse>;

export const requireUserAuth = async (request: NextRequest, controller: AuthController) => {
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return controller(session);
};
