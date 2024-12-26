import { Text } from '~/components/ui/text';
import { AddProduct } from '../_add-product';
import { Button } from '~/components/ui/button';
import { Plus } from 'lucide-react';
import dynamic from 'next/dynamic';

const ProductPortfolio = dynamic(() => import('./_data-table').then((c) => c.ProductPortfolio));

const StocksPage = () => {
  return (
    <>
      <div className="flex mb-8 items-end justify-between">
        <header>
          <Text tag="h1" variant="heading-2" className="heade">
            Product
          </Text>

          <Text className="text-secondary-foreground">Product collection manager.</Text>
        </header>

        <nav className="flex gap-2">
          <AddProduct
            trigger={
              <Button>
                <Plus /> Product
              </Button>
            }
          />
        </nav>
      </div>

      <ProductPortfolio />
    </>
  );
};

export default StocksPage;
