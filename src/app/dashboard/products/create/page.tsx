import { LayoutView } from '../../layout-view';
import { ManageProduct } from '../product-manager';

const CreateProductPage = () => {
  return (
    <LayoutView title="Add new product" description="Fill in the form below to create a new product.">
      <ManageProduct />
    </LayoutView>
  );
};

export default CreateProductPage;
