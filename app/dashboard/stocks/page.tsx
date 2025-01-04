import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { Plus, Package2 } from 'lucide-react';
import dynamic from 'next/dynamic';

const StockDataTable = dynamic(() => import('./_data-table').then((c) => c.StockDataTable));

const StocksPage = () => {
  return (
    <>
      <div className="flex mb-8 items-end justify-between">
        <header>
          <Text tag="h1" variant="heading-2" className="heade">
            Warehouse
          </Text>

          <Text className="text-secondary-foreground">Product stock log and monitoring.</Text>
        </header>

        <nav className="flex gap-2">
          <Button variant="secondary" asChild>
            <a href="/dashboard/products/create" aria-label="Add new product">
              <Plus /> Product
            </a>
          </Button>

          <Button>
            <Package2 /> Stock-in
          </Button>
        </nav>
      </div>

      <StockDataTable />
    </>
  );
};

export default StocksPage;
