import type { ProductWithVariants } from '~/model/types/product';
import useSWR from 'swr';
import { HttpRequest } from '~/model/types/http';
import { useDebounce } from 'use-debounce';

type Options = {
  id?: string;
};

export const useProductId = (opt?: Options) => {
  const { data, isLoading, mutate } = useSWR<HttpRequest<ProductWithVariants>, Error>(
    !opt?.id ? null : `product/${opt?.id}`
  );

  const [value] = useDebounce(isLoading, 300);

  return {
    data,
    isLoading: value,
    mutate
  };
};
