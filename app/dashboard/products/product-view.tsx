'use client';

import { LayoutView } from '../layout-view';
import { Button } from '~/components/ui/button';
import { Plus } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useProduct } from '~/services/use-product';
import { ModalDeleteProduct } from './product-delete-modal';
import { useProductState } from './use-state';
import Link from 'next/link';

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
          <Link href="/dashboard/products/create">
            <Plus /> Product
          </Link>
        </Button>
      }
    >
      <ProductPortfolio {...service} />

      <ModalDeleteProduct
        open={state.isDeleteModalOpen}
        onOpenChange={() => state.closeDeleteModal()}
        data={state.product}
      />
    </LayoutView>
  );
};
