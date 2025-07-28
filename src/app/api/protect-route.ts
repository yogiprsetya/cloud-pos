import { NextRequest, NextResponse } from 'next/server';
import { nextAuthConfig } from '~/src/config/auth';
import { getServerSession, Session } from 'next-auth';

const getAuthSession = () => getServerSession(nextAuthConfig);

type AuthController = (s: Session | null) => Promise<NextResponse>;

export const requireUserAuth = async (request: NextRequest, controller: AuthController) => {
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return controller(session);
};
