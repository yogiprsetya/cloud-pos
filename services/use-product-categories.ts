import type { ProductCategory } from '~/model/types/product';
import useSWR from 'swr';
import { HttpRequest } from '~/model/types/http';
import { useDebounce } from 'use-debounce';

export const useProductCategories = () => {
  const { data, isLoading, mutate } = useSWR<HttpRequest<ProductCategory>, Error>('product-category');

  const [value] = useDebounce(isLoading, 500);

  return {
    data,
    isLoading: value,
    mutate
  };
};
