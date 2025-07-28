import useSWR from 'swr';
import { useDebounce } from 'use-debounce';
import { product } from '~/db/schema/product';
import { type InferSelectModel } from 'drizzle-orm';
import { HttpResponse } from '../types/Response';

type Product = InferSelectModel<typeof product>;

type Options = {
  id?: string;
};

export const useProductId = (opt?: Options) => {
  const { data, isLoading, mutate } = useSWR<HttpResponse<Product>, Error>(
    !opt?.id ? null : `product/${opt?.id}`
  );

  const [value] = useDebounce(isLoading, 500);

  return {
    data,
    isLoading: value,
    mutate
  };
};
