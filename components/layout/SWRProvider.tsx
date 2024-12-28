'use client';

import { FC, ReactNode } from 'react';
import { SWRConfig } from 'swr';
import { fetcher } from '~/services/http-client';

const swrOptions = {
  fetcher,
  shouldRetryOnError: true,
  revalidateOnFocus: true,
  errorRetryInterval: 5000,
};

export const SWRProvider: FC<{ children: ReactNode }> = (props) => (
  <SWRConfig value={swrOptions}>{props.children}</SWRConfig>
);
