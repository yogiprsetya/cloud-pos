'use client';

import { LayoutView } from '../_layout-view';
import { Button } from '~/components/ui/button';
import { Plus } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useProduct } from '~/services/use-product';
import { useManageProductDialogState } from './_manage-product/use-state';

const ProductPortfolio = dynamic(() => import('./_data-table').then((c) => c.ProductPortfolio));
const ManageProduct = dynamic(() => import('./_manage-product').then((c) => c.ManageProduct));

export const ProductView = () => {
  const state = useProduct();
  const { isOpen, toggleModal, initStep, initData } = useManageProductDialogState();

  return (
    <LayoutView
      title="Product"
      description="Product collection manager."
      actionElement={
        <Button onClick={toggleModal}>
          <Plus /> Product
        </Button>
      }
    >
      <ProductPortfolio {...state} />

      <ManageProduct
        handleCreate={state.initNewProduct}
        onSetImage={state.setProductImage}
        isOpen={isOpen}
        toggleModal={toggleModal}
        initStep={initStep}
        initData={initData}
      />
    </LayoutView>
  );
};
