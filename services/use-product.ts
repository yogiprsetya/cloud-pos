import { Product } from '~/model/types/product';
import useSWR from 'swr';
import { HttpRequest } from '~/model/types/http';
import { useCallback, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { httpClient } from './http-client';
import { useToast } from '~/hooks/useToast';

type Options = {
  disabled?: boolean;
  limit?: number;
  sort?: 'asc' | 'desc';
  sortBy?: keyof Pick<Product, 'createdAt' | 'updatedAt'>;
  page?: number;
};

export const useProduct = (opt?: Options) => {
  const [keyword, setSearchKeyword] = useState('');
  const [isMutating, setMutating] = useState(false);

  const { toast } = useToast();

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

  const initNewProduct = useCallback(
    (form: Pick<Product, 'name' | 'description' | 'price'>) => {
      setMutating(true);

      httpClient.post<Product>('product', form).then((res) => {
        toast({
          title: 'Product created',
          description: 'Continue to add product image',
          duration: 2500,
        });

        mutate((current) => {
          if (!current) return current;

          return {
            ...current,
            data: [...current.data, res.data],
          };
        });
      });
    },
    [mutate, toast],
  );

  return {
    data,
    isLoading,
    mutate,
    isMutating,
    initNewProduct,
    setSearchKeyword: useDebouncedCallback((q: string) => setSearchKeyword(q), 500),
  };
};
