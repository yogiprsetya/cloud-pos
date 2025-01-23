import { Suspense } from 'react';
import { ProductView } from './product-view';

const StocksPage = () => (
  <Suspense>
    <ProductView />
  </Suspense>
);

export default StocksPage;
