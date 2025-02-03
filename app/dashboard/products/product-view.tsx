'use client';

import { LayoutView } from '../_layout-view';
import { Button } from '~/components/ui/button';
import { Plus } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useProduct } from '~/services/use-product';
import { ModalDeleteProduct } from './product-delete-modal';
import { useProductState } from './use-state';
// import { useManageProductDialogState } from './_manage-product/use-state';

const ProductPortfolio = dynamic(() =>
  import('./product-data-card').then((c) => c.ProductPortfolio)
);
// const ManageProduct = dynamic(() => import('./_manage-product').then((c) => c.ManageProduct));

export const ProductView = () => {
  const service = useProduct();
  const state = useProductState();
  // const { isOpen, toggleModal, initStep, initData } = useManageProductDialogState();

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

      {/* <ManageProduct
        handleCreate={state.createNewProduct}
        onSetImage={state.setProductImage}
        isOpen={isOpen}
        toggleModal={toggleModal}
        initStep={initStep}
        initData={initData}
      /> */}

      <ModalDeleteProduct
        open={state.isDeleteModalOpen}
        onOpenChange={() => state.closeDeleteModal()}
        data={state.product}
      />
    </LayoutView>
  );
};
