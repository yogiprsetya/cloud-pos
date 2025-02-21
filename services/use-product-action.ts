import { mutate } from 'swr';
import { useCallback, useState } from 'react';
import { useToast } from '~/hooks/useToast';
import { httpClient } from '~/config/http-client';
import { errorHandler } from '~/utils/error-handler';
import type { HttpRequest } from '~/model/types/http';
import type { Product } from '~/model/types/product';

export const useProductAction = () => {
  const [isMutating, setMutating] = useState(false);

  const { toast } = useToast();

  const deleteProductById = useCallback(
    (id: number) => {
      setMutating(true);

      return httpClient
        .delete<HttpRequest<Product>>(`product/${id}`)
        .then((res) => {
          mutate((key) => typeof key === 'string' && key.startsWith('product'));

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
    [toast]
  );

  return {
    isMutating,
    deleteProductById
  };
};
