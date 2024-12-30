'use client';

import { LayoutView } from '../_layout-view';
import { Button } from '~/components/ui/button';
import { Plus } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useProduct } from '~/services/use-product';

const ProductPortfolio = dynamic(() => import('./_data-table').then((c) => c.ProductPortfolio));
const AddProduct = dynamic(() => import('../_add-product').then((c) => c.AddProduct));

export const ProductView = () => {
  const state = useProduct();

  return (
    <LayoutView
      title="Product"
      description="Product collection manager."
      actionElement={
        <AddProduct
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
