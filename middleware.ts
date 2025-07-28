import { NextRequest, NextResponse } from 'next/server';
import { getAuthSession } from './src/config/auth';

export default async function middleware(req: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected)
  const path = req.nextUrl.pathname;

  // If it's the root path, just render it
  if (path === '/') {
    return NextResponse.next();
  }

  const session = await getAuthSession();

  const isProtected = path.includes('/dashboard');

  if (!session && isProtected) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  return NextResponse.next();
}
