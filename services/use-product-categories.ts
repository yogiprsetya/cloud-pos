import type { ProductCategory } from '~/model/types/product';
import useSWR from 'swr';
import { HttpRequest } from '~/model/types/http';
import { useDebounce } from 'use-debounce';
import { useCallback, useState } from 'react';
import { useToast } from '~/hooks/useToast';
import { httpClient } from '~/config/http-client';
import { errorHandler } from '~/utils/error-handler';
import { ProductCatManagerType } from '~/app/dashboard/products/model';

export const useProductCategories = () => {
  const [isMutating, setMutating] = useState(false);

  const { data, isLoading, mutate } = useSWR<HttpRequest<ProductCategory[]>, Error>('product-category');

  const [value] = useDebounce(isLoading, 500);
  const { toast } = useToast();

  const addCategory = useCallback(
    (form: ProductCatManagerType) => {
      setMutating(true);

      return httpClient
        .post<HttpRequest<ProductCategory>>('product-category', form)
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
        .delete<HttpRequest<ProductCategory>>(`product-category/${id}`)
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
