import useSWR from 'swr';
import { useCallback, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { httpClient } from '../config/http-client';
import { useToast } from '~/src/hooks/useToast';
import { errorHandler } from '~/src/utils/error-handler';
import { useRouter } from 'next/navigation';
import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { product } from '~/db/schema/product';
import { HttpResponse } from '../types/Response';

type Forms = InferInsertModel<typeof product>;
type Product = InferSelectModel<typeof product>;

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
  const router = useRouter();

  const params = new URLSearchParams({
    keyword,
    limit: LIMIT.toString(),
    sortedBy: opt?.sortBy || '',
    sort: opt?.sort || '',
    page: opt?.page?.toString() || ''
  });

  const { data, isLoading, mutate } = useSWR<HttpResponse<Product[]>, Error>(
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

  const createNewProduct = useCallback(
    (form: Forms) => {
      setMutating(true);

      return httpClient
        .post<HttpResponse<Product>>('product', form)
        .then((res) => {
          toast({
            title: 'Product created',
            description: 'New product added successfully',
            duration: 2500
          });

          mutateAsync(res.data.data);
          router.push(`/dashboard/products`);

          return res;
        })
        .catch(errorHandler)
        .finally(() => setMutating(false));
    },
    [mutateAsync, router, toast]
  );

  const setProductImage = useCallback(
    (productId: number, url: string) => {
      setMutating(true);

      httpClient
        .put<HttpResponse<Product>>(`product/${productId}`, { image: url })
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

  const deleteProductById = useCallback(
    (id: number) => {
      setMutating(true);

      return httpClient
        .delete<HttpResponse<Product>>(`product/${id}`)
        .then((res) => {
          mutate();

          toast({
            title: 'Product deleted',
            description: 'A product deleted successfully',
            duration: 2500
          });

          return res;
        })
        .catch(errorHandler)
        .finally(() => setMutating(false));
    },
    [mutate, toast]
  );

  return {
    data,
    isLoading,
    mutate,
    isMutating,
    createNewProduct,
    setProductImage,
    deleteProductById,
    setSearchKeyword: useDebouncedCallback((q: string) => setSearchKeyword(q), 500)
  };
};
