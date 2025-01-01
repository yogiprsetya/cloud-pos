import { Suspense } from 'react';
import { ProductView } from './page-view';

const StocksPage = () => (
  <Suspense>
    <ProductView />
  </Suspense>
);

export default StocksPage;
