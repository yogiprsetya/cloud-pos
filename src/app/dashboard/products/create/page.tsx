import { LayoutView } from '../../layout-view';

import dynamic from 'next/dynamic';

const ManageProduct = dynamic(() => import('../product-manager').then((c) => c.ManageProduct), {
  ssr: false
});

const CreateProductPage = () => {
  return (
    <LayoutView title="Add new product" description="Fill in the form below to create a new product.">
      <ManageProduct />
    </LayoutView>
  );
};

export default CreateProductPage;
