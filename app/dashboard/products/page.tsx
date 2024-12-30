import { Suspense } from 'react';
import { ProductView } from './_page-view';

const StocksPage = () => (
  <Suspense>
    <ProductView />
  </Suspense>
);

export default StocksPage;
