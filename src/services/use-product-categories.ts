import useSWR from 'swr';
import { useDebounce } from 'use-debounce';
import { useCallback, useState } from 'react';
import { useToast } from '~/src/hooks/useToast';
import { httpClient } from '~/src/config/http-client';
import { errorHandler } from '~/src/utils/error-handler';
import { HttpResponse } from '../types/Response';
import { type InferSelectModel } from 'drizzle-orm';
import { productCategory } from '~/db/schema/product';

type ProductCategory = InferSelectModel<typeof productCategory>;

export const useProductCategories = () => {
  const [isMutating, setMutating] = useState(false);

  const { data, isLoading, mutate } = useSWR<HttpResponse<ProductCategory[]>, Error>('product-category');

  const [value] = useDebounce(isLoading, 500);
  const { toast } = useToast();

  const addCategory = useCallback(
    (name: string) => {
      setMutating(true);

      return httpClient
        .post<HttpResponse<ProductCategory>>('product-category', { name })
        .then((res) => {
          mutate();

          toast({
            title: 'Category added',
            description: 'A product category created successfully',
            duration: 2500
          });

          return res;
        })
        .catch(errorHandler)
        .finally(() => setMutating(false));
    },
    [mutate, toast]
  );

  const deleteCategory = useCallback(
    (id: number) => {
      setMutating(true);

      return httpClient
        .delete<HttpResponse<ProductCategory>>(`product-category/${id}`)
        .then((res) => {
          mutate();

          toast({
            title: 'Category deleted',
            description: 'A product category deleted successfully',
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
    isLoading: value,
    isMutating,
    addCategory,
    deleteCategory
  };
};
