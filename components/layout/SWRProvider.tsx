'use client';

import { FC, ReactNode } from 'react';
import { SWRConfig } from 'swr';
import { fetcher } from '~/config/http-client';

const swrOptions = {
  fetcher,
  shouldRetryOnError: true,
  revalidateOnFocus: false,
  errorRetryInterval: 5000
};

export const SWRProvider: FC<{ children: ReactNode }> = (props) => (
  <SWRConfig value={swrOptions}>{props.children}</SWRConfig>
);
