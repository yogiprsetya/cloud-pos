import type { Product } from '~/model/types/product';
import useSWR from 'swr';
import { HttpRequest } from '~/model/types/http';
import { useDebounce } from 'use-debounce';

type Options = {
  id?: string;
};

export const useProductId = (opt?: Options) => {
  const { data, isLoading, mutate } = useSWR<HttpRequest<Product>, Error>(
    !opt?.id ? null : `product/${opt?.id}`
  );

  const [value] = useDebounce(isLoading, 500);

  return {
    data,
    isLoading: value,
    mutate
  };
};
