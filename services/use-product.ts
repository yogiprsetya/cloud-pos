import { Product } from '~/domain/types/product';
import useSWR from 'swr';
import { HttpRequest } from '~/domain/types/http';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

type Options = {
  disabled?: boolean;
  limit?: number;
  sort?: 'asc' | 'desc';
  sortBy?: keyof Pick<Product, 'createdAt' | 'updatedAt'>;
  page?: number;
};

export const useProduct = (opt?: Options) => {
  const [keyword, setSearchKeyword] = useState('');

  const params = new URLSearchParams({
    keyword,
    limit: opt?.limit?.toString() || '',
    sortedBy: opt?.sortBy || '',
    sort: opt?.sort || '',
    page: opt?.page?.toString() || '',
  });

  const { data, isLoading, mutate } = useSWR<HttpRequest<Product[]>, Error>(
    opt?.disabled ? null : `product?${params.toString()}`,
  );

  return {
    data,
    isLoading,
    mutate,
    setSearchKeyword: useDebouncedCallback((q: string) => setSearchKeyword(q), 500),
  };
};
