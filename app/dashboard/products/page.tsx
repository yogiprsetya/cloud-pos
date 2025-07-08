import { Suspense } from 'react';
import { ProductView } from './product-view';

const ProductPage = () => (
  <Suspense>
    <ProductView />
  </Suspense>
);

export default ProductPage;
