'use client';

import { LayoutView } from '../_layout-view';
import { Button } from '~/components/ui/button';
import { Plus } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useProduct } from '~/services/use-product';
import { ModalDeleteProduct } from './product-delete-modal';
import { useProductState } from './use-state';
import { ProductManageVariant } from './product-manage-variant';

const ProductPortfolio = dynamic(() => import('./product-data-card').then((c) => c.ProductPortfolio));

export const ProductView = () => {
  const service = useProduct();
  const state = useProductState();

  return (
    <LayoutView
      title="Product"
      description="Product collection manager."
      actionElement={
        <Button asChild>
          <a href="/dashboard/products/create">
            <Plus /> Product
          </a>
        </Button>
      }
    >
      <ProductPortfolio {...service} />

      <ProductManageVariant
        open={state.isManageVariantModalOpen}
        onOpenChange={() => state.closeManageVariantModal()}
        data={state.product}
      />

      <ModalDeleteProduct
        open={state.isDeleteModalOpen}
        onOpenChange={() => state.closeDeleteModal()}
        data={state.product}
      />
    </LayoutView>
  );
};
