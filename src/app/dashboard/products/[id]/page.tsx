import { LayoutView } from '../../layout-view';
import { ManageProduct } from '../product-manager';

const EditProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <LayoutView title="Edit product" description="Fill in the form below to edit product data.">
      <ManageProduct id={id} />
    </LayoutView>
  );
};

export default EditProductPage;
