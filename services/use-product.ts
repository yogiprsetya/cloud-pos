import { Product, ProductVariant, ProductWithVariants } from '~/model/types/product';
import useSWR from 'swr';
import { HttpRequest } from '~/model/types/http';
import { useCallback, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { httpClient } from '../config/http-client';
import { useToast } from '~/hooks/useToast';
import { errorHandler } from '~/utils/error-handler';

const LIMIT = 12;

type Options = {
  disabled?: boolean;
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
    limit: LIMIT.toString(),
    sortedBy: opt?.sortBy || '',
    sort: opt?.sort || '',
    page: opt?.page?.toString() || ''
  });

  const { data, isLoading, mutate } = useSWR<HttpRequest<Product[]>, Error>(
    opt?.disabled ? null : `product?${params.toString()}`
  );

  const mutateAsync = useCallback(
    (data: Product) => {
      mutate((current) => {
        if (!current) return current;

        return {
          ...current,
          data: [...current.data, data]
        };
      }, false);
    },
    [mutate]
  );

  const createVaraint = useCallback((form: Partial<ProductVariant>) => {
    return httpClient
      .post<HttpRequest<ProductVariant>>('product/variant', form)
      .then((res) => res)
      .catch(errorHandler)
      .finally(() => setMutating(false));
  }, []);

  const createNewProduct = useCallback(
    (form: Partial<ProductWithVariants>) => {
      setMutating(true);

      const { variants, ...product } = form;

      return httpClient
        .post<HttpRequest<Product>>('product', { ...product })
        .then((res) => {
          if (variants?.length) {
            variants.forEach((variant) => {
              createVaraint({ ...variant, productId: res.data.data.id });
            });
          }

          toast({
            title: 'Product created',
            description: 'New product added successfully',
            duration: 2500
          });

          mutateAsync(res.data.data);
          return res;
        })
        .catch(errorHandler)
        .finally(() => setMutating(false));
    },
    [createVaraint, mutateAsync, toast]
  );

  const setProductImage = useCallback(
    (productId: number, url: string) => {
      setMutating(true);

      httpClient
        .put<HttpRequest<Product>>(`product/${productId}`, { image: url })
        .then((res) => {
          toast({
            title: 'Product created',
            description: 'Continue to add product image',
            duration: 2500
          });

          mutateAsync(res.data.data);
          return res;
        })
        .catch(errorHandler)
        .finally(() => setMutating(false));
    },
    [mutateAsync, toast]
  );

  return {
    data,
    isLoading,
    mutate,
    isMutating,
    createNewProduct,
    setProductImage,
    setSearchKeyword: useDebouncedCallback((q: string) => setSearchKeyword(q), 500)
  };
};
