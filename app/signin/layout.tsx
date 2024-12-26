'use client';

import { useSession } from 'next-auth/react';
import { redirect, useSearchParams } from 'next/navigation';
import { useIsomorphicLayoutEffect } from '~/hooks/useIsomorphicLayoutEffect';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const searchParam = useSearchParams();
  const search = searchParam.get('returnUrl');

  const { status } = useSession();
  const isAunthenticated = status === 'authenticated';

  useIsomorphicLayoutEffect(() => {
    if (isAunthenticated) {
      redirect(search ?? '/dashboard');
    }
  }, [isAunthenticated]);

  return <>{children}</>;
}
