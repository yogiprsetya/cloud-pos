'use client';

import { LayoutView } from '../_layout-view';
import { Button } from '~/components/ui/button';
import { Plus } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useProduct } from '~/services/use-product';

const ProductPortfolio = dynamic(() => import('./_data-table').then((c) => c.ProductPortfolio));
const ManageProduct = dynamic(() => import('./_manage-product').then((c) => c.ManageProduct));

export const ProductView = () => {
  const state = useProduct();

  return (
    <LayoutView
      title="Product"
      description="Product collection manager."
      actionElement={
        <ManageProduct
          onCreate={state.initNewProduct}
          onSetImage={state.setProductImage}
          trigger={
            <Button>
              <Plus /> Product
            </Button>
          }
        />
      }
    >
      <ProductPortfolio {...state} />
    </LayoutView>
  );
};
